import Request from "../utils/Request";

class PromoService {
    getAllPromoCodes = (page = 12) => Request().get(`ecommerce/promo_codes?page=${page}`);
    getPromo = (id) => Request().get(`ecommerce/promo_codes/${id}`);
    updatePromo = (id, form_data) => Request().patch(`ecommerce/promo_codes/${id}`, form_data);
    delete = (id) => Request().delete(`ecommerce/promo_codes/${id}`);
    create = (form_data) => Request().post(`ecommerce/promo_codes`, form_data);
}

export default new PromoService();
