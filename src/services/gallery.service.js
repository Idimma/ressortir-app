import BaseService from "./BaseService";
import {catchAuthError} from "../utils";
import {toast} from "react-toastify";

class GalleryService extends BaseService {
    all = () =>Request().get(`gallery/image/list?perPage=2000`).then(({data: {data, links, meta}}) => {
        return {list: data, links, meta};
    }).catch((err) => {
        catchAuthError(err);
        return false;
    });
    upload = (formData) =>Request().post(`gallery/image/upload`, formData).then(({data: {data, message}}) => {
        toast.success(`${message}<br/>Image(s) uploaded successfully`);
        return data;
    }).catch((error) => {
        catchAuthError(error);
        return error.response.data;
    });
    delete = (formData) =>Request().delete(`gallery/image/delete`, formData)
        .then(({data: {status_code}}) => ({status_code})).catch(error => error.response.data);
    search = (term) =>Request().get(`gallery/image/search?perPage=8&q=${term}`);
}

export default new GalleryService();
