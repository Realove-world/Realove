import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const sellNewCertificate = async (typeId: number, destination: string, itineraryDetails: string, startDate: string, endDate: string, price: string, currencyToken: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'sellNewCertificate';
    const args = [
      typeId.toString(),
      destination,
      itineraryDetails,
      startDate.toString(),
      endDate.toString(),
      price.toString(),
      currencyToken,
    ];
  
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
      console.log('新憑證已上架銷售:', payload);
    } catch (error) {
      console.error('上架新憑證錯誤:', error);
    }
  };
  
  // 使用示例
    //sellNewCertificate(1, 'Paris', '5-day tour', '1690000000', '1691000000', '1000000000000000000', '0xTokenAddress');