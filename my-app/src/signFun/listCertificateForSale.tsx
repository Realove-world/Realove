import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const listCertificateForSale = async (certificateId: number, price: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'listCertificateForSale';
    const args = [certificateId.toString(), price.toString()];
  
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
      console.log('憑證已上架銷售 (ETH):', payload);
    } catch (error) {
      console.error('上架憑證錯誤:', error);
    }
  };
  
  // 使用示例
    //listCertificateForSale(1, '1000000000000000000'); // 1 ETH