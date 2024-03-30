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
        include: [
          {
            model: ProductImages,
            where: {
              main: 1,
            },
          },
        ],
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
          where: {
            main: 1,
          },
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
  async addImage(req, res) {
    try {
      const { id } = req.params;
      const { filename, path } = req.file;
      const image = await ProductImages.create({
        fileName: filename,
        filePath: path,
        main: 2,
        productId: id,
      });
      res.json(image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async addColorAndSize(req, res) {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    const { color, size } = req.body;
    const colorIn = await Colors.create({
      color,
    });
    const sizeIn = await Sizes.create({
      size,
    });
    await product.addColor(colorIn);
    await product.addSize(sizeIn);
    await ColorSizes.create({
      colorId: colorIn.id,
      sizeId: sizeIn.id,
    });
    res.json({ message: "Add sucsess !" });
  }
  async sizeDetailProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Colors,
          },
          {
            model: Sizes,
          },
        ],
      });
      console.log("okk:", product.colors);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async editProduct(req, res) {
    // try {
    const productId = req.params.id;
    const { name, price, typeId, statusId, description, color, size } =
      req.body;
    const { filename, path } = req.file;
    const productNew = await Products.update(
      {
        name,
        price,
        typeId,
        statusId,
        description,
      },
      {
        where: {
          id: productId,
        },
      }
    );
    const product = await Products.findOne({
      where: {
        id: productId,
      },
    });
    const imageNew = await ProductImages.update(
      {
        fileName: filename,
        filePath: path,
        main: 1,
        productId: productId,
      },
      {
        where: {
          productId: productId,
        },
      }
    );
    if (color) {
      let dataColor = [];
      if (typeof color === "string") {
        dataColor.push({
          color: color,
        });
      } else {
        dataColor = color.map((item) => ({ color: item }));
      }
      dataColor.forEach(async (item) => {
        const colorIntance = await Colors.findOne({
          where: item,
        });
        if (!colorIntance) {
          await product.createColor(item);
        }
      });
      const colorUpdate = await Promise.all(
        dataColor.map((item) => Colors.findOne({ where: item }))
      );
      await product.setColors(colorUpdate);
    }
    if (size) {
      let dataSize = [];
      if (typeof size === "string") {
        dataSize.push({
          size: size,
        });
      } else {
        dataSize = size.map((item) => ({ size: item }));
      }
      dataSize.forEach(async (item) => {
        const sizeIntance = await Sizes.findOne({
          where: item,
        });
        if (!sizeIntance) {
          await product.createSize(item);
        }
      });
      const sizeUpdate = await Promise.all(
        dataSize.map((item) => Sizes.findOne({ where: item }))
      );
      console.log("ojjj:", sizeUpdate);
      await product.setSizes(sizeUpdate);
      // if (colorUpdate && colorUpdate.length > 0) {
      //   // Nếu có colorUpdate và không rỗng
      //   // Lặp qua từng phần tử trong colorUpdate để lấy id và cập nhật ColorSizes
      //   colorUpdate.forEach(async (colorItem) => {
      //     if (sizeUpdate && sizeUpdate.length > 0) {
      //       // Nếu có sizeUpdate và không rỗng
      //       // Lặp qua từng phần tử trong sizeUpdate để lấy id và cập nhật ColorSizes
      //       sizeUpdate.forEach(async (sizeItem) => {
      //         await ColorSizes.update({
      //           colorId: colorItem.id,
      //           sizeId: sizeItem.id,
      //         });
      //       });
      //     }
      //   });
      // }
    }
    res.json({ message: "ok" });
    // } catch (error) {
    //   res.status(500).json({ message: "Internal Server Error" });
    // }
  }
}
module.exports = new ProductController();
