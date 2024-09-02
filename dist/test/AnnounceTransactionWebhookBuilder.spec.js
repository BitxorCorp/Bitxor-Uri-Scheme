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
const chai_1 = require("chai");
const chai_exclude_1 = require("chai-exclude");
const index_1 = require("../index");
chai_1.use(chai_exclude_1.default);
describe('AnnounceTransactionWebhookBuilder should', () => {
    it('build webhook DTO', () => {
        const hash = 'a';
        const signerPublicKey = 'b';
        const dto = new index_1.AnnounceTransactionWebhookBuilder(hash, signerPublicKey).build();
        chai_1.expect(dto.action).to.deep.equal('AnnounceTransaction');
        chai_1.expect(dto.data.hash).to.deep.equal(hash);
        chai_1.expect(dto.data.signerPublicKey).to.deep.equal(signerPublicKey);
    });
});
//# sourceMappingURL=AnnounceTransactionWebhookBuilder.spec.js.map