import App from './App'
import {
	URL
} from '@/service/index.js'

// #ifndef VUE3
import Vue from 'vue'

//给所有的组件和页面对象(都继承自Vue.prototype)添加公共成员
Vue.prototype.$URL = URL


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
