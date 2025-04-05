import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const removeCertificateFromSale = async (certificateId: number) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'removeCertificateFromSale';
    const args = [certificateId.toString()];
  
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
      console.log('憑證已下架:', payload);
    } catch (error) {
      console.error('下架憑證錯誤:', error);
    }
  };
  
  // 使用示例
    //removeCertificateFromSale(1);