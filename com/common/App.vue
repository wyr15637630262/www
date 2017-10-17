<template>
	<div class="container">

			<!--<router-view name="header"></router-view>-->
			<!--<div class="content_center">-->
				<!--<router-view name="side"></router-view>-->
				<router-view>

				</router-view>
			<!--</div>-->
		</div>
	</div>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
//    import Header from "./Header.vue"
//    import Side from "./Side.vue"
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		components:{
//            "v-header":Header,
//            "v-side":Side
		}
		
	}
</script>

