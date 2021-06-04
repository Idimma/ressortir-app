import Request from "../utils/Request";

class RoleService {
    listPermissions = () => Request().get(`admin/roles/permissions`);
    listRoles = () => Request().get(`admin/roles?perPage=12`);
    addRole = (form_data) => Request().post(`admin/roles`, form_data);
    fetch = (id) => Request().get(`admin/roles/${id}`);
    update = (id, form_data) => Request().patch(`admin/roles/${id}`, form_data);
    delete = (id) => Request().delete(`admin/roles/${id}`);
}

export default new RoleService();
