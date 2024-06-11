import request from 'supertest';
import { app } from '../utils/app'; // Adjust the import according to your project structure
import { AppDataSource } from '../config/ormconfig';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Product A',
        description: 'Description for Product A',
        price: 100.0,
        inventory: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Add more tests for other routes...
});
