import { IRequestArguments } from './types';
export interface RPC {
    call<T>(payload: {
        jsonrpc: string;
        method: string;
        params: IRequestArguments['params'];
    }): Promise<T>;
}
export declare class RPCServer implements RPC {
    #private;
    constructor(rpcUrl: string);
    getBlockNumber(): Promise<any>;
    getBlockByNumber(number: number): Promise<any>;
    getFilterLogs(filter: string): Promise<any>;
    call(payload: {
        jsonrpc: string;
        method: string;
        params: IRequestArguments['params'];
    }): Promise<any>;
}
