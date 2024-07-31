/// <reference types="node" />
import { EventEmitter } from 'events';
import type { CallbackAdapter } from './adapter/CallbackAdapter';
import type { PromiseAdapter } from './adapter/PromiseAdapter';
import { Adapter } from './adapter/Adapter';
export interface IRequestArguments {
    method: string;
    params?: unknown[] | object;
}
export interface IBaseProvider {
    sendResponse(requestId: number, response: any): void;
    sendError(requestId: number, response: any): void;
    setAdapter(adapter: Adapter): IBaseProvider;
    request(args: IRequestArguments): Promise<unknown>;
}
/**
 * Base provider
 *
 * All providers should extend this one
 */
export declare abstract class BaseProvider extends EventEmitter implements IBaseProvider {
    adapter: CallbackAdapter | PromiseAdapter;
    setAdapter(adapter: CallbackAdapter | PromiseAdapter): this;
    /**
     *
     * @param args
     */
    request<T>(args: IRequestArguments): Promise<T>;
    abstract getNetwork(): string;
    /**
     * Send Response if the adapter is on callback mode
     * @param requestId
     * @param response
     */
    sendResponse(requestId: number, response: any): void;
    /**
     * Send error
     * @param requestId
     * @param response
     */
    sendError(requestId: number, response: any): void;
}
