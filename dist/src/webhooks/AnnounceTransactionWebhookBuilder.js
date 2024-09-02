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
exports.AnnounceTransactionWebhookBuilder = void 0;
/**
 * Constructor.
 * @param {webhook} AnnounceTransactionWebhookDTO.
 */
class AnnounceTransactionWebhookBuilder {
    constructor(hash, signerPublicKey) {
        this.hash = hash;
        this.signerPublicKey = signerPublicKey;
    }
    /**
     * Build the webhook DTO
     */
    build() {
        return { action: 'AnnounceTransaction',
            data: {
                hash: this.hash,
                signerPublicKey: this.signerPublicKey
            }
        };
    }
}
exports.AnnounceTransactionWebhookBuilder = AnnounceTransactionWebhookBuilder;
//# sourceMappingURL=AnnounceTransactionWebhookBuilder.js.map