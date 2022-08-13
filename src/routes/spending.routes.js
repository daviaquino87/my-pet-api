const { application } = require('express');
const express = require('express');
const routes = express.Router();
const { v4: uuidv4 } = require('uuid');

routes.use(express.json());

const spendings = []

routes.post('/spending',(request,response) => {
    const {date,amount} = request.body;

    const purchase = {
        id: uuidv4(),
        date:date,
        amount: amount
    }

    spendings.push(purchase);

    return response.status(201).send();
});

routes.get('/spending',(request,response) => {
    return response.status(201).json({spendings:spendings});
});


module.exports = routes;