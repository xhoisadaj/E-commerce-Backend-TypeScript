import { AppDataSource } from "../config/ormconfig";
import { Product } from "../models/Product";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  public async getAllProducts() {
    return this.productRepository.find();
  }

  public async getProductById(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  public async createProduct(productData: Partial<Product>) {
    const newProduct = this.productRepository.create(productData);
    return this.productRepository.save(newProduct);
  }

  public async updateProduct(id: number, productData: Partial<Product>) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) {
      this.productRepository.merge(product, productData);
      return this.productRepository.save(product);
    }
    return null;
  }

  public async deleteProduct(id: number) {
    const result = await this.productRepository.delete(id);
    return result.affected ? true : false;
  }
}
