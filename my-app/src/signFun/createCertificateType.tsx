import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';
const sendTransaction = async () => {
  // 檢查 MiniKit 是否已安裝
  if (!MiniKit.isInstalled()) {
    console.log('MiniKit 未安裝');
    return;
  }

  const contractAddress = '0xYourContractAddress'; // 替換為您的合約部署地址
  const functionName = 'createCertificateType';
  const args = [
    'Luxury Tour',              // _name
    'A luxurious travel experience', // _description
    '1000000000000000000'       // _basePrice (1 ETH，以 wei 為單位)
  ]; // 參數需為字串格式

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
    console.log('交易已發送:', payload);
  } catch (error) {
    console.error('發送交易錯誤:', error);
  }
};

// 調用函數
sendTransaction();