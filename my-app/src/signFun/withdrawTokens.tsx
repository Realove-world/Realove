import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';
const withdrawTokens = async (tokenAddress: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'withdrawTokens';
    const args = [tokenAddress];
  
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
      console.log('代幣已提取:', payload);
    } catch (error) {
      console.error('提取代幣錯誤:', error);
    }
  };
  
  // 使用示例
  //withdrawTokens('0xTokenAddress');