import Request from "../utils/Request";
import BaseService from './BaseService';

class ProductService extends  BaseService{
    getAllProducts = (page = 1, params = {}) => Request().get( `ecommerce/products?page=${page}`, {
      params
    });
    exportProduct = () => Request().get( `ecommerce/products/export`);
    fetchProduct = () => Request().get( `ecommerce/products`);

    getAllProductReviews = (page = 1, search = '') =>
        Request().get( `ecommerce/reviews?page=${page}${search && '&search=' + search}`);
    getProductReviews = (product_id, page = 1, search = '') =>
        Request().get( `ecommerce/products/reviews/${product_id}?page=${page}${search && '&search=' + search}`);
    deleteProductReviews = (review_id) => Request().delete( `ecommerce/reviews/${review_id}`);


    getProduct = (id) => Request().get( `ecommerce/products/${id}`);
    getProductInfo = () => Request().get( `ecommerce/products/info`);

    publishMultipleProduct = (formData) => Request().patch( `ecommerce/products/publish`, formData);
    draftMultipleProduct = (formData) => Request().patch( `ecommerce/products/draft`, formData);
    deleteMultipleProduct = (formData) => Request().delete( `ecommerce/products/remove`, formData);
    trashMultipleProduct = (formData) => Request().patch( `ecommerce/products/trash`, formData);
    restoreMultipleProduct = (formData) => Request().patch( `ecommerce/products/restore`, formData);


    updateProduct = (id, formData) => Request().post( `ecommerce/products/${id}`, formData);
    publishProduct = (id) => Request().patch( `ecommerce/products/${id}/publish`);
    toggleFeature = (id) => Request().patch( `ecommerce/products/${id}/feature`);
    draftProduct = (id) => Request().patch( `ecommerce/products/${id}/draft`);
    trashProduct = (id) => Request().patch( `ecommerce/products/${id}/trash`);
    restoreProduct = (id) => Request().patch( `ecommerce/products/${id}/restore`);
    delete = (id) => Request().delete( `ecommerce/products/${id}`);
    create = (formData) => Request().post( `ecommerce/products`, formData);
}

export default new ProductService();
