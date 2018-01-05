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
        
            <ul>
            
                <li v-for="pa in patient">
                
                    <span @click="postD(pa.id)">ID : {{pa.id}} Sex : {{pa.sex}}  Risk Score: {{pa.risk_score}} Age: {{pa.age}}</span>
                </li>
            
            </ul>
            
        </div>
        
        <div class="yellow">
            
            a
        
        </div>
        <div class="red">
            
<!--            {{diagnosis}}-->
        
            <ul>
            
                <li v-for="dat in diagnosis.DATE" style="float:left">DATE: {{dat}}</li>
                <li v-for="icd in diagnosis.ICD" style="float:left">ICD: {{icd}}</li>
                <li v-for="des in diagnosis.DESCRIPTION" style="float:left">DESCRIPTION: {{des}}</li>
                
            </ul>
            
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
            diagnosis: {
                
            }
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
