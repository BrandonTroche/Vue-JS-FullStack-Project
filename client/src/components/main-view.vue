<template>
    <div>
        <div class="blue">
        <table border="1">
        
            <tr>
            
                <th style="background-color:#a6b1c1;">Patient Id</th>
                <th style="background-color:#a6b1c1;">Risk Score</th>
                <th style="background-color:#a6b1c1;">Age</th>
                <th style="background-color:#a6b1c1;">Sex</th>
            </tr>
            <tr v-for="pa in patient">
                
                    <th @click="postD(pa.id); postL(pa.id)">{{pa.id}}</th>
                
                    <th @click="postD(pa.id); postL(pa.id)">{{pa.risk_score}}</th>
                
                    <th @click="postD(pa.id); postL(pa.id)">{{pa.sex}}</th>
                
                    <th @click="postD(pa.id); postL(pa.id)">{{pa.age}}</th>
            
            </tr>
            
        </table>
        </div>
        <div class="yellow">
            
            <iframe id="plot1" src="https://plot.ly/~btroche/3.embed" frameborder="0" style="width:100%;height:75%;"></iframe>
        
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
        postL (patient) {
            const response = postLabs.queryDB({
                patient_id: patient
            })
            
            document.getElementById('plot1').src += ''
        },
        async postD (patient) {
            const response = await postDiagnosis.queryDB({
                patient_id: patient
            })
            
            this.diagnosis = response.data
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
/*        background-color: yellow;*/
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
