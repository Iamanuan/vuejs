//配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// import Home from '../components/Home'
// import About from '../components/About';
// import User from '../components/User'

const Home = () => import('../components/Home')
const HomeNews = () => import('../components/Home-News')
const HomeMessage = () => import('../components/Home-Message')
const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')

//1、通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

//2、创建VueRouter对象
const routes = [
  {
    path:'/',
    //重定向
    redirect: '/home'
  },
  {
    path:'/home',
    meta:{
      title: '首页'
    },
    component:Home,
    children:[
      // {
      //   path:'',
      //   redirect: 'news'
      // }
      // ,
      {
        path:'news',
        component:HomeNews
      },
      {
        path:'message',
        component: HomeMessage
      }
    ]
  },
  {
    path: '/about',
    meta:{
      title:'关于'
    },
    component: About
  },
  {
    path: '/user/:userId',
    mete:{
      title:'用户'
    },
    component: User,
    beforeEnter(to,from,next){
      // console.log('User beforeEach')
      next()
    }
  },
  {
    path:'/profile',
    meta:{
      title:'档案'
    },
    component: Profile
  }
]

const router = new VueRouter({
  //配置路由和组件之间的应用关系
  routes,
  mode:'history',
  linkActiveClass:'active'
})

router.beforeEach((to,from,next)=>{
  document.title = to.matched[0].meta.title
  // console.log(to);
  // console.log('++++++');
  next()
})

router.afterEach((to,from)=>{
  // console.log('------');
})

// console.log(router);

//3、将router对象传入到Vue实例
export default router
