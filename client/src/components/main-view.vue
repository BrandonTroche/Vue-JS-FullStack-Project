<template>
    <div>
<!--
        <ul>
      
            <li><button @click="postL">labs</button></li>
            <li><button @click="postI">icd</button></li>
            <li><button @click="postD">diagnosis</button></li>
-->
<!--            <li><button @click="postP">patients</button></li>-->
            
      
<!--        </ul>-->
        <div class="blue">
        <table border="1">
        
            <tr>
            
                <th style="background-color:#a6b1c1;">Patient Id</th>
                <th style="background-color:#a6b1c1;">Risk Score</th>
                <th style="background-color:#a6b1c1;">Age</th>
                <th style="background-color:#a6b1c1;">Sex</th>
            </tr>
            <tr v-for="pa in patient">
<!--                <li >-->
                
                    <th @click="postD(pa.id)">{{pa.id}}</th>
                
                    <th @click="postD(pa.id)">{{pa.risk_score}}</th>
                
                    <th @click="postD(pa.id)">{{pa.sex}}</th>
                
                    <th @click="postD(pa.id)">{{pa.age}}</th>
<!--                </li>-->
            
            </tr>
            
        </table>
        </div>
        <div class="yellow">
            
            a
        
        </div>
        <div class="red">
        <table border="1">
            
                <tr>
            
                <th style="background-color:#a6b1c1;">Date</th>
                <th style="background-color:#a6b1c1;">ICD Code</th>
                <th style="background-color:#a6b1c1;">Description</th>
                    
                </tr>
            <tr v-for="dia in diagnosis">
                
                    <th>{{dia.DATE}}</th>
                
                    <th>{{dia.ICD}}</th>
                
                    <th>{{dia.DESCRIPTION}}</th>
            
            </tr>
<!--
                
                <li v-for="dat in diagnosis.DATE" style="float:left">DATE: {{dat}}</li>
                <li v-for="icd in diagnosis.ICD" style="float:left">ICD: {{icd}}</li>
                <li v-for="des in diagnosis.DESCRIPTION" style="float:left">DESCRIPTION: {{des}}</li>
                            
-->
        </table>
        </div>
    </div>
</template>

<script>
import postDiagnosis from '@/services/post-diagnosis'
import postIcd from '@/services/post-icd'
import postLabs from '@/services/post-labs'
import postPatients from '@/services/post-patients'

    
export default {
    name: 'main-view',
    data () {
        return {
            patient: [
            ],
            diagnosis: [
                
            ]
        }
    },
    methods: {
        async postL () {
            const response = await postLabs.queryDB({
                test: 'test'
            })
            console.log(response.data)
        },
        async postD (patient) {
            const response = await postDiagnosis.queryDB({
                patient_id: patient
            })
            
            this.diagnosis = response.data
//            console.log(response.data)
//            console.log(patient)
//            console.log(this.dataset.i)
        },
        async postP () {
            const response = await postPatients.queryDB({
                test: 'test'
            })
//            this.patient.push(response.data)
            this.patient = response.data
//            console.log(response.data)
        },
        async postI () {
            const response = await postIcd.queryDB({
                test: 'test'
            })
            console.log(response.data)
        }
    },
    created: async function(){
        const response = await postPatients.queryDB({
                test: 'test'
        })
        this.patient = response.data
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .blue{
/*        background-color: aqua;*/
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100% !important;
        width: 25% !important;
        float:left;
    }
    
    .yellow{
        background-color: yellow;
        height: 375px !important;
        width: 75% !important;
        float:left;
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    
    .red{
/*        background-color: red;*/
        height: 150px !important;
        width: 75% !important;
        float:left;
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
