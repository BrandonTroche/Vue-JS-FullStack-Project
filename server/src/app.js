const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')

var contents = fs.readFileSync("db.json");
var jsonContent = JSON.parse(contents);
console.log(jsonContent.labs[0].lab)

const app = express()
const plotly = require('plotly')('btroche', '3HB9eLk90oduXc1GJnIb')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/labs', (req, res) => {
    res.send({
        message:`labs workded`
    })
})

app.post('/diagnosis', (req, res) => {
    
    var icd_code = []
    var date = []
    var description = []
    
    var queryResult = []
    
    for (var i = 0; i < jsonContent.diagnosis.length; i++){
        if (jsonContent.diagnosis[i].patient_id == req.body.patient_id){
            
            icd_code.push(jsonContent.diagnosis[i].icd_code_id)
            date.push(jsonContent.diagnosis[i].date)
            
        }
    }
    
    for (var i = 0; i < icd_code.length; i++){
        for (var j = 0; j < jsonContent.icd_codes.length; j++){
            if (icd_code[i] == jsonContent.icd_codes[j].id){
                description.push(jsonContent.icd_codes[j].description)
                                    
            }
        }
    }
    
    for (var i = 0; i < icd_code.length; i++){
        var myObject = {
            DATE: date[i],
            ICD: icd_code[i],
            DESCRIPTION: description[i]
        }
        queryResult.push(myObject)
    }
    
    
    res.send(queryResult)
    
    
    
//    res.send({
//        id: 0,
//        patient_id: `NotFound`,
//        icd_code_id: 0,
//        date: `NotFound`
//    })
})

app.post('/patients', (req, res) => {
    res.send(
        jsonContent.patients
    )
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

app.listen(process.env.PORT || 3001)