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
     * Generate JavaScript command to switch account
     * @param address: New address to switch to
     * @param chainId: Optional chain ID to switch to as well
     * @param network: Network name (default "ethereum")
     * @return: JavaScript command string
     */
    public func generateSwitchAccountJS(address: String, chainId: Int? = nil, network: String = "ethereum") -> String {
        let id = Int64(Date().timeIntervalSince1970 * 1000) // Use timestamp as ID
        let chainIdParam = chainId != nil ? "\"\(chainId!)\"" : "null"
        
        return """
            window.trustwallet.postMessage({
                id: \(id),
                name: "changeAccount",
                object: {
                    address: "\(address)",
                    chainId: \(chainIdParam)
                },
                network: "\(network)"
            });
        """
    }
    
    /**
     * Generate JavaScript command to switch chain
     * @param chainId: Chain ID to switch to
     * @param rpcUrl: Optional RPC URL
     * @param network: Network name (default "ethereum")
     * @return: JavaScript command string
     */
    public func generateSwitchChainJS(chainId: Int, rpcUrl: String? = nil, network: String = "ethereum") -> String {
        let id = Int64(Date().timeIntervalSince1970 * 1000) // Use timestamp as ID
        let rpcUrlParam = rpcUrl != nil ? "\"\(rpcUrl!)\"" : "null"
        
        return """
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
    }
    
    /**
     * Execute account switch via JavaScript
     * @param address: New address to switch to
     * @param chainId: Optional chain ID to switch to as well
     * @param network: Network name (default "ethereum")
     * @param completion: Completion handler with result/error
     */
    public func trustSwitchAccount(
        _ address: String,
        chainId: Int? = nil,
        network: String = "ethereum",
        completion: ((Result<Any?, Error>) -> Void)? = nil
    ) {
        let jsCommand = generateSwitchAccountJS(address: address, chainId: chainId, network: network)
        
        evaluateJavaScript(jsCommand) { result, error in
            if let error = error {
                print("Trust switch account error: \(error)")
                completion?(.failure(error))
            } else {
                print("Trust switch account executed successfully")
                completion?(.success(result))
            }
        }
    }
    
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
        let jsCommand = generateSwitchChainJS(chainId: chainId, rpcUrl: rpcUrl, network: network)
        
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
}