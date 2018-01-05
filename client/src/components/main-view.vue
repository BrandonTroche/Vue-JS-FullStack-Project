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
        <table class="blue">
        
            <tr>
            
                <th>Patient Id</th>
                <th>Risk Score</th>
                <th>Age</th>
                <th>Sex</th>
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
        
        <div class="yellow">
            
            a
        
        </div>
        <table class="red">
            
                <tr>
            
                <th>Date</th>
                <th>ICD Code</th>
                <th>Description</th>
                    
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
        background-color: aqua;
        height: 100% !important;
        width: 25% !important;
        float:left;
    }
    
    .yellow{
        background-color: yellow;
        height: 60% !important;
        width: 75% !important;
        float:left;
    }
    
    .red{
        background-color: red;
        height: 40% !important;
        width: 75% !important;
        float:left;
    }
</style>
