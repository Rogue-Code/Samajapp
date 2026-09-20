package com.sangath.community;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

/**
 * Native counterpart to the web Firebase Phone Auth path in phone-auth-helpers.ts.
 *
 * The JS SDK's invisible reCAPTCHA needs an iframe to get third-party storage access,
 * which our embedded WebView can never grant (no browser chrome to show the permission
 * prompt Android's storage-partitioning requires) — confirmed via logcat showing
 * "requestStorageAccess: Permission denied" with no request ever reaching Firebase.
 * The native SDK sidesteps this: it verifies the app via Play Integrity first (silent,
 * no challenge), and only falls back to reCAPTCHA through a real Custom Tab, which does
 * have the browser chrome to grant storage access.
 */
@CapacitorPlugin(name = "FirebasePhoneAuth")
public class FirebasePhoneAuthPlugin extends Plugin {

    @PluginMethod
    public void sendCode(PluginCall call) {
        String phoneNumber = call.getString("phoneNumber");
        if (phoneNumber == null) {
            call.reject("phoneNumber is required");
            return;
        }

        // FirebaseAuth.getInstance() throws IllegalStateException (uncaught, it would crash
        // the whole app — see Bridge.java's callPluginMethod, which rethrows anything past
        // this method as a RuntimeException on the main thread) if google-services.json is
        // missing or the default FirebaseApp otherwise failed to initialize.
        try {
            PhoneAuthOptions options = PhoneAuthOptions.newBuilder(FirebaseAuth.getInstance())
                    .setPhoneNumber(phoneNumber)
                    .setTimeout(60L, TimeUnit.SECONDS)
                    .setActivity(getActivity())
                    .setCallbacks(new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                        @Override
                        public void onVerificationCompleted(PhoneAuthCredential credential) {
                            // Instant verification (Play Integrity) or SMS auto-read: the
                            // caller never gets a verificationId to confirm a code against,
                            // since there's no code to enter — resolve sendCode itself with
                            // a session, same as a completed confirmCode would.
                            signInAndResolveSession(credential, call, true);
                        }

                        @Override
                        public void onVerificationFailed(FirebaseException e) {
                            call.reject(normalizedErrorMessage(e), e);
                        }

                        @Override
                        public void onCodeSent(String id, PhoneAuthProvider.ForceResendingToken token) {
                            JSObject ret = new JSObject();
                            ret.put("autoRetrieved", false);
                            ret.put("verificationId", id);
                            call.resolve(ret);
                        }
                    })
                    .build();

            PhoneAuthProvider.verifyPhoneNumber(options);
        } catch (Exception e) {
            call.reject(normalizedErrorMessage(e), e);
        }
    }

    @PluginMethod
    public void confirmCode(PluginCall call) {
        String verificationId = call.getString("verificationId");
        String code = call.getString("code");
        if (verificationId == null || code == null) {
            call.reject("verificationId and code are required");
            return;
        }
        try {
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(verificationId, code);
            signInAndResolveSession(credential, call, false);
        } catch (Exception e) {
            call.reject(normalizedErrorMessage(e), e);
        }
    }

    private void signInAndResolveSession(PhoneAuthCredential credential, PluginCall call, boolean autoRetrieved) {
        try {
            FirebaseAuth.getInstance().signInWithCredential(credential)
                    .addOnSuccessListener(result -> {
                        if (result.getUser() == null) {
                            call.reject("Sign-in succeeded without a user.");
                            return;
                        }
                        result.getUser().getIdToken(false)
                                .addOnSuccessListener(tokenResult -> {
                                    JSObject ret = new JSObject();
                                    ret.put("autoRetrieved", autoRetrieved);
                                    ret.put("idToken", tokenResult.getToken());
                                    call.resolve(ret);
                                })
                                .addOnFailureListener(e -> call.reject(normalizedErrorMessage(e), e));
                    })
                    .addOnFailureListener(e -> call.reject(normalizedErrorMessage(e), e));
        } catch (Exception e) {
            call.reject(normalizedErrorMessage(e), e);
        }
    }

    /**
     * Android's FirebaseAuthException codes read "ERROR_INVALID_VERIFICATION_CODE"; the web
     * SDK's read "auth/invalid-verification-code". friendlyAuthError() (auth-helpers.ts) only
     * knows the web spelling, so translate rather than duplicate its matching there.
     */
    private String normalizedErrorMessage(Exception e) {
        if (e instanceof FirebaseAuthException) {
            String code = ((FirebaseAuthException) e).getErrorCode();
            if (code != null) {
                return "auth/" + code.replaceFirst("^ERROR_", "").toLowerCase().replace('_', '-');
            }
        }
        return e.getMessage() != null ? e.getMessage() : "Something went wrong.";
    }
}
