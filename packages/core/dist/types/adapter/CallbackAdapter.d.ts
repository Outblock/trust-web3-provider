import { IRequestArguments } from '../Provider';
import { Adapter, IAdapterRequestParams } from './Adapter';
export interface ICallbackAdapterRequestParams extends IAdapterRequestParams {
    id: number;
}
export interface IHandlerParams {
    id?: ICallbackAdapterRequestParams['id'];
    network: string;
    name: IAdapterRequestParams['method'];
    params: IAdapterRequestParams['params'];
    object: IAdapterRequestParams['params'];
}
/**
 * CallbackAdapter
 *
 * Adapter implementation that uses callbacks and requires
 * sendResponse() to resolve the web3 promise or sendError() to reject it
 */
export declare class CallbackAdapter extends Adapter {
    constructor();
    private callback;
    request(params: IRequestArguments, network: string): Promise<unknown>;
    sendResponse(requestId: number, response: any): void;
    sendError(requestId: number, error: any): void;
}
