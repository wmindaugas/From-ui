import HTTP from "./index";

const getProducts = () => HTTP.get('/products');
const saveProduct = (product) => HTTP.post('/products', product);
const getProductById = (productId) => HTTP.get(`/products/${productId}`);
const updateProduct = (product, productId) => HTTP.put(`/products/${productId}`, product);
const deleteProduct = (productId) => HTTP.delete(`/products/${productId}`);

export {
    getProducts,
    saveProduct,
    getProductById,
    updateProduct,
    deleteProduct
}