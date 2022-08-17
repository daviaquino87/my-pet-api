const express = require('express');
const { get } = require('./routes/spending.routes');
const app = express();
const routes = require('./routes/spending.routes');

app.use(routes)

app.listen(3333, ()=>{
    console.log('app on');
});