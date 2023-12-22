import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getAllProductsWithOwnerInfo, getSortedProducts, updateProduct } from './product.controller.js';
const productRouter = express.Router();




productRouter.get('/product',getAllProducts);
productRouter.get('/getProductsOwners',getAllProductsWithOwnerInfo);
productRouter.get("/getSortedProducts", getSortedProducts)
productRouter.post('/product',addProduct);
productRouter.put('/product/:id',updateProduct);
productRouter.delete('/product/:id',deleteProduct);



export default productRouter