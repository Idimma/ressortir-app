import Request from "../utils/Request";

class PagesService {
    all = (page = 12) => Request().get(`admin/pages?page=${page}`);
    get = (id) => Request().get(`admin/pages/${id}`);
    update = (id, form_data) => Request().patch(`admin/pages/${id}`, form_data);
    delete = (id) => Request().delete(`admin/pages/${id}`);
    create = (form_data) => Request().post(`admin/pages`, form_data);
}

export default new PagesService();
