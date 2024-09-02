import { IWebhookBuilder, WebhookDTO } from './IWebhookBuilder';
interface AnnounceTransactionWebhookDTO extends WebhookDTO {
    action: 'AnnounceTransaction';
    data: {
        'hash': string;
        'signerPublicKey': string;
    };
}
/**
 * Constructor.
 * @param {webhook} AnnounceTransactionWebhookDTO.
 */
export declare class AnnounceTransactionWebhookBuilder implements IWebhookBuilder {
    readonly hash: string;
    readonly signerPublicKey: string;
    constructor(hash: string, signerPublicKey: string);
    /**
     * Build the webhook DTO
     */
    build(): AnnounceTransactionWebhookDTO;
}
export {};
