export const fujiCollateralAddress = '0x3a424f11E1A9C04c8AFE5bf853653EBb94EAF3A3'
export const fujiCollateralABI = [{"inputs":[{"internalType":"address","name":"_router","type":"address"},{"internalType":"address","name":"link","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"FailedToWithdrawEth","type":"error"},{"inputs":[{"internalType":"uint256","name":"providedIndex","type":"uint256"},{"internalType":"uint256","name":"maxIndex","type":"uint256"}],"name":"IndexOutOfBound","type":"error"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"InvalidRouter","type":"error"},{"inputs":[{"internalType":"bytes32","name":"messageId","type":"bytes32"}],"name":"MessageIdNotExist","type":"error"},{"inputs":[{"internalType":"address","name":"msgSender","type":"address"},{"internalType":"bool","name":"locked","type":"bool"}],"name":"NoFundsLocked","type":"error"},{"inputs":[],"name":"NoMessageReceived","type":"error"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"NotEnoughBalance","type":"error"},{"inputs":[],"name":"NothingToWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"messageId","type":"bytes32"},{"indexed":true,"internalType":"uint64","name":"sourceChainSelector","type":"uint64"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"indexed":false,"internalType":"struct Client.EVMTokenAmount","name":"tokenAmount","type":"tuple"}],"name":"MessageReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"messageId","type":"bytes32"},{"indexed":true,"internalType":"uint64","name":"destinationChainSelector","type":"uint64"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"address","name":"depositor","type":"address"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"indexed":false,"internalType":"struct Client.EVMTokenAmount","name":"tokenAmount","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"fees","type":"uint256"}],"name":"MessageSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"messageId","type":"bytes32"},{"internalType":"uint64","name":"sourceChainSelector","type":"uint64"},{"internalType":"bytes","name":"sender","type":"bytes"},{"internalType":"bytes","name":"data","type":"bytes"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Client.EVMTokenAmount[]","name":"destTokenAmounts","type":"tuple[]"}],"internalType":"struct Client.Any2EVMMessage","name":"message","type":"tuple"}],"name":"ccipReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"locked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastReceivedMessageDetails","outputs":[{"internalType":"bytes32","name":"messageId","type":"bytes32"},{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfReceivedMessages","outputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"destinationChainSelector","type":"uint64"},{"internalType":"address","name":"receiver","type":"address"}],"name":"getSendFees","outputs":[{"internalType":"uint256","name":"fees","type":"uint256"},{"components":[{"internalType":"bytes","name":"receiver","type":"bytes"},{"internalType":"bytes","name":"data","type":"bytes"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Client.EVMTokenAmount[]","name":"tokenAmounts","type":"tuple[]"},{"internalType":"address","name":"feeToken","type":"address"},{"internalType":"bytes","name":"extraArgs","type":"bytes"}],"internalType":"struct Client.EVM2AnyMessage","name":"message","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"destChainSelector","type":"uint64"}],"name":"isChainSupported","outputs":[{"internalType":"bool","name":"supported","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"messageDetail","outputs":[{"internalType":"uint64","name":"sourceChainSelector","type":"uint64"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"receivedMessages","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"destinationChainSelector","type":"uint64"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"tokenToTransfer","type":"address"},{"internalType":"uint256","name":"transferAmount","type":"uint256"}],"name":"sendMessage","outputs":[{"internalType":"bytes32","name":"messageId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const fujiTokenAddress = '0x992Bdf6a1B1c91BBA89765cd7B5a60894c6180a0'

// export const fujiTokenABI = 
export const mumbaiLendingAddress = '0x0969ab26e7e06FEa347d293821Dcf53DB836865c'
export const mumbaiLendingABI = [{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"borrowTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_borrowTokenAddress","type":"address"},{"internalType":"uint256","name":"_collateralRate","type":"uint256"},{"internalType":"uint256","name":"_interestRate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BorrowTokens","type":"event"},{"inputs":[],"name":"depositCollateral","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositCollateral","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"repayLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RepayLoan","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawCollateral","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"borrowers","outputs":[{"internalType":"uint256","name":"collateralDeposited","type":"uint256"},{"internalType":"uint256","name":"tokensBorrowed","type":"uint256"},{"internalType":"uint256","name":"interestOwed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"}],"name":"getBorrowerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestLinkPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestMaticPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"}],"name":"getMaxBorrowable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"}],"name":"getMaxWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interestRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
export const mumbaiTokenAddress = '0x0000000000000000000000000000000000001010'