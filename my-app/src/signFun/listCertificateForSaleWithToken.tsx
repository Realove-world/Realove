import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const listCertificateForSaleWithToken = async (certificateId: number, price: string, currencyToken: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'listCertificateForSaleWithToken';
    const args = [certificateId.toString(), price.toString(), currencyToken];
  
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
      console.log('憑證已上架銷售 (Token):', payload);
    } catch (error) {
      console.error('上架憑證錯誤:', error);
    }
  };
  
  // 使用示例
    //listCertificateForSaleWithToken(1, '100', '0xTokenAddress'); // 100 units of token