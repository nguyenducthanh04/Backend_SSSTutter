const model = require("../models/index");
const Products = model.products;
const ProductImages = model.productImages;
const Colors = model.colors;
const Sizes = model.sizes;
const multer = require("multer");
const fs = require("fs").promises;
class ProductController {
  async productNews(req, res) {
    try {
      const productNews = await Products.findAll({
        where: {
          statusId: 1,
        },
      });
      res.json(productNews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async createProducts(req, res) {
    try {
      const { name, price, typeId, statusId, description, color, size } =
        req.body;
      const { filename, path } = req.file;
      const product = await Products.create({
        name,
        price,
        typeId,
        statusId,
        description,
      });
      const images = await ProductImages.create({
        fileName: filename,
        filePath: path,
        main: 1,
        productId: product.id,
      });
      const colors = await Colors.create({
        color,
      });
      const sizes = await Sizes.create({
        size,
      });
      await product.addColor(colors);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = new ProductController();
