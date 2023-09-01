const ethers = require('ethers')
const {ASSETS, Executor, Environment} = require('@phala/index')
const solution_Moonbeam_WGLMR_Astar_GLMR = require('./test-solution.json')

async function main() {
    const wallet = new ethers.Wallet(
        '<your private key>',
        new ethers.JsonRpcProvider('https://rpc.api.moonbeam.network')
    )

    const executor = new Executor({environment: Environment.TESTNET})
    await executor.isReady
    const moonbeam = executor.createEvmChain('Moonbeam')
    const asset = ASSETS.Moonbeam.WGLMR
    const recipient = '0xA29D4E0F035cb50C0d78c8CeBb56Ca292616Ab20'
    // 1 WGLMR
    const amount = '1000000000000000000'
    const deposit = await moonbeam.getDeposit(
        asset,
        amount,
        recipient,
        // Routing solution of swap WGLMR on Moonbeam to GLMR on Astar EVM env
        // Moonbeam/GWLMR -> Moonbeam/xcDOT -> Moonbeam/xcPHA -> Phala/PHA -> Astar/PHA -> AstarEvm/PHA -> AstarEvm/WASTR -> AstarEvm/GLMR
        solution_Moonbeam_WGLMR_Astar_GLMR,
    )

    const txResponse = await wallet.sendTransaction(deposit.tx)
    console.log(`Transaction has been sent: ${txResponse.hash}`)
}

main()
  .catch(console.error)
  .finally(() => process.exit())