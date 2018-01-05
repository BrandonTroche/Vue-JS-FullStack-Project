const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')

var contents = fs.readFileSync("db.json");
var jsonContent = JSON.parse(contents);
//console.log(jsonContent.labs[0].lab)

const app = express()
const plotly = require('plotly')('btroche', '3HB9eLk90oduXc1GJnIb')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/labs', (req, res) => {
    var values = []
    var dates = []
    var values2 = []
    var dates2 = []
    
    for (var i = 0; i < jsonContent.labs.length; i++){
        
        if(jsonContent.labs[i].patient_id == req.body.patient_id){
            values.push(jsonContent.labs[i].value)
            dates.push(jsonContent.labs[i].date.slice(0,4))
        }

    }
    
    var data = [{x:dates, y:values, type: 'bar'}];
    
    var layout = {
        fileopt : "overwrite", 
        filename : "valueOverTime",
        layout: {
            xaxis: {tickfont: {
                size: 14,
                color: "rgb(107, 107, 107)"
            }},
            yaxis: {
                title: "Lab Values",
                titlefont: {
                    size: 16,
                    color: "rgb(107, 107, 107)"
                },
                tickfont: {
                    size: 14,
                    color: "rgb(107, 107, 107)"
                }
            }
        }
    };
    
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
    
    console.log(queryResult.length)
    
    var diagnosisFreqKeys = []
    var diagnosisFreqValues = []
    
    function checkArray(icdValue){
        for(var j = 0; j < diagnosisFreqKeys.length; j++){
            if(diagnosisFreqKeys[j] == icdValue){
                diagnosisFreqValues[j] += 1
                return true
            }
        }
        return false
    }
    
    for (var i = 0; i < queryResult.length; i++){
        if(diagnosisFreqKeys.length == 0){
            diagnosisFreqKeys.push(queryResult[i].ICD)
            diagnosisFreqValues.push(1)
        } else {
             if(!checkArray(queryResult[i].ICD)) {
                    diagnosisFreqKeys[i] = queryResult[i].ICD
                    diagnosisFreqValues[i] = 1
                }
            }
        } 
    
    var sortedKeys = ['','','','','','','','','','']
    var sortedArray = [0,0,0,0,0,0,0,0,0,0]
    
    for(var i = 0; i < 10; i++){
        console.log(i)
        for(var j = 0; j < diagnosisFreqValues.length; j++){
            console.log(j)
            console.log(diagnosisFreqValues[j])
            console.log(sortedArray[i])

            if(diagnosisFreqValues[j] > sortedArray[i]){
                sortedArray[i] = diagnosisFreqValues[j]
                sortedKeys[i] = diagnosisFreqKeys[j]
                diagnosisFreqKeys.splice(j,1)
                diagnosisFreqValues.splice(j,1)
            }
        }
    }
    
    console.log(sortedKeys)
    console.log(sortedArray)
//    var data2 = [{x:dates, y:values, type: 'bar'}];
//    
//    var layout2 = {
//        fileopt : "overwrite", 
//        filename : "diagnosisOverTime",
//        layout: {
//            xaxis: {tickfont: {
//                size: 14,
//                color: "rgb(107, 107, 107)"
//            }},
//            yaxis: {
//                title: "Diagnosis",
//                titlefont: {
//                    size: 16,
//                    color: "rgb(107, 107, 107)"
//                },
//                tickfont: {
//                    size: 14,
//                    color: "rgb(107, 107, 107)"
//                }
//            }
//        }
//    };

    plotly.plot(data, layout, function (err, msg) {
        if (err) return console.log(err);
        console.log(msg);
    });  
    
//    plotly.plot(data2, layout2, function (err, msg) {
//        if (err) return console.log(err);
//        console.log(msg);
//    });  
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


app.listen(process.env.PORT || 3001)