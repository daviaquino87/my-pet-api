const { application } = require('express');
const express = require('express');
const routes = express.Router();
const { v4: uuidv4 } = require('uuid');

routes.use(express.json());

const spendings = []

function getBalance(statement){
    const balance = statement.reduce((acc,operation) => {
            return acc + operation.amount;
    },0)

    return balance;
}



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

routes.get('/reports',(request,response) => {
    return response.status(201).json({spendings:spendings});
});

routes.get('/balance',(request,response) => {

    const balance = getBalance(spendings);
    return response.json({balance:balance})
});


module.exports = routes;