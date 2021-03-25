import {read} from '../utils/spreadsheet';

const tokenIds: {[name: string]: string} = {
  rat: 'TODO',
  ox: 'TODO',
  tiger: 'TODO',
  rabbit: 'TODO',
  dragon: 'TODO',
  snake: 'TODO',
  horse: 'TODO',
  goat: 'TODO',
  monkey: 'TODO',
  rooster: 'TODO',
  dog: 'TODO',
  pig: 'TODO',
};

const addresses: string[] = [];
const ids: string[] = [];
const amounts: number[] = [];
async function main() {
  const data = await read(
    {document: '1UGGMtl8L9qY7MgVSfz5YM4iOCQa5lOK3rcv1rDCr0RE', sheet: 'Sheet1'},
    'B2:C1201'
  );
  for (const row of data) {
    addresses.push(row[0]);
    const tokenName: string = row[1].toLowerCase();
    const tokenId = tokenIds[tokenName];
    if (!tokenId) {
      throw new Error(`unknown token: ${row[1]}`);
    }
    ids.push(tokenId);
    amounts.push(1);
  }
  console.log(`
execute the following on 0xc653e1b3a971078812a72d11c45ad71e00f3ad1f (MultiSender)
function: send1155ToAddresses
args:
 - ${addresses.join(',')}
 - ${ids.join(',')}
 - ${amounts.join(',')}
`);
}

main().catch((e) => console.error(e));
