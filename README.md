# Bitxor URI Scheme

[![npm version](https://badge.fury.io/js/bitxor-uri-scheme.svg)](https://badge.fury.io/js/bitxor-uri-scheme)
[![Build Status](https://travis-ci.com/bitxorcorp/bitxor-uri-scheme.svg?branch=main)](https://travis-ci.com/bitxorcorp/bitxor-uri-scheme)
[![Coverage Status](https://coveralls.io/repos/github/bitxorcorp/bitxor-uri-scheme/badge.svg?branch=main)](https://coveralls.io/github/bitxorcorp/bitxor-uri-scheme?branch=main)
[![Slack](https://img.shields.io/badge/chat-on%20slack-green.svg)](https://bitxor.slack.com/messages/CB0UU89GS//)

URI Scheme library to serve Bitxor transactions ready to be signed.

This is a PoC to validate the proposed [NIP2 Transaction URI Scheme](https://github.com/bitxorcorp/NIP/issues/6). When stable, the repository will be moved to the [bitxorcorp](https://github.com/bitxorcorp) organization.

## Requirements

- Node.js 12 LTS

## Installation

``npm install bitxor-uri-scheme``

## Usage

### Generate URI from Transaction

```ts
// examples/TransactionToURI.ts

import { Account, Deadline, EmptyMessage, NetworkCurrencyPublic, NetworkType, TransferTransaction, TransactionMapping } from 'bitxor-sdk';

import { TransactionURI } from '../src/uris/TransactionURI';

const serializedTransaction = TransferTransaction.create(
    Deadline.create(),
    Account.generateNewAccount(NetworkType.TEST_NET).address,
    [NetworkCurrencyPublic.createRelative(10)],
    EmptyMessage,
    NetworkType.TEST_NET
).serialize();

const generationHash = 'ABC'; // replace with network generation hash
const nodeUrl = 'http://localhost:3000';
const webhookUrl = 'http://myapp.local/id';

const transactionURI = new TransactionURI(serializedTransaction, TransactionMapping.createFromPayload, generationHash, nodeUrl, webhookUrl);
console.log(transactionURI.build());

```

### Create Transaction from URI

```ts
// examples/URIToTransaction.ts

import { TransactionMapping } from 'bitxor-sdk';
import { TransactionURI } from '../src/uris/TransactionURI';

const serializedTransaction = 'B600000000000000000000000000000000000000000' +
'0000000000000000000000000000000000000000000000000000000000000000000000000' +
'0000000000000000000000000000000000000000000000000000000000000000000000000' +
'0000000000000000000000000000190544100000000000000005816E98404000000900FFE' +
'A45AEA2EE9B880D5E4F9B91B75857F444F1766CDCB0600010000000000CC403C7A113BDF7' +
'C80969800000000000068656C6C6F';

const URI = 'web+bitxor://transaction?data=' + serializedTransaction + '&generationHash=test' +
    '&nodeUrl=http://localhost:3000&webhookUrl=http://myapp.local/id';
const transactionURI = TransactionURI.fromURI(URI, TransactionMapping.createFromPayload);

const transaction = transactionURI.toTransaction();
console.log(transaction);

```

## Getting help

Use the following available resources to get help:

- [Bitxor Documentation][docs]
- Join the community [slack group (#sig-client)][slack] 
- If you found a bug, [open a new issue][issues]

## Contributing

Contributions are welcome and appreciated. 
Check [CONTRIBUTING](CONTRIBUTING.md) for information on how to contribute.

## License

Copyright 2022 Kriptxor Corp, Microsula S.A.

Licensed under the [Apache License 2.0](LICENSE)

[self]: https://github.com/bitxorcorp/bitxor-uri-scheme
[docs]: https://bitxorcorp.github.io
[issues]: https://github.com/bitxorcorp/bitxor-uri-scheme/issues
[slack]: https://join.slack.com/t/bitxor/shared_invite/enQtMzY4MDc2NTg0ODgyLWZmZWRiMjViYTVhZjEzOTA0MzUyMTA1NTA5OWQ0MWUzNTA4NjM5OTJhOGViOTBhNjkxYWVhMWRiZDRkOTE0YmU
