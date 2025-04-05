import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';


const deactivateCurrency = async (tokenAddress: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'deactivateCurrency';
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
      console.log('幣種已停用:', payload);
    } catch (error) {
      console.error('停用幣種錯誤:', error);
    }
  };
  
  // 使用示例
  deactivateCurrency('0xTokenAddress');