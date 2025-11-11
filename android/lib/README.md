# Outblock Web3 Provider for Android

Android library for integrating Web3 Provider in your dApp browser applications.

## Installation

### Gradle (build.gradle)

```gradle
dependencies {
    implementation 'io.outblock:web3-provider:1.0.4'
}
```

### Maven Central Repository

Add to your project-level `build.gradle`:

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        // Add GitHub Packages if using from there
        maven {
            url = uri("https://maven.pkg.github.com/Outblock/trust-web3-provider")
            credentials {
                username = project.findProperty("gpr.user") ?: System.getenv("GPR_USER")
                password = project.findProperty("gpr.key") ?: System.getenv("GPR_API_KEY")
            }
        }
    }
}
```

## Usage

### Import the Extension

```kotlin
import io.outblock.web3.provider.trustSwitchChain
import io.outblock.web3.provider.trustGetConnectedAddress
```

### Chain Switching

```kotlin
// Switch to Polygon network
webView.trustSwitchChain(
    chainId = 137,
    rpcUrl = "https://polygon-rpc.com",
    network = "ethereum"
) { result ->
    println("Chain switch result: $result")
}

// Switch to Ethereum mainnet
webView.trustSwitchChain(1, rpcUrl = "https://cloudflare-eth.com") { result ->
    println("Ethereum mainnet switch result: $result")
}

// Switch to BSC
webView.trustSwitchChain(56, rpcUrl = "https://bsc-dataseed4.ninicoin.io") { result ->
    println("BSC switch result: $result")
}
```

### Get Current Connected Address

```kotlin
// Get the actual connected address for current dApp
webView.trustGetConnectedAddress { address ->
    if (address.isEmpty()) {
        println("❌ No address connected")
    } else {
        println("🔍 Current connected address: $address")
    }
}
```

### Configure Multiple Addresses

The library supports injecting multiple addresses at initialization time:

```javascript
// In your WebView JavaScript injection
var config = {
    ethereum: {
        address: "0x9d8a62f656a8d1615c1294fd71e9cfb3e4855a4f", // Primary address
        addresses: [
            "0x9d8a62f656a8d1615c1294fd71e9cfb3e4855a4f",
            "0x742d35Cc6634C0532925a3b8BC09e29bA1E09321",
            "0x8ba1f109551bD432803012645Hac136c9d0d6928"
        ],
        chainId: 1,
        rpcUrl: "https://cloudflare-eth.com"
    },
    isDebug: true
};

trustwallet.ethereum = new trustwallet.Provider(config);
window.ethereum = trustwallet.ethereum;
```

## Features

- ✅ Multiple address injection support
- ✅ Chain switching for Ethereum-compatible networks
- ✅ Domain-based address authorization
- ✅ Automatic address switching based on dApp authorization
- ✅ Support for Polygon, BSC, Ethereum, and other EVM chains
- ✅ Debug logging support
- ✅ Get current connected address for dApp
- ✅ Signature request interception for unauthorized domains

## Requirements

- Android API level 23+
- Kotlin 1.7.10+
- WebView support

## License

MIT License - see [LICENSE](../LICENSE) file for details.