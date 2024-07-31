export declare class RPCError extends Error {
    code: number;
    constructor(code: number, message: string);
    toString(): string;
}
