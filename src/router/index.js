import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'LoginPage',
			component: LoginPage
		},
		{
			path: '/home',
			name: 'HomePage',
			component: HomePage
		}
	]
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = localStorage.getItem('authenticated') === 'true'
	if (to.name !== 'LoginPage' && !isAuthenticated) next({ name: 'LoginPage' })
	else next()
})

export default router
