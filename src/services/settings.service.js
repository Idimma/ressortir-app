import Request from "../utils/Request";

class SettingsService {
    getAdmin = () => Request().get(`settings`);
    update = (form_data) => Request().put(`admin/settings`, form_data);
}
export default new SettingsService();
