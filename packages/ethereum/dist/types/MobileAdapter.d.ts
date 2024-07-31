/// <reference types="node" />
import type { IRequestArguments } from './types';
import { EthereumProvider } from './EthereumProvider';
/**
 * Adapting some requests to legacy mobile API
 *
 * This adapter provides the APIs with the method names and params the extension and mobile are
 * ready to handle, also fallbacks to RPC service in case it does not handle the request
 */
export declare class MobileAdapter {
    #private;
    private provider;
    static isUTF8(buffer: Buffer): boolean;
    static bufferToHex(buffer: Buffer | string): string;
    static messageToBuffer(message: string | Buffer): Buffer;
    constructor(provider: EthereumProvider);
    request<T>(args: IRequestArguments): Promise<T>;
    private personalECRecover;
    private personalSign;
    private ethSign;
    private ethSignTypedData;
}
