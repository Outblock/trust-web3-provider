package com.trust.web3.demo

import android.webkit.WebView

/**
 * Extension functions for WebView to trigger Trust Provider changes
 */


/**
 * Execute chain switch via JavaScript
 * @param chainId: Chain ID to switch to
 * @param rpcUrl: Optional RPC URL
 * @param network: Network name (default "ethereum")
 * @param callback: Optional callback for JavaScript execution result
 */
fun WebView.trustSwitchChain(
    chainId: Int,
    rpcUrl: String? = null,
    network: String = "ethereum",
    callback: ((String?) -> Unit)? = null
) {
    val id = System.currentTimeMillis() // Use timestamp as ID
    val rpcUrlParam = if (rpcUrl != null) "\"$rpcUrl\"" else "null"
    
    val jsCommand = """
        window.trustwallet.postMessage({
            id: $id,
            name: "changeChainId",
            object: {
                chainId: "$chainId",
                rpcUrl: $rpcUrlParam
            },
            network: "$network"
        });
    """.trimIndent()
    
    post {
        evaluateJavascript(jsCommand) { result ->
            println("Trust switch chain executed: $result")
            callback?.invoke(result)
        }
    }
}