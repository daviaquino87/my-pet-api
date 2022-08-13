const { application } = require('express');
const express = require('express');
const routes = express.Router();

routes.use(express.json());

const spendings = []

routes.post('/spending',(request,response) => {
    const {date,amount} = request.body;


    const purchase = {
        date:date,
        amount: amount
    }

    spendings.push(purchase);

    return response.status(201).json({spendings:spendings});
});
module.exports = routes;