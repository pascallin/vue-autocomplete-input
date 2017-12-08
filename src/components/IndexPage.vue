<template>
  <div>
    <auto-complete-input 
      v-model="inputData" 
      :presetList="presetList"
      :placeholder="'enter things...'"
    ></auto-complete-input>
  </div>
</template>

<script>
  import AutoCompleteInput from './AutoCompleteInput'
  export default {
    name: 'IndexPage',
    components: { AutoCompleteInput },
    data () {
      return {
        inputData: '',
        presetList: ['pascal', 'php', 'nodejs', 'vuejs', 'reactjs']
      }
    },
    watch: {
      inputData () {
        console.log('input value: ', this.inputData)
      }
    }
  }
</script>