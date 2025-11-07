# Trust Web3 Provider - Consumer ProGuard Rules

# Keep all public classes and methods in the provider package
-keep public class io.outblock.web3.provider.** { *; }

# Keep WebView extension functions
-keep class io.outblock.web3.provider.WebViewTrustExtensionsKt { *; }

# Keep Kotlin extension functions from being obfuscated
-keepclassmembers class * {
    public static ** trustSwitchChain(...);
}

# Keep JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep WebView related classes
-keep class android.webkit.WebView { *; }
-keep class android.webkit.WebViewClient { *; }
-keep class android.webkit.WebChromeClient { *; }