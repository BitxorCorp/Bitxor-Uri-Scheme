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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionURI = void 0;

var parse = require("url-parse");

var TransactionURI =
/*#__PURE__*/
function () {
  /**
   * Create a TransactionURI.
   *
   * @param   data - Transaction payload.
   * @param   generationHash  - Network generation hash.
   * @param   nodeUrl - Node url to submit the transaction.
   * @param   webhookUrl - URL to make a POST request after announcing the transaction.
   */
  function TransactionURI(data, transactionMapper, generationHash, nodeUrl, webhookUrl) {
    _classCallCheck(this, TransactionURI);

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


  _createClass(TransactionURI, [{
    key: "toTransaction",

    /**
     * Turn TransactionURI into Transaction object
     * @returns {Transaction}
     */
    value: function toTransaction() {
      return this.transactionMapper(this.data);
    }
    /**
     * Build the URI
     */

  }, {
    key: "build",
    value: function build() {
      var base = TransactionURI.PROTOCOL + TransactionURI.ACTION + '?data=' + this.data;
      var generationHash = this.generationHash ? '&generationHash=' + this.generationHash : '';
      var nodeUrl = this.nodeUrl ? '&nodeUrl=' + this.nodeUrl : '';
      var webhookUrl = this.webhookUrl ? '&webhookUrl=' + this.webhookUrl : '';
      return base + generationHash + nodeUrl + webhookUrl;
    }
  }], [{
    key: "fromURI",
    value: function fromURI(uri, transactionMapper) {
      var url = parse(uri, true);

      if (!url.query.data) {
        throw Error('Invalid URI: data parameter missing');
      }

      return new TransactionURI(url.query.data, transactionMapper, url.query.generationHash, url.query.nodeUrl, url.query.webhookUrl);
    }
  }]);

  return TransactionURI;
}();

exports.TransactionURI = TransactionURI;
TransactionURI.PROTOCOL = 'web+bitxor://';
TransactionURI.ACTION = 'transaction';