<template>
  <div class="hello">
      <ul>
      
          <li><button @click="postL">labs</button></li>
          <li><button @click="postI">icd</button></li>
          <li><button @click="postD">diagnosis</button></li>
          <li><button @click="postP">patients</button></li>
      
      </ul>
  </div>
</template>

<script>
import postDiagnosis from '@/services/post-diagnosis'
import postIcd from '@/services/post-icd'
import postLabs from '@/services/post-labs'
import postPatients from '@/services/post-patients'

    
export default {
    name: 'HelloWorld',
    data () {
        return {
      
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
            console.log(response.data)
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
</style>
