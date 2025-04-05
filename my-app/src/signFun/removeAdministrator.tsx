import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';


const removeAdministrator = async (adminAddress: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'removeAdministrator';
    const args = [adminAddress];
  
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
      console.log('管理員已移除:', payload);
    } catch (error) {
      console.error('移除管理員錯誤:', error);
    }
  };
  
  // 使用示例
    //removeAdministrator('0xAdminToRemove');