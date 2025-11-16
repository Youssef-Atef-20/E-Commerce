import { Router } from "express";
import { AddProduct, EditProduct, DeleteProduct, CustomerCheckout, GetAllProducts, getOrders } from "../controllers/productManagementController";
import { AuthenticationMiddleware } from "../middleware/AuthenticationMiddleware";
import { validateBody } from "../middleware/ValidateBody";
import { AddProductBody, Cart, DeleteProductBody, EditProductBody } from "../dtos/Products.dto";
import { upload } from "../middleware/Upload";

const ProductManagementRouter = Router()

ProductManagementRouter.post(
    "/add",
    AuthenticationMiddleware(true),
    upload.single("img"),
    validateBody(AddProductBody),
    AddProduct
);

ProductManagementRouter.put(
    "/edit",
    AuthenticationMiddleware(true),
    upload.single("img"),
    validateBody(EditProductBody),
    EditProduct
);

ProductManagementRouter.delete("/delete", AuthenticationMiddleware(true), validateBody(DeleteProductBody), DeleteProduct)

ProductManagementRouter.post("/checkout", AuthenticationMiddleware(false), validateBody(Cart), CustomerCheckout)
ProductManagementRouter.get("/all", GetAllProducts)

ProductManagementRouter.get("/orders", AuthenticationMiddleware(false), getOrders)

export default ProductManagementRouter