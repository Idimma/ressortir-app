import BaseService from "./BaseService";

class SlidesService extends BaseService{
    all = () =>Request().get(`admin/slides?perPage=12type=ecommerce`);
    create = (formData) =>Request().post(`admin/slides`, formData);
    delete = (id) =>Request().delete(`admin/slides/${id}`);
    toggleSlider = (id) =>Request().patch(`admin/slides/toggle/active/${id}`);
}

export default new SlidesService();
