var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs").promises; // for file deletion
const model = require("../models/index");
const Products = model.products;
const ProductImages = model.productImages;

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const ProductController = require("../Controllers/ProductsController");
router.get("/api/get-productNews", ProductController.getProductNews);
router.post(
  "/api/createProducts",
  upload.single("file"),
  ProductController.createProducts
);
router.get("/api/get-product-detail/:id", ProductController.getProductDetail);
router.get("/api/get-size-color/:id", ProductController.getSizeByColor);
router.post(
  "/api/add-image/:id",
  upload.single("file"),
  ProductController.addImage
);
router.post("/api/add-color-size/:id", ProductController.addColorAndSize);
router.get("/api/list-item-product/:id", ProductController.sizeDetailProduct);
router.put(
  "/api/update-product/:id",
  upload.single("file"),
  ProductController.editProduct
);
module.exports = router;
