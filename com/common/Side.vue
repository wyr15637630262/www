<template>
	<div class="User_side">
		<div class="menus" :style="styleMenus">
		<el-menu  class="el-menu-vertical-demo" theme="dark" unique-opened router >

			<!--会员管理-->
			<el-submenu  index="1">
				<template slot="title" ><span class="el-menu-img"><span></span><img src="../../img/会员@2x.png" alt="">会员管理</span></template>
				<el-menu-item index="memberCard">会员卡</el-menu-item>
				<el-menu-item index="memberDetail">标签管理</el-menu-item>
				<el-menu-item index="memberList">会员列表</el-menu-item>
			</el-submenu>

			<!--  订单端  -->
			<el-submenu index="2" >
				<template slot="title"><span class="el-menu-img"><span></span><img src="../../img/订单@2x.png" alt="">订单管理</span></template>
				<el-menu-item index="orderList">订单列表</el-menu-item>
				<el-menu-item index="orderDetail">订单详情</el-menu-item>
			</el-submenu>

			<!--  商品管理  -->
			<el-submenu index="3">
				<template slot="title" ><span class="el-menu-img"><span></span><img src="../../img/商品@2x.png" alt="">商品管理</span></template>
				<el-menu-item index="commodityTag">商品标签</el-menu-item>
				<el-menu-item index="commodityVariety">商品品种</el-menu-item>
				<el-menu-item index="commoditySpec">商品规格</el-menu-item>
				<el-menu-item index="commodityType">商品类别</el-menu-item>
				<el-menu-item index="commodityBank">商品库</el-menu-item>
			</el-submenu>

			<!--  营销管理  -->
			<el-submenu index="4" >
				<template slot="title"><span class="el-menu-img"><span></span><img src="../../img/营销@2x.png" alt="">营销管理</span></template>
				<el-menu-item index="couponList">优惠券列表</el-menu-item>
				<el-menu-item index="couponAdd">优惠券新增</el-menu-item>
				<el-menu-item index="couponRevise">优惠券修改</el-menu-item>
				<el-menu-item index="couponDetail">优惠券详情</el-menu-item>
			</el-submenu>

			<!--  系统管理  -->
			<el-submenu index="5" >
				<template slot="title"><span class="el-menu-img"><span></span><img src="../../img/系统@2x.png" alt="">系统管理</span></template>
				<el-menu-item index="dealSet">交易设置</el-menu-item>
			</el-submenu>
		</el-menu>
		</div>
	</div>
</template>

<script>
//    import MyAjax from "./../../md/MyAjax.js";
	export default {
        data: function () {
            return {
                styleMenus: {}
            }
        },
        mounted () {
            this.height = $(document).height() - 84 + 'px'
            this.styleMenus = {'height': this.height}
            $('div.el-submenu__title i').removeClass('el-submenu__icon-arrow el-icon-arrow-down').addClass('el-icon-caret-right')
        },
		methods:{
//
		}
	}
</script>

<style>
	.menus{
		width:200px;
		background: #2e313b;
		color:white;
		padding-top: 9px;
	}
	.menus .el-menu{
		background: #2e313b;
		color:#fff;
		font-size: 14px;
		font-weight: bold;
	}
	.menus .el-submenu .el-menu-item{
		width: 200px;
		border-left:3px solid transparent ;
		background: #000;
		box-sizing: border-box;
		font-size: 12px;
		height:36px;
		line-height: 36px;
	}
	.menus .el-submenu__title{
		padding:0 25px 0 14px !important;
		height:48px;
	}
	.menus .el-menu-img{
		height:48px;
		position: absolute;
		top:-5px;
		color:white;
		font-size: 14px;
	}
	.menus .el-menu-img img{
		width:14px;
		margin:0 8px 0 5px;
	}
	.menus .el-menu-img span {
		width:5px;
		height:46px;
		display: inline-block;
		background: transparent;
		position: relative;
		left:-14px;
	}
	.menus .is-opened  .el-menu-img span{
		background: #ec6a47;
		transition: background .3s;
	}
	.menus li.el-menu-item:hover{
		background: #ec6a47;

	}
	.menus .is-active li.is-active{
		background: #ec6a47;
		color:#fff;
	}
	.menus .el-submenu__title i{
		position: absolute;
		top: 50%;
		right: 7px;
		color:white;
		margin-top: -7px;
		transition: transform .3s;
		font-size: 12px;
	}
	.menus .is-opened .el-submenu__title i{
		transform:rotate(90deg)
	}

</style>