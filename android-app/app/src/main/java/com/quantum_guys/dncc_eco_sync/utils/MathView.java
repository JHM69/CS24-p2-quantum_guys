package com.quantum_guys.dncc_eco_sync.utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.core.content.ContextCompat;

import com.quantum_guys.dncc_eco_sync.R;


public class MathView extends WebView {
    private static final float default_text_size = 18;
    private final String TAG = "com.jhm69.MathView";
    Context context;
    private String display_text;
    private int text_color;
    private int text_size;
    private boolean clickable = false;
    // private boolean enable_zoom_in_controls = false;

    public MathView(Context context) {
        super(context);
        configurationSettingWebView();
        setDefaultTextColor(context);
        setDefaultTextSize();
    }


    public MathView(Context context, AttributeSet attrs) {
        super(context, attrs);
        configurationSettingWebView();
        TypedArray mTypeArray = context.getTheme().obtainStyledAttributes(
                attrs,
                R.styleable.MathView,
                0, 0);
        try {
            setBackgroundColor(mTypeArray.getInteger(R.styleable.MathView_setViewBackgroundColor, ContextCompat.getColor(context, android.R.color.transparent)));
            setTextColor(mTypeArray.getColor(R.styleable.MathView_setTextColor, ContextCompat.getColor(context, android.R.color.black)));
            pixelSizeConversion(mTypeArray.getDimension(R.styleable.MathView_setTextSize, default_text_size));
            setDisplayText(mTypeArray.getString(R.styleable.MathView_setText));
            setClickable(mTypeArray.getBoolean(R.styleable.MathView_setClickable, false));
        } catch (Exception e) {
            Log.d(TAG, "Exception:" + e.toString());
        }


    }

    public void setViewBackgroundColor(int color) {
        setBackgroundColor(color);
        this.invalidate();
    }

    private void pixelSizeConversion(float dimension) {
        if (dimension == default_text_size) {
            setTextSize((int) default_text_size);
        } else {
            int pixel_dimen_equivalent_size = (int) ((double) dimension / 1.6);
            setTextSize(pixel_dimen_equivalent_size);
        }
    }


    @SuppressLint({"SetJavaScriptEnabled", "NewApi"})
    private void configurationSettingWebView() {
        this.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        WebSettings settings = this.getSettings();
        this.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        this.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);

        this.setWebChromeClient(this);
        settings.setJavaScriptEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setBuiltInZoomControls(false);
        settings.setSupportZoom(false);
        this.setVerticalScrollBarEnabled(false);
        this.setHorizontalScrollBarEnabled(false);
        Log.d(TAG, "Zoom in controls:" + false);
    }

    private void setWebChromeClient(MathView mathView) {
    }


    public void setDisplayText(String formula_text) {
        this.display_text = formula_text;
        loadData();
    }


    private String getOfflineKatexConfig() {
        String offline_config = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "    <head>\n" +
                "        <meta charset=\"UTF-8\">\n" +
                "        <title>Auto-render test</title>\n" +
                "        <link rel=\"stylesheet\" type=\"text/css\" href=\"file:///android_asset/katex/katex.min.css\">\n" +
                "        <script type=\"text/javascript\" src=\"file:///android_asset/katex/katex.min.js\" ></script>\n" +
                "        <script type=\"text/javascript\" src=\"file:///android_asset/katex/contrib/auto-render.min.js\" ></script>\n" +
                "        <script type=\"text/javascript\" src=\"file:///android_asset/katex/contrib/auto-render.js\" ></script>\n" +
                "        <script type=\"text/javascript\" src=\"file:///android_asset/jquery.min.js\" ></script>\n" +
                "        <script type=\"text/javascript\" src=\"file:///android_asset/latex_parser.js\" ></script>\n" +
                "        <meta name=\"viewport\" content=\"width=device-width\"/>\n" +
                "        <link rel=\"stylesheet\" href=\"file:///android_asset/webviewstyle.css\"/>\n" +
                "        <style  onload=\"PR.prettyPrint()\" type='text/css'>" +
                "@font-face {\n" +
                "                font-family: myFirstFont;\n" +
                "                src: url(file:///android_asset/medium.woff);\n" +
                "            }\n" +
                "body {" +
                "font-family: 'myFirstFont', sans-serif;\n" +
                "font-family: 'myFirstFont', Arial, sans-serif !important;\n" +
                "margin: 0px;" +
                "padding: 0px;" +
                "font-size:" + this.text_size + "px;" +
                "color:" + getHexColor(this.text_color) + ";" +
                " }" +
                " </style>" +
                "    </head>\n" +
                "    <body>\n" +
                "        {formula}\n" +
                "    </body>\n" +
                "</html>";
        String start = "<html><head><meta http-equiv='Content-Type' content='text/html' charset='UTF-8' /><style> body {" +
                " white-space: nowrap;}</style></head><body>";

        String end = "</body></html>";
        return offline_config.replace("{formula}", this.display_text);
    }

    public void setTextSize(int size) {
        this.text_size = size;
        loadData();

    }

    public void setTextColor(int color) {
        this.text_color = color;
        loadData();
    }

    private String getHexColor(int intColor) {
        String hexColor = String.format("#%06X", (0xFFFFFF & intColor));
        Log.d(TAG, "Hex Color:" + hexColor);
        return hexColor;
    }


    private void setDefaultTextColor(Context context) {
        //sets default text color to black
        this.text_color = ContextCompat.getColor(context, android.R.color.black);

    }

    private void setDefaultTextSize() {
        //sets view default text size to 18
        this.text_size = (int) default_text_size;
    }

    private void loadData() {
        if (this.display_text != null) {
            this.loadDataWithBaseURL("null", getOfflineKatexConfig(), "text/html", "UTF-8", "about:blank");
        }

    }

    public void setClickable(boolean is_clickable) {
        this.setEnabled(true);
        this.clickable = is_clickable;
        configurationSettingWebView();
        this.invalidate();
    }

    @SuppressLint({"NewApi", "ClickableViewAccessibility"})
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (this.clickable && event.getAction() == MotionEvent.ACTION_DOWN) {
            this.callOnClick();
            return false;
        } else {
            return super.onTouchEvent(event);
        }
    }

}