// How to query data on SOLANA?
// How to decode data ?

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import {
  getAddressDecoder,
} from "@solana/addresses";
import {
  getStructDecoder,
  fixDecoderSize,
  getBytesDecoder,
  getArrayDecoder,
} from "@solana/codecs";

export function findProgramStatePDA(programId) {
  const [state] = PublicKey.findProgramAddressSync(
    [Buffer.from("program-state")],
    programId
  );
  return state;
}

try {
  const structDecoder =
    getStructDecoder([
      ["anchorDiscriminator", fixDecoderSize(getBytesDecoder(), 8)], // for anchor rust, fixed
      // The following are all based on the contract fields.
      ["admin", getAddressDecoder()],
      ["wizMint", getAddressDecoder()],
      ["feeRecipient", getAddressDecoder()],
      ["poolMap", getArrayDecoder(getAddressDecoder())],
    ]);
  new Connection(clusterApiUrl('devnet'))
    .getAccountInfo(findProgramStatePDA(new PublicKey('AJakoPQCZADTtCjNN8ETNXFbF2nmVhprAudDNrcL8RD2'))) // contract address
    .then((res) => {
      console.info(structDecoder.decode(res.data))
    })
} catch (error) {
  // You may need to climb over the wall
  console.info(error);
}
