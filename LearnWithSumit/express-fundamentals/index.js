const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is home page');
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('This is home page with post request'); 
})

app.listen(7000, () => {
    console.log('Listing on port 7000')
})

