import Request from "../utils/Request";

class AdminService {
    list = () => Request().get(`admin/manage`);
    log = () => Request().get(`admin/logs?perPage=20`);
    create = (form_data) => Request().post(`admin/manage`, form_data);
    fetch = (id) => Request().get(`admin/manage/${id}`);
    update = (id, form_data) => Request().patch(`admin/manage/${id}`, form_data);
    detach = (id, role) => Request().patch(`admin/manage/role/${id}/${role}`);
    delete = (id) => Request().delete(`admin/manage/${id}`);
}

export default new AdminService();
