import Vue from 'vue'
import Router from 'vue-router'
import AutoCompleteInput from '@/components/AutoCompleteInput'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AutoCompleteInput',
      component: AutoCompleteInput
    }
  ]
})
