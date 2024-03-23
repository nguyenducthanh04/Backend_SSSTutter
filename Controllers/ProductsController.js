const model = require("../models/index");
const Products = model.products;
const ProductImages = model.productImages;
const Colors = model.colors;
const Sizes = model.sizes;
const ColorSizes = model.colorSizes;
const multer = require("multer");
const fs = require("fs").promises;
class ProductController {
  async getProductNews(req, res) {
    try {
      const productNews = await Products.findAll({
        where: {
          statusId: 1,
        },
        include: {
          model: ProductImages,
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
      await product.addSize(sizes);
      const colorSize = await ColorSizes.create({
        colorId: colors.id,
        sizeId: sizes.id,
      });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getProductDetail(req, res) {
    const { id } = req.params;
    const productDetail = await Products.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductImages,
        },
        {
          model: Colors,
        },
      ],
    });

    console.log("detail:", productDetail.colors);
    res.json(productDetail);
  }
  async getSizeByColor(req, res) {
    const { id } = req.params;
    const color = await Colors.findOne({
      where: {
        id,
      },
      include: {
        model: Sizes,
      },
    });
    res.json(color);
  }
}
module.exports = new ProductController();
