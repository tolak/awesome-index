## Play with inDEX Protocol

This repo contains the simple code to show how to interact with inDEX protocol with
[inDEX SDK](https://github.com/Phala-Network/index-sdk).

From this example, we are going to swap 1 WGLMR on Moonbeam to GLMR on Astar Evm environment.
The execution plan is (not optimized, just for demo purposes):
```
1.1 Swap Moonbeam/GWLMR to Moonbeam/xcDOT on StellaSwap
1.2 Swap Moonbeam/xcDOT to Moonbeam/xcPHA on StellaSwap
1.3 Bridge Moonbeam/xcPHA to Phala/PHA over Moonbeam XCM bridge

2 Bridge Phala/PHA to Astar/PHA over Phala XCM Bridge

3 Transfer Astar/PHA to AstarEvm/PHA according to the mapping policy

4.1 Swap AstarEvm/PHA to AstarEvm/WASTR on ArthSwap
4.2 Swap AstarEvm/WASTR to AstarEvm/GLMR on ArthSwap
```
1, 2, 3, 4 represent for dedicated transaction that will happen on the source chain, see [the solution](./test-solution.json) (or called execution plan) for more details.

## Getting started

Fill in your private key at here

```javascript
const wallet = new ethers.Wallet(
    '<your private key>',
    new ethers.JsonRpcProvider('https://rpc.api.moonbeam.network')
)
```
and issue command to have a try

```sh
yarn && node index.js
```
