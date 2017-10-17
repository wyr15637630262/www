import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Vuex from "vuex";
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(ElementUI);
import "./scss/main.scss";



import App from "./com/common/App.vue";

//定义的路由规则
import routes from "./routes/routes.js";



var router = new VueRouter({
	routes
})


new Vue({
	el:"#app",
	router:router,
	store,
	data:{
		
	},
	methods:{
		
	},
	components:{
		"v-app":App
	},
	computed:{
		
	},
	watch:{
		
	},
	mounted(){
		
	}
})
