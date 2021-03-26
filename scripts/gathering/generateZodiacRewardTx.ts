import {read} from '../utils/spreadsheet';

const AssetAddress = '0xa342f5d851e866e18ff98f351f2c6637f4478db5';
const tokenIds: {[name: string]: string} = {
  rat:
    '55464657044963196816950587289035428064568320970692304673817341489687623131142',
  ox:
    '55464657044963196816950587289035428064568320970692304673817341489687623131146',
  tiger:
    '55464657044963196816950587289035428064568320970692304673817341489687623131141',
  rabbit:
    '55464657044963196816950587289035428064568320970692304673817341489687623131144',
  dragon:
    '55464657044963196816950587289035428064568320970692304673817341489687623131138',
  snake:
    '55464657044963196816950587289035428064568320970692304673817341489687623131147',
  horse:
    '55464657044963196816950587289035428064568320970692304673817341489687623131139',
  goat:
    '55464657044963196816950587289035428064568320970692304673817341489687623131143',
  monkey:
    '55464657044963196816950587289035428064568320970692304673817341489687623131137',
  rooster:
    '55464657044963196816950587289035428064568320970692304673817341489687623131136',
  dog:
    '55464657044963196816950587289035428064568320970692304673817341489687623131140',
  pig:
    '55464657044963196816950587289035428064568320970692304673817341489687623131145',
};

let addresses: string[] = [];
let ids: string[] = [];
let amounts: number[] = [];
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

    if (amounts.length === 100) {
      console.log(`

-------------------------------------------------------------------------------------------------------------------------------------


execute the following on 0xc653e1b3a971078812a72d11c45ad71e00f3ad1f (MultiSender)

function: send1155ToAddresses

args:

- ${addresses.join(',')}


- ${ids.join(',')}


- ${amounts.join(',')}


- ${AssetAddress}
`);
      addresses = [];
      ids = [];
      amounts = [];
    }
  }

  // function send1155ToAddresses(
  //   address[] calldata userAddresses,
  //   uint256[] calldata tokenIds,
  //   uint256[] calldata amounts,
  //   address tokenAddress)
  //   console.log(`
  // execute the following on 0xc653e1b3a971078812a72d11c45ad71e00f3ad1f (MultiSender)
  // function: send1155ToAddresses
  // args:
  //  - ${addresses.join(',')}
  //  - ${ids.join(',')}
  //  - ${amounts.join(',')}
  //  - ${AssetAddress}
  // `);
}

main().catch((e) => console.error(e));
