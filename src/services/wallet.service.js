import Request from "../utils/Request";

class WalletService {
    get = () => Request().get(`wallet`);
    history = (param = {}) => Request().get(`wallet/history?perPage=10`, param);
    withdrawalHistory = (param = {}) => Request().get(`withdraw/history?perPage=10`, param);
    stats = (param = {type: 'year'}) => Request().get(`stats`, param);
    withdrawal = (data) => Request().post(`withdraw`, data);
    cardTopUp = (amount, reference) => Request().post(`wallet/topup`, { type: "card", reference, amount});
    paycodeTopUp = (amount, paycode) => Request().post(`wallet/topup`, { type: "paycode", paycode, amount });
}

export default new WalletService();
