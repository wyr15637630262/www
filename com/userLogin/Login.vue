<template>
	<div class="login">
		<header>
			<img src="./../../img/logo.png" alt="">
			<img src="./../../img/line.png" alt="">
		</header>
		<div class="Login_content" ref="Login_content" :style="topNum">
			<img src="./../../img/picture.png" alt="">
		</div>
		<div class="login_msg">
			<h2>硅云电商管理后台</h2>
			<div class="msg_user">
				<img src="./../../img/user.png" alt="">
				<input type="text" ref="userName" placeholder="请输入账号">
			</div>
			<div class="msg_lock">
				<img src="./../../img/lock.png" alt="">
				<input type="password" ref="psd" placeholder="请输入密码">
			</div>
			<input type="button" class="btn" value="登录" @click="login()">
			
		</div>
		<div id="toast">
			<div class="toast_left"></div>
			<div class="toast_right"></div>
		</div>
	</div>
</template>

<script>
	import "./../../scss/login.scss"
    import Prop from "./../../js/prop.js";
    import $ from 'jquery'
    import VueRouter from "vue-router"
    import Vue from "vue"
    Vue.use(VueRouter);
    var router=new VueRouter({

    })

    export default {
		data(){
			return {
				height:0,
				topNum:{}
			}
		},
		mounted(){
			this.height = $(window).height() - 380+ 'px';
            this.topNum = {'height': this.height}
		},
		methods:{
//		    登陆及验证
		    login(){
		        var that = this;
		        var userName = that.$refs.userName.value;
                var psd = that.$refs.psd.value;
				if(userName=="" ||psd==""){
                    Prop.makeText("信息不完善",2000);
				}else{
//                    router.push({path:'user', query:{ url: id }})
                    router.push({path:'user'})
					sessionStorage.setItem("userName",JSON.stringify(userName))
				}
			}
		}
	}
</script>