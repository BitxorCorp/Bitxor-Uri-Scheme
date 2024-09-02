"use strict";
/*
   Copyright 2022 Kriptxor Corp, Microsula S.A.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionURI = void 0;
const parse = require("url-parse");
class TransactionURI {
    /**
     * Create a TransactionURI.
     *
     * @param   data - Transaction payload.
     * @param   generationHash  - Network generation hash.
     * @param   nodeUrl - Node url to submit the transaction.
     * @param   webhookUrl - URL to make a POST request after announcing the transaction.
     */
    constructor(data, transactionMapper, generationHash, nodeUrl, webhookUrl) {
        this.data = data;
        this.transactionMapper = transactionMapper;
        this.generationHash = generationHash;
        this.nodeUrl = nodeUrl;
        this.webhookUrl = webhookUrl;
    }
    /**
     * Static constructor function from URI
     * @param   uri - Transaction URI scheme
     * @param   {ITransactionMapper} transactionMapper - creates a transaction object from given payload
     * @returns {TransactionURI}
     */
    static fromURI(uri, transactionMapper) {
        const url = parse(uri, true);
        if (!url.query.data) {
            throw Error('Invalid URI: data parameter missing');
        }
        return new TransactionURI(url.query.data, transactionMapper, url.query.generationHash, url.query.nodeUrl, url.query.webhookUrl);
    }
    /**
     * Turn TransactionURI into Transaction object
     * @returns {Transaction}
     */
    toTransaction() {
        return this.transactionMapper(this.data);
    }
    /**
     * Build the URI
     */
    build() {
        const base = TransactionURI.PROTOCOL
            + TransactionURI.ACTION
            + '?data=' + this.data;
        const generationHash = this.generationHash ? '&generationHash=' + this.generationHash : '';
        const nodeUrl = this.nodeUrl ? '&nodeUrl=' + this.nodeUrl : '';
        const webhookUrl = this.webhookUrl ? '&webhookUrl=' + this.webhookUrl : '';
        return base + generationHash + nodeUrl + webhookUrl;
    }
}
exports.TransactionURI = TransactionURI;
TransactionURI.PROTOCOL = 'web+bitxor://';
TransactionURI.ACTION = 'transaction';
//# sourceMappingURL=TransactionURI.js.map