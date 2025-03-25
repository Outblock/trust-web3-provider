// Copyright © 2017-2022 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.

import Foundation
import WebKit

public struct TrustWeb3Provider {
    public struct Config: Equatable {
        public let ethereum: EthereumConfig
        public let isDebug: Bool

        public init(
            ethereum: EthereumConfig,
            isDebug: Bool = false
        ) {
            self.ethereum = ethereum
            self.isDebug = isDebug
        }

        public struct EthereumConfig: Equatable {
            public let address: String
            public let chainId: Int
            public let rpcUrl: String

            public init(address: String, chainId: Int, rpcUrl: String) {
                self.address = address
                self.chainId = chainId
                self.rpcUrl = rpcUrl
            }
        }
    }

    private class dummy {}
    private let filename = "trust-min"    
    public static let scriptHandlerName = "_tw_"
    public let config: Config

    public var providerJsUrl: URL {
#if COCOAPODS
        let bundle = Bundle(for: TrustWeb3Provider.dummy.self)
        let bundleURL = bundle.resourceURL?.appendingPathComponent("TrustWeb3Provider.bundle")
        let resourceBundle = Bundle(url: bundleURL!)!
        return resourceBundle.url(forResource: filename, withExtension: "js")!
#else
        return Bundle.module.url(forResource: filename, withExtension: "js")!
#endif
    }

    public var providerScript: WKUserScript {
        let source = try! String(contentsOf: providerJsUrl)
        return WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: false)
    }

    public var injectScript: WKUserScript {
        let source = """
        (function() {
            var config = {
                ethereum: {
                    address: "\(config.ethereum.address)",
                    chainId: \(config.ethereum.chainId),
                    rpcUrl: "\(config.ethereum.rpcUrl)"
                },
                isDebug: \(config.isDebug)
            };

            trustwallet.ethereum = new trustwallet.Provider(config);

            trustwallet.postMessage = (jsonString) => {
                webkit.messageHandlers._tw_.postMessage(jsonString)
            };

            window.ethereum = trustwallet.ethereum;
        })();
        """
        return WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: false)
    }

    public init(config: Config) {
        self.config = config
    }
}
