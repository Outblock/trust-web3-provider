package com.trust.web3.demo

import android.graphics.Bitmap
import android.net.http.SslError
import android.os.Bundle
import android.webkit.SslErrorHandler
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import io.outblock.web3.provider.trustSwitchChain
import io.outblock.web3.provider.trustGetConnectedAddress

class MainActivity : AppCompatActivity() {
    companion object {
        private const val DAPP_URL = "https://www.magiceden.io/me"
        private const val CHAIN_ID = 56
        private const val RPC_URL = "https://bsc-dataseed2.binance.org"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)

        val provderJs = loadProviderJs()
        val initJs = loadInitJs(
            CHAIN_ID,
            RPC_URL
        )
        WebView.setWebContentsDebuggingEnabled(true)
        val webview: WebView = findViewById(R.id.webview)
        webview.settings.run {
            javaScriptEnabled = true
            domStorageEnabled = true
        }
        WebAppInterface(this, webview, DAPP_URL).run {
            webview.addJavascriptInterface(this, "_tw_")
            
            // Demonstrate new extension methods
            demonstrateNativeMethods(webview)

            val webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    super.onPageStarted(view, url, favicon)
                    view?.evaluateJavascript(provderJs, null)
                    view?.evaluateJavascript(initJs, null)
                }

                override fun onReceivedSslError(
                    view: WebView?,
                    handler: SslErrorHandler?,
                    error: SslError?
                ) {
                    // Ignore SSL certificate errors
                    handler?.proceed()
                    println(error.toString())
                }
            }
            webview.webViewClient = webViewClient
            webview.loadUrl(DAPP_URL)
        }
    }

    private fun loadProviderJs(): String {
        return resources.openRawResource(R.raw.trust_min).bufferedReader().use { it.readText() }
    }

    private fun loadInitJs(chainId: Int, rpcUrl: String): String {
        val source = """
        (function() {
            var config = {                
                ethereum: {
                    chainId: $chainId,
                    rpcUrl: "$rpcUrl"
                },
                solana: {
                    cluster: "mainnet-beta",
                },
                isDebug: true
            };
            trustwallet.ethereum = new trustwallet.Provider(config);
            trustwallet.solana = new trustwallet.SolanaProvider(config);
            trustwallet.postMessage = (json) => {
                window._tw_.postMessage(JSON.stringify(json));
            }
            window.ethereum = trustwallet.ethereum;
        })();
        """
        return  source
    }
    
    /**
     * Demonstrate usage of new WebView extension methods for Trust Provider
     */
    private fun demonstrateNativeMethods(webview: WebView) {
        println("=== Trust Provider Multiple Address Demo ===")
        println("Note: All addresses are injected at initialization, only chain switching supported at runtime")
        
        // Example 1: Get current connected address
        webview.trustGetConnectedAddress { address ->
            println("🔍 Current connected address: ${if (address.isEmpty()) "Not connected" else address}")
        }
        
        // Example 2: Switch to Polygon chain
        webview.trustSwitchChain(
            chainId = 137,
            rpcUrl = "https://polygon-rpc.com",
            network = "ethereum"
        ) { result ->
            println("✅ Polygon chain switch result: $result")
            
            // Check connected address after chain switch
            webview.trustGetConnectedAddress { address ->
                println("🔍 Connected address after Polygon switch: ${if (address.isEmpty()) "Not connected" else address}")
            }
        }
        
        // Example 3: Switch to Ethereum mainnet
        webview.trustSwitchChain(1, rpcUrl = "https://cloudflare-eth.com") { result ->
            println("✅ Ethereum mainnet switch result: $result")
        }
        
        // Example 4: Switch to BSC
        webview.trustSwitchChain(56, rpcUrl = "https://bsc-dataseed4.ninicoin.io") { result ->
            println("✅ BSC switch result: $result")
        }
        
        println("✨ Features:")
        println("• trustSwitchChain() - Switch blockchain networks")
        println("• trustGetConnectedAddress() - Get current dApp connected address") 
        println("• Signature request interception for unauthorized domains")
    }
}
