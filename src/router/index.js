import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pubapp/Login.vue'
import Join1 from '../oa/join_step1.vue'
import Business from '../oa/business.vue'
import Product from '../oa/Product.vue'
import AddProduct from '../oa/addProduct.vue'
import ModifyProduct from '../oa/modifyProduct.vue'
import ModifyBusiness from '../oa/ModifyBusiness.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Join1',
      name: 'Join1',
      component: Join1
    },
    {
      path: '/Business',
      name: 'Business',
      component: Business
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/AddProduct',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/ModifyProduct',
      name: 'ModifyProduct',
      component: ModifyProduct
    },
    {
      path: '/ModifyBusiness',
      name: 'ModifyBusiness',
      component: ModifyBusiness
    }
  ]
})
