<template>
	<div>
		<div id="content">
		<s-Header></s-Header>
		<div class="content_center">
		<m-side></m-side>
		<div class="User_content">
			<router-view ></router-view>
		</div>
		</div>
		</div>
	</div>

</template>

<script>
	import "./../scss/user.scss"
    import sHeader from "./common/Header.vue"
    import mSide from "./common/Side.vue"
	export default {
		data(){
			return {
				
			}
		},
		mounted(){

		},
		components:{
            sHeader,
            mSide
		}
	}
</script>

<style>
</style>