import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const withdrawETH = async () => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'withdrawETH';
  
    try {
      const payload = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractAddress,
            abi: TravelCertificateShopABI,
            functionName: functionName,
            args: [],
          },
        ],
      });
      console.log('ETH 已提取:', payload);
    } catch (error) {
      console.error('提取 ETH 錯誤:', error);
    }
  };
  
  // 使用示例
   // withdrawETH();