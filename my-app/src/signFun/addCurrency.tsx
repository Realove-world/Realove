import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const addCurrency = async (tokenAddress: string, symbol: string, decimals: number) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'addCurrency';
    const args = [tokenAddress, symbol, decimals.toString()];
  
    try {
      const payload = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractAddress,
            abi: TravelCertificateShopABI,
            functionName: functionName,
            args: args,
          },
        ],
      });
      console.log('幣種已添加:', payload);
    } catch (error) {
      console.error('添加幣種錯誤:', error);
    }
  };
  
  // 使用示例
    //addCurrency('0xTokenAddress', 'USDC', 6);