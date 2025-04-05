import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const createCertificate = async (typeId: number, destination: string, itineraryDetails: string, startDate: string, endDate: string, recipient: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'createCertificate';
    const args = [
      typeId.toString(),
      destination,
      itineraryDetails,
      startDate.toString(),
      endDate.toString(),
      recipient,
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
      console.log('憑證已創建:', payload);
    } catch (error) {
      console.error('創建憑證錯誤:', error);
    }
  };
  
  // 使用示例
  createCertificate(1, 'Paris', '5-day tour', '1690000000', '1691000000', '0xRecipientAddress');