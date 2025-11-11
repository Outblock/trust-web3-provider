// Copyright © 2017-2022 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.

import WebKit
import Foundation

extension WKWebView {
    
    // MARK: - Trust Provider Native Methods
    
    
    /**
     * Execute chain switch via JavaScript
     * @param chainId: Chain ID to switch to
     * @param rpcUrl: Optional RPC URL
     * @param network: Network name (default "ethereum")
     * @param completion: Completion handler with result/error
     */
    public func trustSwitchChain(
        _ chainId: Int,
        rpcUrl: String? = nil,
        network: String = "ethereum",
        completion: ((Result<Any?, Error>) -> Void)? = nil
    ) {
        let id = Int64(Date().timeIntervalSince1970 * 1000) // Use timestamp as ID
        let rpcUrlParam = rpcUrl != nil ? "\"\(rpcUrl!)\"" : "null"
        
        let jsCommand = """
            window.trustwallet.postMessage({
                id: \(id),
                name: "changeChainId",
                object: {
                    chainId: "\(chainId)",
                    rpcUrl: \(rpcUrlParam)
                },
                network: "\(network)"
            });
        """
        
        evaluateJavaScript(jsCommand) { result, error in
            if let error = error {
                print("Trust switch chain error: \(error)")
                completion?(.failure(error))
            } else {
                print("Trust switch chain executed successfully")
                completion?(.success(result))
            }
        }
    }
    
    /**
     * Get current connected address for the dApp
     * This returns the actual address that the current domain is connected to
     * @param completion: Completion handler with the connected address (empty string if not connected)
     */
    public func trustGetConnectedAddress(completion: @escaping (String) -> Void) {
        let jsCommand = "window.ethereum.getCurrentConnectedAddress()"
        
        evaluateJavaScript(jsCommand) { result, error in
            if let error = error {
                print("Trust get connected address error: \(error)")
                completion("")
            } else if let address = result as? String {
                completion(address)
            } else {
                completion("")
            }
        }
    }
}