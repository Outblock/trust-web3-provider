import { IRequestArguments } from '@trustwallet/web3-provider-core';
import { SolanaProvider } from './SolanaProvider';
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { ConnectOptions } from './types/SolanaProvider';
/**
 * Adapting some requests to legacy mobile API
 *
 * This adapter provides the APIs with the method names and params the extension and mobile are
 * ready to handle
 */
export declare class MobileAdapter {
    private provider;
    private useLegacySign;
    constructor(provider: SolanaProvider, useLegacySign?: boolean);
    connect(options?: ConnectOptions | undefined): Promise<{
        publicKey: PublicKey;
    }>;
    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
    legacySign<T extends Transaction | VersionedTransaction>(tx: T): Promise<T | undefined>;
    /**
     * Mobile adapter maps some solana methods to existing mobile method names
     * @param args
     * @param next
     * @returns
     */
    request<T>(args: IRequestArguments, next: () => Promise<T>): Promise<T>;
}
