import Request from '../utils/Request';

class AuthService   {
  login = (data) =>  Request().post('login', data);
  logout = () =>  Request().post('logout');
  registerStart = (data) =>  Request().post('register', data);
  update = form_data => Request().post('user/update', form_data);
  updateDetails = form_data => Request().post('user/update/details', form_data);
  register = form_data => Request().post('register', form_data);
  resetPassword = form_data => Request().post('password/reset', form_data);
  forgetPassword = form_data => Request().post('password/forgot', form_data);
  verifyToken = token => Request().get(`password/find/${token}`);
  editPassword = data => Request().post('update/password', data).then(r => r.data);
  findById = () => Request().get('user');

}
export default new AuthService();
