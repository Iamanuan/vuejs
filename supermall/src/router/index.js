import Vue from 'vue'
import VueRouter from 'vue-router'

//1、安装插件
Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Shopcar = () => import('views/shopcar/Shopcar')
const Detail = () => import('views/detail/Detail')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopcar',
    component: Shopcar
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

//2、创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
