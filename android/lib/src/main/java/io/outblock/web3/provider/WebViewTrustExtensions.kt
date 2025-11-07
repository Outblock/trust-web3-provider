// Copyright © 2017-2022 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.

package io.outblock.web3.provider

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

/**
 * Get current connected address for the dApp
 * This returns the actual address that the current domain is connected to
 * @param callback: Callback with the connected address (empty string if not connected)
 */
fun WebView.trustGetConnectedAddress(callback: (String) -> Unit) {
    val jsCommand = "window.ethereum.getCurrentConnectedAddress()"
    
    post {
        evaluateJavascript(jsCommand) { result ->
            // Remove quotes from JavaScript string result
            val address = result?.trim('"') ?: ""
            println("Trust get connected address result: $address")
            callback(address)
        }
    }
}