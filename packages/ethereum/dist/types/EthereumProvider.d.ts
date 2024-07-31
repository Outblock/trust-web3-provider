import type IEthereumProvider from './types/EthereumProvider';
import type { IRequestArguments } from './types';
import { BaseProvider } from '@trustwallet/web3-provider-core';
import type { IEthereumProviderConfig } from './types/EthereumProvider';
import { RPCServer } from './RPCServer';
export declare class EthereumProvider extends BaseProvider implements IEthereumProvider {
    #private;
    static NETWORK: string;
    private mobileAdapter;
    isFlowWallet: boolean;
    providers: object[] | undefined;
    constructor(config?: IEthereumProviderConfig);
    /**
     * Emit connect event with ProviderConnectInfo
     */
    private connect;
    /**
     * @deprecated
     * @returns
     */
    enable(): Promise<string[]>;
    /**
     * sendAsync
     *
     * @deprecated
     * @param args
     * @param callback
     */
    sendAsync(args: IRequestArguments, callback: (error: any | null, data: unknown | null) => void): void;
    /**
     * @deprecated Use request() method instead.
     */
    _send(payload: IRequestArguments): {
        result: any;
        jsonrpc: string;
    };
    /**
     * @deprecated Use request() method instead.
     */
    send(methodOrPayload: unknown, callbackOrArgs?: unknown): unknown;
    internalRequest<T>(args: IRequestArguments): Promise<T>;
    /**
     * request order is
     *
     *  mobileAdapter (if enabled)
     *      -----> staticHandler
     *                -----> client handler (internalRequest)
     *
     * @param args
     * @returns
     */
    request<T>(args: IRequestArguments): Promise<T>;
    /**
     * Methods that don't require reaching the handler
     * @param args
     * @param next
     * @returns
     */
    private handleStaticRequests;
    /**
     * The provider needs to be stateful for certain request such as
     * storing the user's address after a eth_requestAccounts, this is for
     * mobile compatibility
     *
     * @param req
     * @param response
     * @returns
     */
    private onResponseReady;
    getNetwork(): string;
    get connected(): boolean;
    get isMetaMask(): boolean;
    getChainId(): string;
    getNetworkVersion(): number | undefined;
    setChainId(chainId: string): void;
    setRPCUrl(rpcUrl: string): void;
    getRPC(): RPCServer;
    setOverwriteMetamask(overwriteMetamask: boolean): void;
    getAddress(): string;
    setAddress(address: string): void;
    setRPC(rpc: any): void;
}
