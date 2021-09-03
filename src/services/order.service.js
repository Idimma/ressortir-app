import Request from "../utils/Request";

class OrderService {
    all = (page = 1, status = null) => Request()
        .get(`ecommerce/order/requests?page=${page}${status && `&status=${status}`}`);
    fetch = (id) => Request().get(`ecommerce/order/${id}`);
    update = (id, form_data) => Request().post(`ecommerce/order/${id}`, form_data);
    delete = (id) => Request().delete(`ecommerce/order/${id}`);
    create = (form_data) => Request().post(`ecommerce/order/make-order`, form_data);
}

export default new OrderService();
