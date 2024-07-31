import { IRequestArguments } from '../Provider';
import { Adapter } from './Adapter';
export declare class PromiseAdapter extends Adapter {
    constructor();
    request(params: IRequestArguments, network: string): Promise<any> | void;
}
