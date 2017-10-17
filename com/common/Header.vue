<template>
	<div class="header">
		<div class="headerLeft">
			<div>
				<img src="../../img/menuLogo.png" align="absmiddle">
				<span>硅云电商</span>
			</div>
		</div>
		<div class="headerRight" :style="styleh">
			<span>
			  <img src="../../img/menuhHead.png" alt="">
			</span>
			<span class="font">
			  {{userName}}
			</span>
			<span class="font" @click="houtui">
			  [退出]
			</span>
			<div>
				电商后台管理平台
			</div>
		</div>
	</div>
</template>

<script>
    import $ from 'jquery'
    export default {
        data: function () {
            return {
                styleh: {},
                userName: JSON.parse(sessionStorage.getItem('userName'))
            }
        },
        mounted () {
            this.width = $(window).width() - 200 + 'px'
            this.styleh = {'width': this.width, 'height': '75px', 'display': 'inline-block'}
        },
        methods: {
            houtui: function () {
                sessionStorage.removeItem('userName')
                this.$router.push('/Login')
            }
        }
    }
</script>

<style>
	.header{
		height:75px;
	}
	.header .headerLeft{
		background: #ec6a47;
		height: 75px;
		width:200px;
		display: inline-block;
	}
	.header .headerLeft div{
		position: relative;
		left:25px;
		line-height: 73px;
	}
	.header .headerLeft img{
		width:28px;
	}
	.header .headerLeft span{
		font-size: 24px;
		color:#ffffff;
		font-weight: bold;
		position: relative;
		left:14px;
	}
	.header .headerRight {
		position: absolute;
		box-sizing: border-box;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
	}
	.header .headerRight span {
		float: right;
		color:#323435;
		font-size: 24px;
		margin-left:15px;
	}
	.header .headerRight .font{
		line-height: 75px;
		cursor: pointer;
	}
	.header .headerRight .font:hover{
		color:#ec6a47;
	}
	.header .headerRight span img{
		width:41px;
		margin:17px 46px 0 11px;
	}
	.header .headerRight div{
		width:500px;
		font-size: 24px;
		line-height: 75px;
		margin-left:20px;
		font-weight: bold;
	}
</style>
