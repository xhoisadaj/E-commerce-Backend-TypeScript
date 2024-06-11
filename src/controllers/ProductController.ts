import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    const products = await this.productService.getAllProducts();
    return res.json(products);
  };

  public getProductById = async (req: Request, res: Response): Promise<Response> => {
    const product = await this.productService.getProductById(Number(req.params.id));
    if (product) {
      return res.json(product);
    }
    return res.status(404).json({ message: "Product not found" });
  };

  public createProduct = async (req: Request, res: Response): Promise<Response> => {
    const newProduct = await this.productService.createProduct(req.body);
    return res.status(201).json(newProduct);
  };

  public updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const updatedProduct = await this.productService.updateProduct(Number(req.params.id), req.body);
    if (updatedProduct) {
      return res.json(updatedProduct);
    }
    return res.status(404).json({ message: "Product not found" });
  };

  public deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const isDeleted = await this.productService.deleteProduct(Number(req.params.id));
    if (isDeleted) {
      return res.status(200).json({ message: "Product successfully deleted" });
    }
    return res.status(404).json({ message: "Product not found" });
  };
  
}
