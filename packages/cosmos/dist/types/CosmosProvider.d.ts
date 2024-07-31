/// <reference types="node" />
import { BaseProvider, IRequestArguments } from '@trustwallet/web3-provider-core';
import { BroadcastMode, DirectSignDoc, ICosmosProvider, ICosmosProviderConfig } from './types/CosmosProvider';
import { StdSignDoc } from '@cosmjs/amino';
import { WalletAccount } from '@cosmos-kit/core';
export declare class CosmosProvider extends BaseProvider implements ICosmosProvider {
    #private;
    static NETWORK: string;
    private mobileAdapter;
    /**
     * Mobile required overwriting this to true
     */
    isKeplr: boolean;
    isFlowWallet: boolean;
    constructor(config?: ICosmosProviderConfig);
    static bufferToHex(buffer: Buffer | Uint8Array | string): string;
    getNetwork(): string;
    isMobileAdapterEnabled(): boolean;
    enable(chainIds: string | string[]): Promise<void>;
    /**
     * Call request handler directly
     * @param args
     * @returns
     */
    internalRequest<T>(args: IRequestArguments): Promise<T>;
    /**
     * request order is
     *
     *  mobileAdapter (if enabled)
     *        -----> client handler (internalRequest)
     *
     * @param args
     * @returns
     */
    request<T>(args: IRequestArguments): Promise<T>;
    getKey(chainId: string): Promise<WalletAccount>;
    sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
    signArbitrary(chainId: string, signerAddress: string, payload: string | Uint8Array): Promise<{
        signature: string;
    }>;
    signAmino(chainId: string, _signer: string, signDoc: StdSignDoc): Promise<{
        signed: StdSignDoc;
        signature: any;
    }>;
    signDirect(chainId: string, signerAddress: string, signDoc: DirectSignDoc): Promise<{
        signed: DirectSignDoc;
        signature: string;
    }>;
    experimentalSuggestChain(): void;
    getOfflineSignerDirect(chainId: string): {
        getAccounts: () => Promise<WalletAccount[]>;
        signDirect: (signerAddress: string, signDoc: DirectSignDoc) => Promise<{
            signed: DirectSignDoc;
            signature: string;
        }>;
    };
    getOfflineSigner(chainId: string): {
        getAccounts: () => Promise<{
            address: string;
            algo: string;
            pubkey: Buffer;
        }[]>;
        sign: (signerAddress: string, signDoc: StdSignDoc) => Promise<{
            signed: StdSignDoc;
            signature: any;
        }>;
        signAmino: (signerAddress: string, signDoc: StdSignDoc) => Promise<{
            signed: StdSignDoc;
            signature: any;
        }>;
    };
    getOfflineSignerAuto(chainId: string): {
        getAccounts: () => Promise<{
            address: string;
            algo: string;
            pubkey: Buffer;
        }[]>;
        sign: (signerAddress: string, signDoc: StdSignDoc) => Promise<{
            signed: StdSignDoc;
            signature: any;
        }>;
        signAmino: (signerAddress: string, signDoc: StdSignDoc) => Promise<{
            signed: StdSignDoc;
            signature: any;
        }>;
    };
    getOfflineSignerAmino(chainId: string): {
        getAccounts: () => Promise<{
            address: string;
            algo: string;
            pubkey: Buffer;
        }[]>;
        sign: (signerAddress: string, signDoc: StdSignDoc) => Promise<{
            signed: StdSignDoc;
            signature: any;
        }>;
        signAmino: (signerAddress: string, signDoc: StdSignDoc) => Promise<{
            signed: StdSignDoc;
            signature: any;
        }>;
    };
}
