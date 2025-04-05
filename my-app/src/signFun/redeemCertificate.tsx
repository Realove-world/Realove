import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const redeemCertificate = async (certificateId: number) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'redeemCertificate';
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
      console.log('憑證已兌換:', payload);
    } catch (error) {
      console.error('兌換憑證錯誤:', error);
    }
  };
  
  // 使用示例
  //  redeemCertificate(1);