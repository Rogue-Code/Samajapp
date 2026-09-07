package com.sangath.community;

import android.os.Build;
import android.os.Bundle;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // targetSdk 35+ enforces edge-to-edge, so on Android 15 and newer the
        // framework no longer shrinks the window for the soft keyboard and
        // windowSoftInputMode is effectively ignored. Without help the WebView
        // keeps its full height, the keyboard covers the focused field, and
        // nothing on the web side can measure a real keyboard inset.
        //
        // Below Android 15 the framework still honours adjustResize and has
        // already shrunk the window by the time this runs. Padding by the IME
        // inset there subtracts the keyboard a SECOND time: on an Android 10
        // POCO F1 the layout viewport collapsed from 737 to 123 CSS px, which
        // pinned the fixed bottom bar directly under the header and left the
        // rest of the screen blank. So only take over the resize where the
        // framework has actually stopped doing it.
        final boolean frameworkResizes = Build.VERSION.SDK_INT < Build.VERSION_CODES.VANILLA_ICE_CREAM;

        View content = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(content, (view, windowInsets) -> {
            Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
            Insets ime = windowInsets.getInsets(WindowInsetsCompat.Type.ime());

            int bottom = frameworkResizes ? bars.bottom : Math.max(bars.bottom, ime.bottom);
            view.setPadding(bars.left, bars.top, bars.right, bottom);

            return WindowInsetsCompat.CONSUMED;
        });
    }
}
