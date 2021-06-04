import Request from "../utils/Request";

class UserService {
  notifications = () => Request().get(`notifications`);
  readNotification = (id) => Request().patch(`notifications/mark/read/${id}`);
  readAllNotfiication = () => Request().patch(`notifications/mark/read/all`);
  deleteNotification = (id) => Request().delete(`notifications/${id}`);
  preference = (form_data) => Request().patch(`ecommerce/profile/preferences`);
  getNetwork = () => Request().get(`ecommerce/network`);
  getDescendant = (id) => Request().get(`ecommerce/network/${id}`);
  addAddress = (form_data) => Request().post(`ecommerce/delivery`, form_data);
  setAddressDefault = (id) => Request().patch(`ecommerce/delivery/default/${id}`);
  deleteAddress = (id) => Request().delete(`ecommerce/delivery/${id}`);
  updateAddress = (id, form_data) => Request().patch(`ecommerce/delivery/${id}`,form_data);

  updateNextOfKin = (form_data) => Request().patch(`ecommerce/profile/nextOfKin`, form_data);
  updateBank = (form_data) => Request().patch(`ecommerce/profile/bank`, form_data);
  updatePassword = (form_data) => Request().patch(`ecommerce/profile/password`, form_data);
  updatePersonal = (form_data) => Request().patch(`ecommerce/profile/personal`, form_data);
  updateAvatar = (form_data) => Request().post(`account/avatar`, form_data);
  updateUserAddress = (form_data) => Request().patch(`ecommerce/profile/address`, form_data);
  updateUser = (form_data) => Request().patch(`ecommerce/profile/basic`, form_data);
  fetchBank = () => Request().get(`ecommerce/profile/bank`);
}

export default new UserService();
