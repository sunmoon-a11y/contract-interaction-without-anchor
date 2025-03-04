How to send transaction without anchor frame in frontend ?

```
import { useWallet } from "@solana/wallet-adapter-react";
import { BorshCoder } from "@coral-xyz/anchor"; // Encoding and decoding are complicated
import {
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage, Connection, clusterApiUrl
} from "@solana/web3.js";

// ******************************* //
// ******************************* //

const { signTransaction, sendTransaction } = useWallet();

const connection = new Connection(clusterApiUrl('devnet'))

const keys = [
   {"pubkey": publicKey,"isWritable": true,"isSigner": true},
   {"pubkey": programState,"isWritable": true,"isSigner": false},
   ...
   ...
   // Refer to your own contract's method declarations
]

const instruction = new TransactionInstruction({
   keys,
   programId: "your contract address",
   data: new BorshCoder(“idl json”).instruction.encode('Method Name', 'Method Args') 
   // If you have any questions, please contact me 📮solanaLOLfun@gmail.com
})

const block = await cc.getLatestBlockhash();

const trMessage = new TransactionMessage({
   payerKey: "your wallet publicKey",
   instructions: [instruction],
   recentBlockhash: block.blockhash
}).compileToV0Message()

const versionedTr = new VersionedTransaction(trMessage)

// Method 1
const signTr = await signTransaction(versionedTr)
const rawTx = signTr.serialize();
const signature = await connection.sendRawTransaction(rawTx)

// Method 2
const signTr = await signTransaction(versionedTr)
const signature = await connection.sendTransaction(signTr)

// Method 3
const signature = await sendTransaction(versionedTr, connection)

console.info(signature)
```
