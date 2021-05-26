'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { server } = require('../../src/server.js');
const request = supergoose(server);

let id;

describe('Test Clothes', () => {


  it('Test GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  
  
  it(' Creating new clothes using POST /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'dress',
      color: 'black',
      size: '38',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('dress');
    id = response.body._id;
  });
  
  it('Return all clothes data using GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('Return specific clothes data using GET /clothes/id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('dress');
  });

  it(' updating data using PUT /clothes/id', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      name: 'dress',
      color: 'red',
      size: '38',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('dress');
    expect(response.body.color).toEqual('red');
  });

  it(' Deleting clothes using delete /clothes/id', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
  });

});
  
  
  
describe('Test Food', () => {
  
  
  it('Test GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  
  
  it('Creating new clothes using POST /food', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'apple',
      calories: 75,
      type: 'FRUIT',

    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('apple');
    id = response.body._id;
  });
  
  it('Return all clothes data using GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('Return specific clothes data using GET /food/id', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('apple');
  });

  it('Test updating data using PUT /food/id', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      name: 'Banana',
      calories: 175,
      type: 'FRUIT',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Banana');
    expect(response.body.calories).toEqual(175);
  });
  it('Deleting clothes using delete /food/id', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
});