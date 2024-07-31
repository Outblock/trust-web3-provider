import { IRequestArguments } from '@trustwallet/web3-provider-core';
import { CosmosProvider } from './CosmosProvider';
/**
 * Adapting some requests to legacy mobile API
 *
 * This adapter provides the APIs with the method names and params the extension and mobile are
 * ready to handle
 */
export declare class MobileAdapter {
    private provider;
    constructor(provider: CosmosProvider);
    /**
     * Mobile adapter maps some cosmos methods to existing mobile method names
     * @param args
     * @param next
     * @returns
     */
    request<T>(args: IRequestArguments, next: () => Promise<T>): Promise<T>;
}
