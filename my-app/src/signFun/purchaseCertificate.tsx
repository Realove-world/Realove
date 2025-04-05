import { MiniKit } from '@worldcoin/minikit-js';
import TravelCertificateShopABI from '../lib/travalABI.json';
const purchaseCertificate = async () => {
    if (!MiniKit.isInstalled()) {
      console.log('MiniKit 未安裝');
      return;
    }
  
    const contractAddress = '0xYourContractAddress';
    const certificateId = '1'; // 要購買的憑證 ID
    const salePrice = '1000000000000000000'; // 假設售價為 1 ETH
  
    try {
      const payload = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractAddress,
            abi: TravelCertificateShopABI,
            functionName: 'purchaseCertificate',
            args: [certificateId],
            value: salePrice, // 支付的 ETH 數量（以 wei 為單位）
          },
        ],
      });
      console.log('購買交易已發送:', payload);
    } catch (error) {
      console.error('購買交易錯誤:', error);
    }
  };
  
  purchaseCertificate();