<template>
	<div>
		<div class="Breadcrumb" :style="styleBreadcrumb">
			<el-breadcrumb separator="-">
				<el-breadcrumb-item>{{mTitle1}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{mTitle2}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{mTitle3}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</div>
</template>

<script>

	export default {
        props: ['mTitle1', 'mTitle2', 'mTitle3'],
        data: function () {
            return {
                styleBreadcrumb: {}
            }
        },
        mounted () {
            this.bcWidth = $(window).width() - 244 + 'px'
            this.styleBreadcrumb = {'width': this.bcWidth, 'height': '48px'}
        },
		components:{

		}
	}
</script>

<style>
	.Breadcrumb{
		background: white;
		margin:14px 22px 8px 22px;
	}
	.Breadcrumb .el-breadcrumb {
		font-size: 16px;
		font-weight: bold;
		padding-left:27px;
	}
	.Breadcrumb .el-breadcrumb__item{
		line-height: 48px;
	}
	.Breadcrumb .el-breadcrumb__item .el-breadcrumb__item__inner{
		color:#7d7d7d;
	}
	.Breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__item__inner,.Breadcrumb .el-breadcrumb__item .el-breadcrumb__item__inner:hover{
		color:#ec6a47;
	}
</style>