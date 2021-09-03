import Request from '../utils/Request'

class AppService {
    createOrder = form_data => Request().post('orders', form_data);
    allOrders = () => Request().get('orders/all');
    getSingleTask = id => Request().get(`order/${id}`);
    updateSingleTask = (id, form_data) => Request().post(`order/${id}`, form_data);
    deleteSingleTask = id => Request().delete(`order/${id}`);
}

export default new AppService();
