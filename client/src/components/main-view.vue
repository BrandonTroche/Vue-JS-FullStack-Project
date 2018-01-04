<template>
    <div>
        <ul>
      
            <li><button @click="postL">labs</button></li>
            <li><button @click="postI">icd</button></li>
            <li><button @click="postD">diagnosis</button></li>
            <li><button @click="postP">patients</button></li>
            <li v-for="pa in patient">{{pa.id}} {{pa.sex}} {{pa.risk_score}} {{pa.age}}</li>
      
        </ul>
        <div class="blue">
        
            a
            
            <br>
            
            a
            
        </div>
        
        <div class="yellow">
            
            a
        
        </div>
        <div class="red">
            
            a
        
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
        async postD () {
            const response = await postDiagnosis.queryDB({
                test: 'test'
            })
            console.log(response.data)
        },
        async postP () {
            const response = await postPatients.queryDB({
                test: 'test'
            })
            this.patient.push(response.data)
            //console.log(response.data)
        },
        async postI () {
            const response = await postIcd.queryDB({
                test: 'test'
            })
            console.log(response.data)
        }
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
