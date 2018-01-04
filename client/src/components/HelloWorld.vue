<template>
  <div class="hello">
      <ul>
      
        <li><button @click="postL">Hello</button></li>
      
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
