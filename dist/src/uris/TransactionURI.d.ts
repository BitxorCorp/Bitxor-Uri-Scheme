import { IURIScheme } from './IURIScheme';
import { ITransactionMapper } from './ITransactionMapper';
export declare class TransactionURI<T> implements IURIScheme<T> {
    readonly data: string;
    readonly transactionMapper: ITransactionMapper<T>;
    readonly generationHash?: string | undefined;
    readonly nodeUrl?: string | undefined;
    readonly webhookUrl?: string | undefined;
    static readonly PROTOCOL: string;
    static readonly ACTION: string;
    /**
     * Create a TransactionURI.
     *
     * @param   data - Transaction payload.
     * @param   generationHash  - Network generation hash.
     * @param   nodeUrl - Node url to submit the transaction.
     * @param   webhookUrl - URL to make a POST request after announcing the transaction.
     */
    constructor(data: string, transactionMapper: ITransactionMapper<T>, generationHash?: string | undefined, nodeUrl?: string | undefined, webhookUrl?: string | undefined);
    /**
     * Static constructor function from URI
     * @param   uri - Transaction URI scheme
     * @param   {ITransactionMapper} transactionMapper - creates a transaction object from given payload
     * @returns {TransactionURI}
     */
    static fromURI<T>(uri: string, transactionMapper: ITransactionMapper<T>): TransactionURI<T>;
    /**
     * Turn TransactionURI into Transaction object
     * @returns {Transaction}
     */
    toTransaction(): T;
    /**
     * Build the URI
     */
    build(): string;
}
