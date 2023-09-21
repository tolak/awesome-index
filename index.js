const ethers = require('ethers')
const {ASSETS, Client, Environment} = require('@phala/index')
const solution_Moonbeam_GLMR_AstarEvm_GLMR = require('./Moonbeam_GLMR_AstarEvm_GLMR.json')

async function main() {
    const wallet = new ethers.Wallet(
        '<your private key>',
        new ethers.JsonRpcProvider('https://rpc.api.moonbeam.network')
    )

    const indexClient = new Client({environment: Environment.TESTNET})
    await indexClient.isReady
    const moonbeam = indexClient.createEvmChain('Moonbeam')
    const asset = ASSETS.Moonbeam.GLMR
    const recipient = '<your account address on dest chain>'
    // 0.5 GLMR
    const amount = '500000000000000000'
    const deposit = await moonbeam.getDeposit(
        asset,
        amount,
        recipient,
        // Routing solution of swap GLMR on Moonbeam to GLMR on Astar EVM env
        // Moonbeam/GLMR -> Moonbeam/WGLMR -> Moonbeam/xcDOT -> Moonbeam/xcPHA -> Phala/PHA -> Astar/PHA -> AstarEvm/PHA -> AstarEvm/WASTR -> AstarEvm/GLMR
        solution_Moonbeam_GLMR_AstarEvm_GLMR,
    )

    const txResponse = await wallet.sendTransaction(deposit.tx)
    console.log(`Transaction has been sent: ${txResponse.hash}`)

    // Query status of task
    // const task = await indexClient.getTask(deposit.id)
}

main()
  .catch(console.error)
  .finally(() => process.exit())