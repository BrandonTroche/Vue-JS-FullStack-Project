const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const plotly = require('plotly')('btroche', '3HB9eLk90oduXc1GJnIb')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/labs', (req, res) => {
    res.send({
        message:`labs worked`
    })
})

app.post('/diagnosis', (req, res) => {
    res.send({
        message:`diagnosis worked`
    })
})

app.post('/patients', (req, res) => {
    res.send({
        message:`patients worked`
    })
})

app.post('/icd_codes', (req, res) => {
    res.send({
        message:`icd_codes worked`
    })
})


app.get('/', (req, res) => {
    res.send({
        message:'hello world!'
    })
})

//var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
//var layout = {fileopt : "overwrite", filename : "simple-node-example"};
//
//plotly.plot(data, layout, function (err, msg) {
//	if (err) return console.log(err);
//	console.log(msg);
//});

app.listen(process.env.PORT || 8001)