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
const bitxor_sdk_1 = require("bitxor-sdk");
const index_1 = require("../index");
chai_1.use(chai_exclude_1.default);
describe('TransactionURI should', () => {
    it('be created with data and format', () => {
        const transactionURISerialized = new index_1.TransactionURI('foo', bitxor_sdk_1.TransactionMapping.createFromPayload);
        chai_1.expect(transactionURISerialized.data).to.deep.equal('foo');
    });
    it('accept nodeUrl, generationHash and webhookUrl parameters', () => {
        const transactionURI = new index_1.TransactionURI('test', bitxor_sdk_1.TransactionMapping.createFromPayload, 'local-network', 'http://localhost:3000', 'http://someexternalserver.com/webhookUrl');
        chai_1.expect(transactionURI.nodeUrl).to.deep.equal('http://localhost:3000');
        chai_1.expect(transactionURI.generationHash).to.deep.equal('local-network');
        chai_1.expect(transactionURI.webhookUrl).to.deep.equal('http://someexternalserver.com/webhookUrl');
    });
    it('be created from URI', () => {
        const serializedTransaction = 'B600000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000190544100000000000000005816E98404000000900FFE' +
            'A45AEA2EE9B880D5E4F9B91B75857F444F1766CDCB0600010000000000CC403C7A113BDF7' +
            'C80969800000000000068656C6C6F';
        const URI = 'web+bitxor://transaction?data=' + serializedTransaction + '&generationHash=test' +
            '&nodeUrl=http://localhost:3000';
        const transactionURI = index_1.TransactionURI.fromURI(URI, bitxor_sdk_1.TransactionMapping.createFromPayload);
        transactionURI.toTransaction();
        chai_1.expect(transactionURI.build()).to.deep.equal(URI);
    });
    it('be created from URI with a webhookUrl', () => {
        const serializedTransaction = 'B600000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000190544100000000000000005816E98404000000900FFE' +
            'A45AEA2EE9B880D5E4F9B91B75857F444F1766CDCB0600010000000000CC403C7A113BDF7' +
            'C80969800000000000068656C6C6F';
        const URI = 'web+bitxor://transaction?data=' + serializedTransaction +
            '&webhookUrl=http://someexternalserver.com/webhookUrl';
        const transactionURI = index_1.TransactionURI.fromURI(URI, bitxor_sdk_1.TransactionMapping.createFromPayload);
        transactionURI.toTransaction();
        chai_1.expect(transactionURI.build()).to.deep.equal(URI);
    });
    it('not be created from URI when data param is missing', () => {
        chai_1.expect(() => {
            index_1.TransactionURI.fromURI('web+bitxor://transaction?chain_id=test', bitxor_sdk_1.TransactionMapping.createFromPayload);
        }).to.throw('Invalid URI: data parameter missing');
    });
    it('build the URI from serialized data', () => {
        const serialized = bitxor_sdk_1.TransferTransaction.create(bitxor_sdk_1.Deadline.create(), bitxor_sdk_1.Account.generateNewAccount(bitxor_sdk_1.NetworkType.MIJIN_TEST).address, [bitxor_sdk_1.NetworkCurrencyPublic.createRelative(10)], bitxor_sdk_1.PlainMessage.create('hello'), bitxor_sdk_1.NetworkType.MIJIN_TEST).serialize();
        const transactionURI = new index_1.TransactionURI(serialized, bitxor_sdk_1.TransactionMapping.createFromPayload);
        chai_1.expect(transactionURI.build()).to.deep.equal('web+bitxor://transaction?data=' + serialized);
    });
    it('create a transaction', () => {
        const transaction = bitxor_sdk_1.TransferTransaction.create(bitxor_sdk_1.Deadline.create(), bitxor_sdk_1.Account.generateNewAccount(bitxor_sdk_1.NetworkType.MIJIN_TEST).address, [new bitxor_sdk_1.Token(new bitxor_sdk_1.TokenId('7cdf3b117a3c40cc'), bitxor_sdk_1.UInt64.fromUint(10000000))], bitxor_sdk_1.PlainMessage.create('hello'), bitxor_sdk_1.NetworkType.MIJIN_TEST);
        console.log(transaction.serialize());
        const transactionURI = new index_1.TransactionURI(transaction.serialize(), bitxor_sdk_1.TransactionMapping.createFromPayload);
        chai_1.expect(transactionURI.toTransaction()).to.deep.equal(transaction);
    });
});
//# sourceMappingURL=TransactionURI.spec.js.map