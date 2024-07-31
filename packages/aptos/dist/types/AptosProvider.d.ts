/// <reference types="node" />
import { BaseProvider } from '@trustwallet/web3-provider-core';
import type IAptosProvider from './types/AptosProvider';
import type { IAptosProviderConfig, ISignMessagePayload } from './types/AptosProvider';
export declare class AptosProvider extends BaseProvider implements IAptosProvider {
    static NETWORK: string;
    private _isConnected;
    private _network;
    chainId: string | null;
    address: string | null;
    static bufferToHex(buffer: Buffer | Uint8Array | string): string;
    static messageToBuffer(message: string | Buffer): Buffer;
    constructor(config?: IAptosProviderConfig);
    setConfig(config: {
        network: string;
        address: string;
        chainId: string;
    }): void;
    connect(): Promise<any>;
    disconnect(): void;
    isConnected(): boolean;
    account(): Promise<any>;
    network(): string | undefined;
    getNetwork(): string;
    signMessage(payload: ISignMessagePayload): Promise<{
        address: any;
        application: string;
        chainId: string | null;
        fullMessage: string;
        message: string;
        nonce: string;
        prefix: string;
        signature: unknown;
    }>;
    signAndSubmitTransaction(tx: string): Promise<{
        hash: string;
    }>;
    signTransaction(tx: string): Promise<any>;
}
