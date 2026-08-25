package com.sangath.community;

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

        // targetSdk 35+ enforces edge-to-edge, so the framework no longer shrinks
        // the window for the soft keyboard and windowSoftInputMode is effectively
        // ignored. Without this the WebView keeps its full height, the keyboard
        // covers the focused field, and nothing on the web side can measure a real
        // keyboard inset. Apply the insets ourselves so the WebView is genuinely
        // resized, the way it was before Android 15.
        View content = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(content, (view, windowInsets) -> {
            Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
            Insets ime = windowInsets.getInsets(WindowInsetsCompat.Type.ime());

            view.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, ime.bottom));

            return WindowInsetsCompat.CONSUMED;
        });
    }
}
