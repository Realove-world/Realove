import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';

const addAdministrator = async (adminAddress: string) => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const functionName = 'addAdministrator';
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
      console.log('管理員已添加:', payload);
    } catch (error) {
      console.error('添加管理員錯誤:', error);
    }
  };
  
  // 使用示例
    //addAdministrator('0xNewAdminAddress');