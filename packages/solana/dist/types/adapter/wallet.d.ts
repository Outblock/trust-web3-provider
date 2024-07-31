import { type SolanaSignAndSendTransactionFeature, type SolanaSignInFeature, type SolanaSignMessageFeature, type SolanaSignTransactionFeature } from '@solana/wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import { type StandardConnectFeature, type StandardDisconnectFeature, type StandardEventsFeature } from '@wallet-standard/features';
import { TrustWalletAccount } from './account';
import ISolanaProvider from '../types/SolanaProvider';
export declare const TrustNamespace = "trust:";
export type TrustFeature = {
    [TrustNamespace]: {
        trust: ISolanaProvider;
    };
};
export declare class TrustWallet implements Wallet {
    #private;
    get version(): "1.0.0";
    get name(): "Trust";
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get chains(): "solana:mainnet"[];
    get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & SolanaSignAndSendTransactionFeature & SolanaSignTransactionFeature & SolanaSignMessageFeature & SolanaSignInFeature & TrustFeature;
    get accounts(): TrustWalletAccount[];
    constructor(trust: ISolanaProvider);
}
