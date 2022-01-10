const express = require('express');
const app = express();

//app.use(express.raw());
//app.use(express.json());
//app.use(express.urlencoded());
// app.use(express.static(`${__dirname}/public/`,{
//     index:'home.html'
// }))

const router = express.Router({caseSensitive:true});

app.use(router);

// app.get('/', (req, res) => {
//     res.send('This is home page');
// })

// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('This is home page with post request'); 
// })


router.get('/', (req, res) => {
    res.send('This is home page');
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.send('This is home page with post request'); 
})

app.listen(7000, () => {
    console.log('Listing on port 7000')
})

