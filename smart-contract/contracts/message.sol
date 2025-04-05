// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ERC-20 標準接口
 */
interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function decimals() external view returns (uint8);
}

/**
 * @title 旅遊憑證店鋪（多幣種支援）
 */
contract TravelCertificateShop {
    address public owner;
    
    struct Certificate {
        uint256 id;
        uint256 typeId;
        string destination;
        string itineraryDetails;
        uint256 startDate;
        uint256 endDate;
        uint256 price;
        address currentOwner;
        bool isForSale;
        uint256 salePrice;
        address currencyToken; // address(0)表示ETH
    }
    
    struct CertificateType {
        uint256 id;
        string name;
        string description;
        uint256 basePrice;
        bool isActive;
    }
    
    struct SupportedCurrency {
        address tokenAddress;
        string symbol;
        bool isActive;
        uint8 decimals;
    }
    
    // 管理員映射
    mapping(address => bool) public administrators;
    
    // 支援的幣種
    address[] public supportedCurrencyAddresses;
    mapping(address => SupportedCurrency) public supportedCurrencies;
    
    // 憑證類型映射
    mapping(uint256 => CertificateType) public certificateTypes;
    uint256 public nextCertificateTypeId = 1;
    
    // 憑證映射
    mapping(uint256 => Certificate) public certificates;
    uint256 public nextCertificateId = 1;
    
    // 用戶擁有的憑證
    mapping(address => uint256[]) public userCertificates;
    
    // 事件
    event AdministratorAdded(address indexed admin);
    event AdministratorRemoved(address indexed admin);
    event CertificateTypeCreated(uint256 indexed typeId, string name);
    event CertificateCreated(uint256 indexed id, uint256 indexed typeId, address indexed owner);
    event CertificatePurchased(uint256 indexed id, address indexed buyer, uint256 price);
    event CertificateListedForSale(uint256 indexed id, uint256 price);
    event CertificateRemovedFromSale(uint256 indexed id);
    event CurrencyAdded(address indexed tokenAddress, string symbol);
    event CurrencyStatusChanged(address indexed tokenAddress, bool isActive);
    event FundsWithdrawn(address indexed token, uint256 amount);
    
    // 錯誤碼常量
    uint8 constant E_OWNER_ONLY = 1;
    uint8 constant E_ADMIN_ONLY = 2;
    uint8 constant E_CERT_NOT_EXIST = 3;
    uint8 constant E_CERT_TYPE_NOT_EXIST = 4;
    uint8 constant E_CERT_TYPE_NOT_ACTIVE = 5;
    uint8 constant E_NOT_CERT_OWNER = 6;
    uint8 constant E_CURRENCY_NOT_SUPPORTED = 7;
    uint8 constant E_INVALID_ADDRESS = 8;
    uint8 constant E_ALREADY_ADMIN = 9;
    uint8 constant E_NOT_ADMIN = 10;
    uint8 constant E_CANNOT_REMOVE_OWNER = 11;
    uint8 constant E_INVALID_DATE = 12;
    uint8 constant E_PRICE_TOO_LOW = 13;
    uint8 constant E_NOT_FOR_SALE = 14;
    uint8 constant E_WRONG_PAYMENT_TYPE = 15;
    uint8 constant E_INSUFFICIENT_PAYMENT = 16;
    uint8 constant E_PRICE_MUST_BE_POSITIVE = 17;
    uint8 constant E_INSUFFICIENT_TOKEN_BALANCE = 18;
    uint8 constant E_INSUFFICIENT_ALLOWANCE = 19;
    uint8 constant E_TRANSFER_FAILED = 20;
    uint8 constant E_NO_FUNDS = 21;
    uint8 constant E_ETH_WITHDRAWAL = 22;
    
    modifier onlyOwner() {
        require(msg.sender == owner, string(abi.encodePacked(E_OWNER_ONLY)));
        _;
    }
    
    modifier onlyAdmin() {
        require(administrators[msg.sender] || msg.sender == owner, string(abi.encodePacked(E_ADMIN_ONLY)));
        _;
    }
    
    modifier certificateExists(uint256 _certificateId) {
        require(_certificateId > 0 && _certificateId < nextCertificateId, string(abi.encodePacked(E_CERT_NOT_EXIST)));
        _;
    }
    
    modifier certificateTypeExists(uint256 _typeId) {
        require(_typeId > 0 && _typeId < nextCertificateTypeId, string(abi.encodePacked(E_CERT_TYPE_NOT_EXIST)));
        require(certificateTypes[_typeId].isActive, string(abi.encodePacked(E_CERT_TYPE_NOT_ACTIVE)));
        _;
    }
    
    modifier onlyCertificateOwner(uint256 _certificateId) {
        require(certificates[_certificateId].currentOwner == msg.sender, string(abi.encodePacked(E_NOT_CERT_OWNER)));
        _;
    }
    
    modifier currencyIsSupported(address _tokenAddress) {
        require(
            _tokenAddress == address(0) || 
            (supportedCurrencies[_tokenAddress].tokenAddress != address(0) && 
             supportedCurrencies[_tokenAddress].isActive), 
            string(abi.encodePacked(E_CURRENCY_NOT_SUPPORTED))
        );
        _;
    }
    
    constructor() {
        owner = msg.sender;
        administrators[msg.sender] = true;
        
        // 添加ETH作為默認支援的幣種
        addCurrency(address(0), "ETH", 18);
    }
    
    /**
     * @dev 添加管理員
     */
    function addAdministrator(address _admin) external onlyOwner {
        require(_admin != address(0), string(abi.encodePacked(E_INVALID_ADDRESS)));
        require(!administrators[_admin], string(abi.encodePacked(E_ALREADY_ADMIN)));
        administrators[_admin] = true;
        emit AdministratorAdded(_admin);
    }
    
    /**
     * @dev 移除管理員
     */
    function removeAdministrator(address _admin) external onlyOwner {
        require(administrators[_admin], string(abi.encodePacked(E_NOT_ADMIN)));
        require(_admin != owner, string(abi.encodePacked(E_CANNOT_REMOVE_OWNER)));
        administrators[_admin] = false;
        emit AdministratorRemoved(_admin);
    }
    
    /**
     * @dev 添加支援的幣種
     */
    function addCurrency(address _tokenAddress, string memory _symbol, uint8 _decimals) public onlyAdmin {
        if (_tokenAddress != address(0)) {
            try IERC20(_tokenAddress).decimals() returns (uint8 tokenDecimals) {
                _decimals = tokenDecimals;
            } catch {}
        }
        
        if (supportedCurrencies[_tokenAddress].tokenAddress == address(0)) {
            supportedCurrencies[_tokenAddress] = SupportedCurrency({
                tokenAddress: _tokenAddress,
                symbol: _symbol,
                isActive: true,
                decimals: _decimals
            });
            supportedCurrencyAddresses.push(_tokenAddress);
            emit CurrencyAdded(_tokenAddress, _symbol);
        } else if (!supportedCurrencies[_tokenAddress].isActive) {
            supportedCurrencies[_tokenAddress].isActive = true;
            supportedCurrencies[_tokenAddress].symbol = _symbol;
            supportedCurrencies[_tokenAddress].decimals = _decimals;
            emit CurrencyStatusChanged(_tokenAddress, true);
        }
    }
    
    /**
     * @dev 停用支援的幣種
     */
    function deactivateCurrency(address _tokenAddress) external onlyAdmin {
        require(supportedCurrencies[_tokenAddress].tokenAddress != address(0), string(abi.encodePacked(E_CURRENCY_NOT_SUPPORTED)));
        require(supportedCurrencies[_tokenAddress].isActive, string(abi.encodePacked(E_CURRENCY_NOT_SUPPORTED)));
        require(_tokenAddress != address(0), "");
        
        supportedCurrencies[_tokenAddress].isActive = false;
        emit CurrencyStatusChanged(_tokenAddress, false);
    }
    
    /**
     * @dev 創建新的憑證類型
     */
    function createCertificateType(
        string memory _name,
        string memory _description,
        uint256 _basePrice
    ) external onlyAdmin returns (uint256) {
        uint256 typeId = nextCertificateTypeId;
        certificateTypes[typeId] = CertificateType({
            id: typeId,
            name: _name,
            description: _description,
            basePrice: _basePrice,
            isActive: true
        });
        nextCertificateTypeId++;
        
        emit CertificateTypeCreated(typeId, _name);
        return typeId;
    }
    
    /**
     * @dev 停用憑證類型
     */
    function deactivateCertificateType(uint256 _typeId) external onlyAdmin certificateTypeExists(_typeId) {
        certificateTypes[_typeId].isActive = false;
    }
    
    /**
     * @dev 重新啟用憑證類型
     */
    function reactivateCertificateType(uint256 _typeId) external onlyAdmin {
        require(_typeId > 0 && _typeId < nextCertificateTypeId, string(abi.encodePacked(E_CERT_TYPE_NOT_EXIST)));
        certificateTypes[_typeId].isActive = true;
    }
    
    /**
     * @dev 創建新的憑證並直接分配給用戶
     */
    function createCertificate(
        uint256 _typeId,
        string memory _destination,
        string memory _itineraryDetails,
        uint256 _startDate,
        uint256 _endDate,
        address _recipient
    ) external onlyAdmin certificateTypeExists(_typeId) returns (uint256) {
        require(_recipient != address(0), string(abi.encodePacked(E_INVALID_ADDRESS)));
        require(_endDate > _startDate, string(abi.encodePacked(E_INVALID_DATE)));
        
        uint256 certificateId = nextCertificateId;
        certificates[certificateId] = Certificate({
            id: certificateId,
            typeId: _typeId,
            destination: _destination,
            itineraryDetails: _itineraryDetails,
            startDate: _startDate,
            endDate: _endDate,
            price: certificateTypes[_typeId].basePrice,
            currentOwner: _recipient,
            isForSale: false,
            salePrice: 0,
            currencyToken: address(0)
        });
        nextCertificateId++;
        
        userCertificates[_recipient].push(certificateId);
        
        emit CertificateCreated(certificateId, _typeId, _recipient);
        return certificateId;
    }
    
    /**
     * @dev 管理員銷售新憑證
     */
    function sellNewCertificate(
        uint256 _typeId,
        string memory _destination,
        string memory _itineraryDetails,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _price,
        address _currencyToken
    ) external onlyAdmin certificateTypeExists(_typeId) currencyIsSupported(_currencyToken) returns (uint256) {
        require(_endDate > _startDate, string(abi.encodePacked(E_INVALID_DATE)));
        require(_price >= certificateTypes[_typeId].basePrice, string(abi.encodePacked(E_PRICE_TOO_LOW)));
        
        uint256 certificateId = nextCertificateId;
        certificates[certificateId] = Certificate({
            id: certificateId,
            typeId: _typeId,
            destination: _destination,
            itineraryDetails: _itineraryDetails,
            startDate: _startDate,
            endDate: _endDate,
            price: _price,
            currentOwner: address(this),
            isForSale: true,
            salePrice: _price,
            currencyToken: _currencyToken
        });
        nextCertificateId++;
        
        emit CertificateCreated(certificateId, _typeId, address(this));
        emit CertificateListedForSale(certificateId, _price);
        return certificateId;
    }
    
    /**
     * @dev 購買憑證（ETH支付）
     */
    function purchaseCertificate(uint256 _certificateId) external payable certificateExists(_certificateId) {
        Certificate storage certificate = certificates[_certificateId];
        require(certificate.isForSale, string(abi.encodePacked(E_NOT_FOR_SALE)));
        require(certificate.currencyToken == address(0), string(abi.encodePacked(E_WRONG_PAYMENT_TYPE)));
        require(msg.value >= certificate.salePrice, string(abi.encodePacked(E_INSUFFICIENT_PAYMENT)));
        
        address previousOwner = certificate.currentOwner;
        
        certificate.currentOwner = msg.sender;
        certificate.isForSale = false;
        certificate.salePrice = 0;
        
        userCertificates[msg.sender].push(_certificateId);
        
        if (previousOwner != address(this)) {
            payable(previousOwner).transfer(msg.value);
        }
        
        emit CertificatePurchased(_certificateId, msg.sender, msg.value);
    }
    
    /**
     * @dev 使用ERC-20代幣購買憑證
     */
    function purchaseCertificateWithToken(uint256 _certificateId) external certificateExists(_certificateId) {
        Certificate storage certificate = certificates[_certificateId];
        require(certificate.isForSale, string(abi.encodePacked(E_NOT_FOR_SALE)));
        require(certificate.currencyToken != address(0), string(abi.encodePacked(E_WRONG_PAYMENT_TYPE)));
        
        IERC20 token = IERC20(certificate.currencyToken);
        uint256 price = certificate.salePrice;
        address previousOwner = certificate.currentOwner;
        
        require(token.balanceOf(msg.sender) >= price, string(abi.encodePacked(E_INSUFFICIENT_TOKEN_BALANCE)));
        require(token.allowance(msg.sender, address(this)) >= price, string(abi.encodePacked(E_INSUFFICIENT_ALLOWANCE)));
        
        certificate.currentOwner = msg.sender;
        certificate.isForSale = false;
        certificate.salePrice = 0;
        
        userCertificates[msg.sender].push(_certificateId);
        
        if (previousOwner != address(this)) {
            require(token.transferFrom(msg.sender, previousOwner, price), string(abi.encodePacked(E_TRANSFER_FAILED)));
        } else {
            require(token.transferFrom(msg.sender, address(this), price), string(abi.encodePacked(E_TRANSFER_FAILED)));
        }
        
        emit CertificatePurchased(_certificateId, msg.sender, price);
    }
    
    /**
     * @dev 用戶將憑證放到市場上出售（ETH支付）
     */
    function listCertificateForSale(uint256 _certificateId, uint256 _price) external 
        certificateExists(_certificateId) 
        onlyCertificateOwner(_certificateId) 
    {
        require(_price > 0, string(abi.encodePacked(E_PRICE_MUST_BE_POSITIVE)));
        
        certificates[_certificateId].isForSale = true;
        certificates[_certificateId].salePrice = _price;
        certificates[_certificateId].currencyToken = address(0);
        
        emit CertificateListedForSale(_certificateId, _price);
    }
    
    /**
     * @dev 用戶將憑證放到市場上出售（ERC-20代幣支付）
     */
    function listCertificateForSaleWithToken(uint256 _certificateId, uint256 _price, address _currencyToken) external 
        certificateExists(_certificateId) 
        onlyCertificateOwner(_certificateId) 
        currencyIsSupported(_currencyToken)
    {
        require(_price > 0, string(abi.encodePacked(E_PRICE_MUST_BE_POSITIVE)));
        require(_currencyToken != address(0), "");
        
        certificates[_certificateId].isForSale = true;
        certificates[_certificateId].salePrice = _price;
        certificates[_certificateId].currencyToken = _currencyToken;
        
        emit CertificateListedForSale(_certificateId, _price);
    }
    
    /**
     * @dev 取消憑證出售
     */
    function removeCertificateFromSale(uint256 _certificateId) external 
        certificateExists(_certificateId) 
        onlyCertificateOwner(_certificateId) 
    {
        require(certificates[_certificateId].isForSale, string(abi.encodePacked(E_NOT_FOR_SALE)));
        
        certificates[_certificateId].isForSale = false;
        certificates[_certificateId].salePrice = 0;
        
        emit CertificateRemovedFromSale(_certificateId);
    }
    
    /**
     * @dev 獲取用戶擁有的所有憑證ID
     */
    function getUserCertificates(address _user) external view returns (uint256[] memory) {
        return userCertificates[_user];
    }
    
    /**
     * @dev 獲取所有支援的幣種地址
     */
    function getSupportedCurrencies() external view returns (address[] memory) {
        return supportedCurrencyAddresses;
    }
    
    /**
     * @dev 合約擁有者提取合約中的以太幣
     */
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, string(abi.encodePacked(E_NO_FUNDS)));
        
        payable(owner).transfer(balance);
        emit FundsWithdrawn(address(0), balance);
    }
    
    /**
     * @dev 合約擁有者提取合約中的代幣
     */
    function withdrawTokens(address _tokenAddress) external onlyOwner {
        require(_tokenAddress != address(0), string(abi.encodePacked(E_ETH_WITHDRAWAL)));
        
        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, string(abi.encodePacked(E_NO_FUNDS)));
        
        require(token.transfer(owner, balance), string(abi.encodePacked(E_TRANSFER_FAILED)));
        emit FundsWithdrawn(_tokenAddress, balance);
    }
        // 新增事件：當憑證成功兌換後觸發
    event CertificateRedeemed(uint256 indexed certificateId, address indexed redeemer);

    /**
     * @dev 兌換憑證以獲取前端服務，並銷毀該憑證
     * 只有憑證持有人可以呼叫此函式
     * 注意：此函式僅會刪除憑證記錄（mapping 中的紀錄），而 userCertificates 陣列中保留歷史紀錄
     */
    function redeemCertificate(uint256 _certificateId)
        external
        certificateExists(_certificateId)
        onlyCertificateOwner(_certificateId)
    {
        // (此處可在兌換前加入前端服務兌換邏輯，例如發送訊息給前端系統進行處理)

        // 刪除憑證記錄，視為憑證已銷毀
        delete certificates[_certificateId];
        emit CertificateRedeemed(_certificateId, msg.sender);
    }
}