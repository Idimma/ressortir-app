import Request from "../utils/Request";

class CategoryService{
    getAllCategories = (page = 1) => Request().get(`ecommerce/categories?type=public&page=${page}`);
    createCategory = (formData) => Request().post(`ecommerce/categories`, formData);
    deleteCategory = (id) => Request().delete(`ecommerce/categories/${id}`);
    fetchCategory = (id) => Request().get(`ecommerce/categories/${id}`);
    fetchCategoryBySlug = (slug) => Request().get(`ecommerce/categories/slug/${slug}`);
    updateCategory = (id, formData) => Request().patch(`ecommerce/categories/${id}`, formData);

}

export default new CategoryService();