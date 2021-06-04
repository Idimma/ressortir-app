import Request from '../utils/Request';

class CartService {
  all = () => Request()
    .get(`ecommerce/cart`);
  location = (lat, long) => Request()
    .get(`ecommerce/cart/pickup-locations?lat=${lat}&long=${long}`);
  create = (formData) => Request()
    .post(`ecommerce/cart/add`, formData);
  applyPromo = (id) => Request()
    .get(`ecommerce/cart/apply-code?promo_code=${id}`);
  getDelivery = (data = {}) => Request()
    .patch(`ecommerce/cart/delivery`, data);
  getPickup = (data = {}) => Request()
    .patch(`ecommerce/cart/pickup`, data);

  delete = (id) => Request()
    .delete(`ecommerce/cart/${id}`);
  deleteByProduct = (id) => Request()
    .delete(`ecommerce/cart/product/${id}`);
  changeLocation = (params = {}) => Request()
    .patch(`ecommerce/cart/pickup-locations`, params);
}

export default new CartService();
