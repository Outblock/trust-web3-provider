import { BaseProvider } from './Provider';
import { AdapterStrategyType, IHandler } from './adapter/Adapter';
/**
 * Trust web3 Provider
 *
 *
 */
export declare class Web3Provider {
    #private;
    constructor(params: {
        strategy: AdapterStrategyType;
        handler?: IHandler;
    });
    setHandler(handler: IHandler): void;
    private setAdapter;
    registerProvider(provider: BaseProvider): this;
    registerProviders(providers: BaseProvider[]): this;
    sendResponse(requestId: number, response: any): void;
    sendError(requestId: number, error: any): void;
}
export * from './Provider';
