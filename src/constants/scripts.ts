import { Script } from '../models/Script'

export interface ContractHashTag {
  codeHashes: string[] // The code hashes whose hash type are type in mainnet and testnet are different
  txHashes: string[] //  mainnet and testnet contract tx hashes
  tag: string
  category: 'lock' | 'type'
  depType: 'dep_group' | 'code'
  hashType: string
}

export const ScriptTagExtraRules = new Map<string, (s: Script) => string>([
  [
    'secp256k1 / multisig',
    script => (script.args.length === 28 * 2 + 2 ? 'secp256k1 / multisig / locktime' : 'secp256k1 / multisig'),
  ],
])

export const MainnetContractHashTags: ContractHashTag[] = [
  {
    codeHashes: ['0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'],
    txHashes: ['0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c-0'],
    hashType: 'type',
    depType: 'dep_group',
    tag: 'secp256k1_blake160',
    category: 'lock',
  },
  {
    codeHashes: ['0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8'],
    txHashes: ['0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c-1'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1 / multisig',
    category: 'lock',
  },
  {
    codeHashes: ['0x0fb343953ee78c9986b091defb6252154e0bb51044fd2879fde5b27314506111'],
    txHashes: ['0xa05f28c9b867f8c5682039c10d8e864cf661685252aa74a008d255c33813bb81-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1 / anyone-can-pay (deprecated)',
    category: 'lock',
  },
  {
    codeHashes: ['0xd369597ff47f29fbc0d47d2e3775370d1250b85140c670e4718af712983a2354'],
    txHashes: ['0x4153a2014952d7cac45f285ce9a7c5c0c0e1b21f2d378b82ac1433cb11c25c4d-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1 / anyone-can-pay',
    category: 'lock',
  },
  {
    codeHashes: ['0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e'],
    txHashes: ['0xe2fb199810d49a4d8beec56718ba2593b665db9d52299a0f9e6e75416d73ff5c-2'],
    depType: 'code',
    hashType: 'type',
    tag: 'nervos dao',
    category: 'type',
  },
  {
    codeHashes: ['0x5e7a36a77e68eecc013dfa2fe6a23f3b6c344b04005808694ae6dd45eea4cfd5'],
    txHashes: ['0xc7813f6a415144643970c2e88e0bb6ca6a8edc5dd7c1022746f628284a9936d5-0'],
    hashType: 'type',
    depType: 'code',
    tag: 'sudt',
    category: 'type',
  },
  {
    codeHashes: ['0xbf43c3602455798c1a61a596e0d95278864c552fafe231c063b3fabf97a8febc'],
    txHashes: ['0x1d60cb8f4666e039f418ea94730b1a8c5aa0bf2f7781474406387462924d15d4-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'pwlock-k1-acpl',
    category: 'lock',
  },
  {
    codeHashes: ['0xe4d4ecc6e5f9a059bf2f7a82cca292083aebc0c421566a52484fe2ec51a9fb0c'],
    txHashes: ['0x04632cc459459cf5c9d384b43dee3e36f542a464bdd4127be7d6618ac6f8d268-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'cheque',
    category: 'lock',
  },
  {
    codeHashes: ['0x24b04faf80ded836efc05247778eec4ec02548dab6e2012c0107374aa3f68b81'],
    txHashes: [
      '0xb4c76f34382f03f39e2e39dd8a4cca037394bb3d032bde6a285c52e5a5e35535-0',
      '0xd521f52a7f4f4f00a25f0f6924c439844574d77d228113077ee0c84dc60ad11d-0',
      '0xdb29e26b3553559140bffddbc8f04011207db8a5996cbaf5b521db98e9d11b17-0',
      '0x8703457af1e3711aed7772bfe87ab50175cbf29439196cfdb34095e8cbbe3d45-0',
    ],
    depType: 'code',
    hashType: 'type',
    tag: 'm-nft_issuer',
    category: 'type',
  },
  {
    codeHashes: ['0xd51e6eaf48124c601f41abe173f1da550b4cbca9c6a166781906a287abbb3d9a'],
    txHashes: [
      '0xc3b5ada764ed341d42f86aee3ec17d7ffdd6372155b41b95687a7957b359ab39-0',
      '0xd521f52a7f4f4f00a25f0f6924c439844574d77d228113077ee0c84dc60ad11d-1',
      '0xdb29e26b3553559140bffddbc8f04011207db8a5996cbaf5b521db98e9d11b17-1',
      '0x8703457af1e3711aed7772bfe87ab50175cbf29439196cfdb34095e8cbbe3d45-1',
    ],
    depType: 'code',
    hashType: 'type',
    tag: 'm-nft_class',
    category: 'type',
  },
  {
    codeHashes: ['0x2b24f0d644ccbdd77bbf86b27c8cca02efa0ad051e447c212636d9ee7acaaec9'],
    txHashes: [
      '0xaf35eb9ba88d0b159ba450cfcc9089796cc401bc4089a43de018c12f990909a5-0',
      '0xd521f52a7f4f4f00a25f0f6924c439844574d77d228113077ee0c84dc60ad11d-2',
      '0xdb29e26b3553559140bffddbc8f04011207db8a5996cbaf5b521db98e9d11b17-2',
      '0x8703457af1e3711aed7772bfe87ab50175cbf29439196cfdb34095e8cbbe3d45-2',
    ],
    depType: 'code',
    hashType: 'type',
    tag: 'm-nft',
    category: 'type',
  },
  {
    codeHashes: ['0x614d40a86e1b29a8f4d8d93b9f3b390bf740803fa19a69f1c95716e029ea09b3'],
    txHashes: ['0x1a04142a2a745fb3b7e0e9b61241676c1c94ad8cdacb36f223661130a23fb007-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'unipass v2',
    category: 'lock',
  },
  {
    codeHashes: ['0xd01f5152c267b7f33b9795140c2467742e8424e49ebe2331caec197f7281b60a'],
    txHashes: ['0x86a5e91ad93475caf30a3d3b0258786dd463984f71e8471abc5574f206f6207a-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'unipass v3',
    category: 'lock',
  },
  {
    codeHashes: ['0x081dbffa88dab54ba426d231ca64eb760cea2fe9e16761a1da400da1b2cbe128'],
    txHashes: ['0x0f0c22372a05f3c5f47acb066c65f9bae86bdce043762310e50309cc5a77abd4-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'flashsigner',
    category: 'lock',
  },
  {
    codeHashes: ['0x1122a4fb54697cf2e6e3a96c9d80fd398a936559b90954c6e88eb7ba0cf652df'],
    txHashes: [
      '0x875db3381ebe7a730676c110e1c0d78ae1bdd0c11beacb7db4db08e368c2cd95-0',
      '0xae2d5838730fc096e68fe839aea50d294493e10054513c10ca35e77e82e9243b-0',
    ],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'cota',
    category: 'type',
  },
  {
    codeHashes: ['0x90ca618be6c15f5857d3cbd09f9f24ca6770af047ba9ee70989ec3b229419ac7'],
    txHashes: [
      '0x875db3381ebe7a730676c110e1c0d78ae1bdd0c11beacb7db4db08e368c2cd95-0',
      '0xae2d5838730fc096e68fe839aea50d294493e10054513c10ca35e77e82e9243b-0',
    ],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'cota_registry',
    category: 'type',
  },
  {
    codeHashes: ['0x000f87062a2fe9bb4a6cc475212ea11014b84deb32e0375ee51e6ec4a553e009'],
    txHashes: ['0x71b55e3641fdc8d00d9943a93b2c6e6ab42f7e57909009c2a1ad5c234956cdc5-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_custodian_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0xff602581f07667eef54232cce850cbca2c418b3418611c132fca849d1edcd775'],
    txHashes: ['0x61e576a7e5d2398ecc5b1a969d1af0142c87db0996c2f6fce41bf28f68d805b2-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_deposit_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x3714af858b8b82b2bb8f13d51f3cffede2dd8d352a6938334bb79e6b845e3658'],
    txHashes: ['0xe6389b5cf63eec1e2592e930414bc43f92508e529bdd5f5a07fa1dd140f4f20a-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_withdrawal_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x628b5f956b46ae27b50819a9ebab79ce5f957e6899ba0c75b8e142de2ed0dcd2'],
    txHashes: ['0x8eca99207a462a9005bd91d04e24911627769096220f867d1cc0a32e75a287a6-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_challenge_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0xb619184ab9142c51b0ee75f4e24bcec3d077eefe513115bad68836d06738fd2c'],
    txHashes: ['0x2e46a10a67987594d4eaee2d5f9ac96ce651f7bfb44e82c286a12a1950ad4f29-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_stake_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0xa4398768d87bd17aea1361edc3accd6a0117774dc4ebc813bfa173e8ac0d086d'],
    txHashes: ['0x625696834db4320214a8af09de74fd51fc8a83be69d920243f8ccd219071473b-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'omni_lock v1',
    category: 'lock',
  },
  {
    codeHashes: ['0x9b819793a64463aed77c615d6cb226eea5487ccfc0783043a587254cda2b6f26'],
    txHashes: ['0xdfdb40f5d229536915f2d5403c66047e162e25dedd70a79ef5164356e1facdc8-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'omni_lock v2',
    category: 'lock',
  },
  {
    codeHashes: ['0xfef1d086d9f74d143c60bf03bd04bab29200dbf484c801c72774f2056d4c6718'],
    txHashes: ['0x9f8e73e096f1583696760281004d71dc0cebd3c9aa6fb584949facde6e543e67-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_state_validator',
    category: 'type',
  },
  {
    codeHashes: ['0x096df264f38fff07f3acd318995abc2c71ae0e504036fe32bc38d5b6037364d4'],
    txHashes: ['0xf0cfb02fb435bf2f061cbf33b1b024a4944b3f4a95968a9d997d95dd2f76a7f9-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_eth_account_lock',
    category: 'lock',
  },
]

export const TestnetContractHashTags: ContractHashTag[] = [
  {
    codeHashes: ['0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'],
    txHashes: ['0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1_blake160',
    category: 'lock',
  },
  {
    codeHashes: ['0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8'],
    txHashes: ['0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37-1'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1 / multisig',
    category: 'lock',
  },
  {
    codeHashes: ['0x86a1c6987a4acbe1a887cca4c9dd2ac9fcb07405bbeda51b861b18bbf7492c4b'],
    txHashes: ['0x4f32b3e39bd1b6350d326fdfafdfe05e5221865c3098ae323096f0bfc69e0a8c-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1 / anyone-can-pay (deprecated)',
    category: 'lock',
  },
  {
    codeHashes: ['0x3419a1c09eb2567f6552ee7a8ecffd64155cffe0f1796e6e61ec088d740c1356'],
    txHashes: ['0xec26b0f85ed839ece5f11c4c4e837ec359f5adc4420410f6453b1f6b60fb96a6-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'secp256k1 / anyone-can-pay',
    category: 'lock',
  },
  {
    codeHashes: ['0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e'],
    txHashes: ['0x8f8c79eb6671709633fe6a46de93c0fedc9c1b8a6527a18d3983879542635c9f-2'],
    depType: 'code',
    hashType: 'type',
    tag: 'nervos dao',
    category: 'type',
  },
  {
    codeHashes: ['0x48dbf59b4c7ee1547238021b4869bceedf4eea6b43772e5d66ef8865b6ae7212'],
    txHashes: ['0xc1b2ae129fad7465aaa9acc9785f842ba3e6e8b8051d899defa89f5508a77958-0'],
    depType: 'code',
    hashType: 'data',
    tag: 'sudt (deprecated)',
    category: 'type',
  },
  {
    codeHashes: ['0xc5e5dcf215925f7ef4dfaf5f4b4f105bc321c02776d6e7d52a1db3fcd9d011a4'],
    txHashes: ['0xe12877ebd2c3c364dc46c5c992bcfaf4fee33fa13eebdf82c591fc9825aab769-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'sudt',
    category: 'type',
  },
  {
    codeHashes: ['0x58c5f491aba6d61678b7cf7edf4910b1f5e00ec0cde2f42e0abb4fd9aff25a63'],
    txHashes: ['0x4f254814b972421789fafef49d4fee94116863138f72ab1e6392daf3decfaec1-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'pwlock-k1-acpl',
    category: 'lock',
  },
  {
    codeHashes: ['0x6843c5fe3acb7f4dc2230392813cb9c12dbced5597fca30a52f13aa519de8d33'],
    txHashes: ['0x28ee75f9745828eaade301ef24d0b037404717469a299180ecb679259cb688ab-0'],
    depType: 'code', // TODO
    hashType: 'type',
    tag: 'pwlock-r1',
    category: 'lock',
  },
  {
    codeHashes: ['0x60d5f39efce409c587cb9ea359cefdead650ca128f0bd9cb3855348f98c70d5b'],
    txHashes: ['0x7f96858be0a9d584b4a9ea190e0420835156a6010a5fde15ffcdc9d9c721ccab-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'cheque',
    category: 'lock',
  },
  {
    codeHashes: ['0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed'],
    txHashes: [
      '0x744d2c4c4e6fabe66cfb08cb818532c50fffc682a7614746328c5d691a811c06-0',
      '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6-0',
      '0x194a0f84de41d006a07ece07c96a8130100818599fcf0b2ecf49e512b873ed6e-0',
      '0x3ecf42927509645dec38667d557dd9ba20d0d07267d769983495c1b6b9c70cc4-0',
      '0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c-0',
    ],
    depType: 'code',
    hashType: 'type',
    tag: 'm-nft_issuer',
    category: 'type',
  },
  {
    codeHashes: ['0x095b8c0b4e51a45f953acd1fcd1e39489f2675b4bc94e7af27bb38958790e3fc'],
    txHashes: [
      '0x4f27e40b302bcb3bf0af3deae460f46076de2b4db30c0212b14b341c20fcb330-0',
      '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6-1',
      '0x194a0f84de41d006a07ece07c96a8130100818599fcf0b2ecf49e512b873ed6e-1',
      '0x3ecf42927509645dec38667d557dd9ba20d0d07267d769983495c1b6b9c70cc4-1',
      '0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c-1',
    ],
    depType: 'code',
    hashType: 'type',
    tag: 'm-nft_class',
    category: 'type',
  },
  {
    codeHashes: ['0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f'],
    txHashes: [
      '0x7f9e3c1a2fc90411eb90fc2363101f6bd7b33875c3535117db5e52cd8a78b313-0',
      '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6-2',
      '0x194a0f84de41d006a07ece07c96a8130100818599fcf0b2ecf49e512b873ed6e-2',
      '0x3ecf42927509645dec38667d557dd9ba20d0d07267d769983495c1b6b9c70cc4-2',
      '0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c-2',
    ],
    depType: 'code',
    hashType: 'type',
    tag: 'm-nft',
    category: 'type',
  },
  {
    codeHashes: ['0x124a60cd799e1fbca664196de46b3f7f0ecb7138133dcaea4893c51df5b02be6'],
    txHashes: ['0x3d41e1c543f0fddcbb17157d15a2845d7c5fb0363561cd8f50ecd0e118b34f84-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'unipass v2',
    category: 'lock',
  },
  {
    codeHashes: ['0x3e1eb7ed4809b2d60650be96a40abfbdafb3fb942b7b37ec7709e64e2cd0a783'],
    txHashes: ['0x8b98ede6bf7b5baba767b1d2d46a13749fc810375b14152abbc259a7fc98e46d-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'unipass v3',
    category: 'lock',
  },
  {
    codeHashes: ['0x577a5e5930e2ecdd6200765f3442e6119dc99e87df474f22f13cab819c80b242'],
    txHashes: ['0xb66776ff3244033fcd15312ae8b17d384c11bebbb923fce3bd896d89f4744d48-0'],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'flashsigner',
    category: 'lock',
  },
  {
    codeHashes: ['0x89cd8003a0eaf8e65e0c31525b7d1d5c1becefd2ea75bb4cff87810ae37764d8'],
    txHashes: [
      '0xd8c7396f955348bd74a8ed4398d896dad931977b7c1e3f117649765cd3d75b86-0',
      '0xeb8c99e9aaff64ffea5a97100fa9e6c23e59afe7ab9789cd882e3bb9a930c3ea-0',
    ],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'cota',
    category: 'type',
  },
  {
    codeHashes: ['0x9302db6cc1344b81a5efee06962abcb40427ecfcbe69d471b01b2658ed948075'],
    txHashes: [
      '0xd8c7396f955348bd74a8ed4398d896dad931977b7c1e3f117649765cd3d75b86-0',
      '0xeb8c99e9aaff64ffea5a97100fa9e6c23e59afe7ab9789cd882e3bb9a930c3ea-0',
    ],
    depType: 'dep_group',
    hashType: 'type',
    tag: 'cota_registry',
    category: 'type',
  },
  {
    codeHashes: ['0x85ae4db0dd83f428a31deb342e4000af37ce2c9645d9e619df00096e3c50a2bb'],
    txHashes: ['0x7aed145beb6984fff008ca6224d0726d06a19959c4f01d15e49942d76e28747a-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_custodian_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x50704b84ecb4c4b12b43c7acb260ddd69171c21b4c0ba15f3c469b7d143f6f18'],
    txHashes: ['0x9caeec735f3cd2a60b9d12be59bb161f7c61ddab1ac22c4383a94c33ba6404a2-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_deposit_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x06ae0706bb2d7997d66224741d3ec7c173dbb2854a6d2cf97088796b677269c6'],
    txHashes: ['0x9c607a9a75ea4699dd01b1c2a478002343998cac8346d2aa582f35b532bd2b93-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_withdrawal_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x5a86c3bf1e8648b6a6f8abe6875720ccf9745ab225b68fa7c195f9d6635dea80'],
    txHashes: ['0x15598fb4d3fc4b7e0afcffc80ed0c02b62edb3f7875771f0397f17eef712b65d-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_challenge_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x7f5a09b8bd0e85bcf2ccad96411ccba2f289748a1c16900b0635c2ed9126f288'],
    txHashes: ['0x053fdb4ed3181eab3a3a5f05693b53a8cdec0a24569e16369f444bac48be7de9-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_stake_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x1e44736436b406f8e48a30dfbddcf044feb0c9eebfe63b0f81cb5bb727d84854'],
    txHashes: ['0xbcd73881ba53f1cd95d0c855395c4ffe6f54e041765d9ab7602d48a7cb71612e-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_state_validator',
    category: 'type',
  },
  {
    codeHashes: ['0x07521d0aa8e66ef441ebc31204d86bb23fc83e9edc58c19dbb1b0ebe64336ec0'],
    txHashes: ['0x21da20f275af89ca7172cb1cd7fcb8676056e4212ba3782e8c77afebae57c6ed-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'godwoken_eth_account_lock',
    category: 'lock',
  },
  {
    codeHashes: ['0x79f90bb5e892d80dd213439eeab551120eb417678824f282b4ffb5f21bad2e1e'],
    txHashes: ['0x9154df4f7336402114d04495175b37390ce86a4906d2d4001cf02c3e6d97f39c-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'omni_lock v1',
    category: 'lock',
  },
  {
    codeHashes: ['0xf329effd1c475a2978453c8600e1eaf0bc2087ee093c3ee64cc96ec6847752cb'],
    txHashes: ['0x27b62d8be8ed80b9f56ee0fe41355becdb6f6a40aeba82d3900434f43b1c8b60-0'],
    depType: 'code',
    hashType: 'type',
    tag: 'omni_lock v2',
    category: 'lock',
  },
]
