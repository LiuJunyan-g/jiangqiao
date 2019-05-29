import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import land_resource from '@/components/land_resource'
import zhanghuxinxi from '@/components/zhanghuxinxi'
import homepage from '@/components/homepage'
import login from '@/components/login.vue'
import add_land from '@/components/add_land'
import plant_resource from '@/components/plant_resource'
import building_resource from '@/components/building_resource'
import store_resource from '@/components/store_resource'
import untreated_info from '@/components/untreated_info'


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		}, 
		{
			path: '/store_resource',
			name: 'store_resource',
			component: store_resource
		},
		{
			path: '/building_resource',
			name: 'building_resource',
			component: building_resource
		},
		{
			path: '/plant_resource',
			name: 'plant_resource',
			component: plant_resource
		},
		{
			path: '/land_resource',
			name: 'land_resource',
			component: land_resource
		}, 
		{
			path: '/zhanghuxinxi',
			name: 'zhanghuxinxi',
			component: zhanghuxinxi
		},
		{
			path: '/homepage',
			name: 'homepage',
			component: homepage
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/add_land',
			name: 'add_land',
			component: add_land
		},
		{
			path: '/untreated_info',
			name: 'untreated_info',
			component: untreated_info
		}
	]
})
