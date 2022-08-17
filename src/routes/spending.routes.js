const express = require('express');
const routes = express.Router();
const { v4: uuidv4 } = require('uuid');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

routes.use(express.json());

const supabase = createClient(process.env.URL, process.env.KEY);

routes.post('/spending', async (request, response) => {

    const {price, date} = request.body

    if(!date){
        date: new Date()
    }

    const data  = await supabase
    .from('spending')
    .insert({
        price: price,
        date: date
    })

    return response.status(201).json(data);
});

routes.get('/reports', async (request, response) => {

    const { data: spending, error } = await supabase.from('spending').select('*')

    return response.status(200).json(spending)

});



module.exports = routes;