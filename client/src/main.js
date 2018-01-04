// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import HelloWorld from './components/HelloWorld'
import Test from './components/Test'

Vue.use(vueResource)
Vue.use(vueRouter)

Vue.config.productionTip = false

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path:'/', component: HelloWorld},
        {path:'/test', component: Test}
    ]
})

/* eslint-disable no-new */
new Vue({
    router,
    template: `
    <div id="app">
        <router-view></router-view>
    </div>
    `
}).$mount('#app');
