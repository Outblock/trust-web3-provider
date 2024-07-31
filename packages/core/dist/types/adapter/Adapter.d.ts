import { IHandlerParams, ICallbackAdapterRequestParams } from './CallbackAdapter';
export declare const AdapterStrategy: {
    readonly PROMISES: "PROMISES";
    readonly CALLBACK: "CALLBACK";
};
export interface IAdapterRequestParams {
    params?: unknown[] | object;
    method: string;
}
export type IHandler = (params: IHandlerParams) => Promise<any> | void;
export type AdapterStrategyType = keyof typeof AdapterStrategy;
/**
 * Abstract adapter
 */
export declare abstract class Adapter {
    #private;
    static isCallbackAdapterRequest(params: IAdapterRequestParams | ICallbackAdapterRequestParams): params is ICallbackAdapterRequestParams;
    constructor(strategy: AdapterStrategyType);
    setHandler(remoteHandler: IHandler): this;
    request(params: IAdapterRequestParams | ICallbackAdapterRequestParams, network: string): Promise<any> | void;
    setStrategy(strategy: AdapterStrategyType): this;
    getStrategy(): "PROMISES" | "CALLBACK";
}
