const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

describe('Order Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .send({
        customer: "687b9bf1fbf0692aee89daf7",
        items: ["687b9bf1fbf0692aee89dafc", "687b9bf1fbf0692aee89dafd"],
        status: "preparing"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id');
  });
});
