# Android Package Usage Example

## 1. Setup Repository

Add to your app-level `build.gradle`:

```gradle
repositories {
    google()
    mavenCentral()
    
    // For GitHub Packages (requires authentication)
    maven {
        url = uri("https://maven.pkg.github.com/Outblock/trust-web3-provider")
        credentials {
            username = project.findProperty("gpr.user") ?: System.getenv("GPR_USER")
            password = project.findProperty("gpr.key") ?: System.getenv("GPR_API_KEY")
        }
    }
    
    // For local testing (if you built locally)
    maven {
        url = uri("file://$projectDir/../lib/build/repo")
    }
}
```

## 2. Add Dependency

```gradle
dependencies {
    implementation 'io.outblock:web3-provider:1.0.4'
    
    // Other dependencies...
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.core:core-ktx:1.8.0'
}
```

## 3. Usage in Code

```kotlin
import android.webkit.WebView
import io.outblock.web3.provider.trustSwitchChain
import io.outblock.web3.provider.trustGetConnectedAddress

class MainActivity : AppCompatActivity() {
    
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = findViewById(R.id.webview)
        setupWebView()
        
        // Example: Switch to Polygon after 3 seconds
        Handler(Looper.getMainLooper()).postDelayed({
            switchToPolygon()
        }, 3000)
    }
    
    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
        }
        
        // Load your dApp
        webView.loadUrl("https://your-dapp.com")
    }
    
    private fun switchToPolygon() {
        webView.trustSwitchChain(
            chainId = 137,
            rpcUrl = "https://polygon-rpc.com",
            network = "ethereum"
        ) { result ->
            println("✅ Switched to Polygon: $result")
        }
    }
    
    private fun switchToEthereumMainnet() {
        webView.trustSwitchChain(1, "https://cloudflare-eth.com") { result ->
            println("✅ Switched to Ethereum: $result")
        }
    }
    
    private fun switchToBSC() {
        webView.trustSwitchChain(56, "https://bsc-dataseed4.ninicoin.io") { result ->
            println("✅ Switched to BSC: $result")
        }
    }
    
    private fun getCurrentConnectedAddress() {
        webView.trustGetConnectedAddress { address ->
            if (address.isEmpty()) {
                println("❌ No address connected")
            } else {
                println("🔍 Current connected address: $address")
            }
        }
    }
}
```

## 4. Supported Networks

The extension supports any EVM-compatible network:

```kotlin
// Ethereum Mainnet
webView.trustSwitchChain(1, "https://cloudflare-eth.com")

// Polygon
webView.trustSwitchChain(137, "https://polygon-rpc.com")

// Binance Smart Chain
webView.trustSwitchChain(56, "https://bsc-dataseed4.ninicoin.io")

// Arbitrum
webView.trustSwitchChain(42161, "https://arb1.arbitrum.io/rpc")

// Optimism
webView.trustSwitchChain(10, "https://mainnet.optimism.io")
```

## 5. Error Handling

```kotlin
webView.trustSwitchChain(137, "https://polygon-rpc.com") { result ->
    if (result != null && !result.contains("error")) {
        println("✅ Chain switch successful: $result")
    } else {
        println("❌ Chain switch failed: $result")
    }
}
```

## 6. Building from Source

If you want to build and test locally:

```bash
cd android
./gradlew :lib:publishReleasePublicationToLocalRepoRepository
```

Then use the local repository in your app:

```gradle
repositories {
    maven {
        url = uri("file:///path/to/trust-web3-provider/android/lib/build/repo")
    }
}
```

## 7. Release Process

When a GitHub release is created, the CI will automatically:

1. ✅ Build the AAR package
2. ✅ Generate sources and javadoc JARs  
3. ✅ Publish to GitHub Packages
4. ✅ Attach artifacts to the GitHub release
5. ✅ Create detailed release notes

## Dependencies

The library has minimal dependencies:

- `org.jetbrains.kotlin:kotlin-stdlib` 
- `androidx.core:core-ktx:1.8.0`

## Requirements

- Android API 23+
- Kotlin 1.7.10+
- Java 8+