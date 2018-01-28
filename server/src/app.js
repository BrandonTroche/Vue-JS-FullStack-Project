const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')

var contents = fs.readFileSync("db.json");
var jsonContent = JSON.parse(contents);
const jsonQuery = require('json-query')
//console.log(jsonQuery('diagnosis[*patient_id=A000].date', {
//    data:jsonContent
//}))
//console.log(jsonContent.labs[0].lab)

const app = express()
const plotly = INSERT_PLOTLY_DETAILS
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/labs', (req, res) => {
    var values = []
    var dates = []
    
    //Populate the Values and Dates for the first plot
    
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
    
    plotly.plot(data, layout, function (err, msg) {
        if (err) return console.log(err);
        console.log(msg);
    });  
    
    //Copy the query from Diagnosis to take all the patients data
    
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
    
    //Push each occurrance of trip reasons and increment them based on how many times they occur
    
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
    
    //Sort those trips for the 10 most frequent
    
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < diagnosisFreqValues.length; j++){

            if(diagnosisFreqValues[j] > sortedArray[i]){
                sortedArray[i] = diagnosisFreqValues[j]
                sortedKeys[i] = diagnosisFreqKeys[j]
                diagnosisFreqKeys.splice(j,1)
                diagnosisFreqValues.splice(j,1)
            }
        }
    }
    
    var dates2 = []
    
    //Use JSON Query to grab all the dates of the second plot visits
    
    for (var i = 0; i < sortedKeys.length; i++){
        
        var q = (jsonQuery(['diagnosis[**][* patient_id=? & icd_code_id=?].date', req.body.patient_id, sortedKeys[i]], {data:jsonContent}).value)
        
        for(var j = 0; j < q.length; j++){
            q[j] = q[j].slice(0,4)
        }
        
        dates2 = dates2.concat(q)
        
    }
    
    
    
    var values2 = []
    

    //Set the icd values for the second plot's visits
    
    for (var i = 0; i < sortedKeys.length; i++){
        for(var j = 0; j < sortedArray[i]; j++){
            values2.push(sortedKeys[i])
        }
    }
    

    //Set the dates for all visits for each value in the scatter plot
    
    for (var i = 0; i < values2.length; i++){
        for (var j = 0; j < jsonContent.diagnosis.length; j++){
            if(jsonContent.diagnosis[j].icd_code_id == values2[i] && jsonContent.diagnosis[j].patient_id == req.body.patient_id){
                dates2.push(jsonContent.diagnosis[i].date.slice(0,4))
            }
        }
    }
    
//    console.log(values2)
    
    
    
//    var data2 = [{x:values2, y:dates2, type: 'bar'}];
    
    var trace1 = {
        x: values2,
        y: dates2,
        name: "2012-2016",
        type: "scatter"
    };
    var data = [trace1];
    var graphOptions = {filename: "basic-line", fileopt: "overwrite"};
    
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
    
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