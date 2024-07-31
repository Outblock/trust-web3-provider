/// <reference types="node" />
import { BaseProvider, IRequestArguments } from '@trustwallet/web3-provider-core';
import type ISolanaProvider from './types/SolanaProvider';
import type { ISolanaProviderConfig } from './types/SolanaProvider';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';
import { PublicKey, Transaction, VersionedTransaction, SendOptions, Connection } from '@solana/web3.js';
import { TrustWallet } from './adapter/wallet';
export declare class SolanaProvider extends BaseProvider implements ISolanaProvider {
    #private;
    static NETWORK: string;
    private mobileAdapter;
    connection: Connection;
    publicKey: PublicKey | null;
    isFlowWallet: boolean;
    static bufferToHex(buffer: Buffer | Uint8Array | string): string;
    static messageToBuffer(message: string | Buffer): Buffer;
    constructor(config?: ISolanaProviderConfig);
    getInstanceWithAdapter(): TrustWallet;
    connect(options?: {
        onlyIfTrusted?: boolean | undefined;
    } | undefined): Promise<{
        publicKey: PublicKey;
    }>;
    disconnect(): Promise<void>;
    signAndSendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, options?: SendOptions | undefined): Promise<{
        signature: string;
    }>;
    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signRawTransactionMulti<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<{
        signature: Uint8Array;
        publicKey: string | undefined;
    }>;
    signIn(input?: SolanaSignInInput | undefined): Promise<SolanaSignInOutput>;
    getNetwork(): string;
    mapSignedTransaction<T extends Transaction | VersionedTransaction>(transaction: T, signatureEncoded: string): T;
    request<T>(_args: IRequestArguments): Promise<T>;
    /**
     * Call request handler directly
     * @param args
     * @returns
     */
    internalRequest<T>(args: IRequestArguments): Promise<T>;
}
