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
/* GET home page. */
router.get("/productNews", ProductController.productNews);
// router.post("/api/createProducts", upload.single("file"), async (req, res) => {
//   try {
//     const { name, price, typeId, statusId, description } = req.body;
//     const { filename, path } = req.file;
//     console.log("thanhdev:", req.file);
//     const product = await Products.create({
//       name,
//       price,
//       typeId,
//       statusId,
//       description,
//     });
//     const images = await ProductImages.create({
//       fileName: filename,
//       filePath: path,
//       main: 1,
//       productId: product.id,
//     });

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
router.post(
  "/api/createProducts",
  upload.single("file"),
  ProductController.createProducts
);
// router.post("/createProducts", upload.single("file"), async (req, res) => {
//   try {
//     const { name, price, typeId, statusId, description } = req.body;
//     // const { filename, path } = req.file;
//     console.log("thanhdev:", req.file);
//     const product = await Products.create({
//       name,
//       price,
//       typeId,
//       statusId,
//       description,
//     });
//     // const productImage = await ProductImages.create({
//     //   fileName: filename,
//     //   filePath: path,
//     //   main: 1,
//     //   productId: product.id,
//     // });
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
module.exports = router;
