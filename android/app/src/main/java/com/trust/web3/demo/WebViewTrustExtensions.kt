package com.trust.web3.demo

import android.webkit.WebView

/**
 * Extension functions for WebView to trigger Trust Provider changes
 */

/**
 * Generate JavaScript command to switch account
 * @param address: New address to switch to
 * @param chainId: Optional chain ID to switch to as well
 * @param network: Network name (default "ethereum")
 * @return: JavaScript command string
 */
fun WebView.generateSwitchAccountJS(address: String, chainId: Int? = null, network: String = "ethereum"): String {
    val id = System.currentTimeMillis() // Use timestamp as ID
    val chainIdParam = if (chainId != null) "\"$chainId\"" else "null"
    
    return """
        window.trustwallet.postMessage({
            id: $id,
            name: "changeAccount",
            object: {
                address: "$address",
                chainId: $chainIdParam
            },
            network: "$network"
        });
    """.trimIndent()
}

/**
 * Generate JavaScript command to switch chain
 * @param chainId: Chain ID to switch to
 * @param rpcUrl: Optional RPC URL
 * @param network: Network name (default "ethereum")
 * @return: JavaScript command string
 */
fun WebView.generateSwitchChainJS(chainId: Int, rpcUrl: String? = null, network: String = "ethereum"): String {
    val id = System.currentTimeMillis() // Use timestamp as ID
    val rpcUrlParam = if (rpcUrl != null) "\"$rpcUrl\"" else "null"
    
    return """
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
}

/**
 * Execute account switch via JavaScript
 * @param address: New address to switch to
 * @param chainId: Optional chain ID to switch to as well
 * @param network: Network name (default "ethereum")
 * @param callback: Optional callback for JavaScript execution result
 */
fun WebView.trustSwitchAccount(
    address: String,
    chainId: Int? = null,
    network: String = "ethereum",
    callback: ((String?) -> Unit)? = null
) {
    val jsCommand = generateSwitchAccountJS(address, chainId, network)
    
    post {
        evaluateJavascript(jsCommand) { result ->
            println("Trust switch account executed: $result")
            callback?.invoke(result)
        }
    }
}

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
    val jsCommand = generateSwitchChainJS(chainId, rpcUrl, network)
    
    post {
        evaluateJavascript(jsCommand) { result ->
            println("Trust switch chain executed: $result")
            callback?.invoke(result)
        }
    }
}