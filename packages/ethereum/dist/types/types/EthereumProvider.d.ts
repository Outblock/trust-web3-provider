import { EmitterSupportedEvents, IProviderAccounts, IProviderChainId, IProviderInfo, IProviderMessage, IProviderRpcError, IRequestArguments } from '../types';
export interface IEthereumProviderConfig {
    rpc?: string;
    address?: string;
    rpcUrl?: string;
    chainId?: string;
    overwriteMetamask?: boolean;
    supportedMethods?: string[];
    unsupportedMethods?: string[];
    disableMobileAdapter?: boolean;
    isFlowWallet?: boolean;
}
/**
 * EIP-1193: Ethereum Provider JavaScript API
 *
 * https://eips.ethereum.org/EIPS/eip-1193
 */
export default interface IEthereumProvider {
    request(args: IRequestArguments): Promise<unknown>;
    setChainId(chainId: string): void;
    /**
     * @deprecated
     * @param args
     * @param callback
     */
    sendAsync(args: IRequestArguments, callback: (error: any | null, data: unknown | null) => void): void;
    on(event: EmitterSupportedEvents.CONNECT, listener: (info: IProviderInfo) => void): IEthereumProvider;
    on(event: EmitterSupportedEvents.DISCONNECT, listener: (error: IProviderRpcError) => void): IEthereumProvider;
    on(event: EmitterSupportedEvents.MESSAGE, listener: (message: IProviderMessage) => void): IEthereumProvider;
    on(event: EmitterSupportedEvents.CHAIN_CHANGED, listener: (chainId: IProviderChainId) => void): IEthereumProvider;
    on(event: EmitterSupportedEvents.ACCOUNTS_CHANGED, listener: (accounts: IProviderAccounts) => void): IEthereumProvider;
}
export declare enum RPCMethods {
    eth_requestAccounts = "eth_requestAccounts"
}
