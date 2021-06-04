import Request from '../utils/Request';

class AuthService   {
  login = (data) =>  Request().post('auth/login', data);
  logout = () =>  Request().post('auth/logout');
  registerStart = (data) =>  Request().post('signup/user', data);
  forgetPassword = (data) =>  Request().post('password/reset/start', data);
  resetPassword = (data) =>  Request().post('password/reset/complete', data);
  verifyOtp = (data) =>  Request().post('signup/otp/verify', data);
  requestOtp = (otp_secret) =>  Request().post('signup/otp/request', { otp_secret });
  getProfile = () =>  Request().get('auth/profile');
  payCode = (paycode) =>  Request().post(`auth/user/verify/${paycode}?gateway=paycode`);
  paystack = (reference) =>  Request().post(`auth/user/verify/${reference}?gateway=paystack`);
  getCommission = () =>  Request().get('ecommerce/commissions/distribution');
  getCommissionInfo = () =>  Request().get('ecommerce/commissions/info');
  refreshToken = () =>  Request().post('auth/refresh');
}
export default new AuthService();
