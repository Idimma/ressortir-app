import BaseService from "./BaseService";

class PayCodeService extends BaseService{
    all = () =>Request().get(`paycode?perPage=12type=ecommerce`);
    create = (formData) =>Request().post(`paycode`, formData);
    delete = (id) =>Request().delete(`paycode/${id}`);
    fetch = (id) =>Request().get(`paycode/${id}`);
    toggleSlider = (id) =>Request().patch(`paycode/toggle/active/${id}`);
}

export default new PayCodeService();
