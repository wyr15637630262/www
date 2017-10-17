<template>
	<div>
		<m-Breadcrumb mTitle1="商品管理" mTitle2="商品标签"></m-Breadcrumb>
		<div class="goods_content" :style="stylemList" style="background: #fff;margin-left: 20px;padding: 20px;position: relative">
			<div class="goodsC_top">
				<div class="c_left">
					<label>名称</label>
					<input type="text" ref="labelName">
					<input type="button" value="查询" @click="goSearch()">
				</div>
				<div class="c_right" style="position: relative">
					<a @click="addGoodsTag()" style="cursor: pointer">+新增</a>
					<a style="cursor: pointer" @click="rubish()">回收站</a>
					<img src="./../../img/select.png" style="position: absolute;right: 0px;top: 19px;" v-show="imgShow">
				</div>
			</div>
			<div class="goodsC_center">
				<template>
					<el-table :data="goodsTagList" stripe style="width: 100%;">
						<el-table-column label="编号">
							<template scope="scope">
								{{scope.row.id}}
								<img src="./../../img/rubbisher.png" alt="" v-show="imgShow" style="position: absolute;left: 0px;top: 0px">
							</template>
						</el-table-column>
						<el-table-column label="名称">
							<template scope="scope">
								<span style="color:#ec6a47;cursor: pointer">{{scope.row.labelName}}</span>
							</template>
						</el-table-column>
						<el-table-column label="排序">
							<template scope="scope">
								<span>{{scope.row.sortPriority}}</span>
							</template>
						</el-table-column>
						<el-table-column label="商品数" prop="productNumber">

						</el-table-column>
						<el-table-column label="创建时间">
							<template scope="scope">
								<span>{{scope.row.createTime}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template scope="scope">
								<span style="color:#ec6a47; cursor: pointer;" @click="goBianji(scope.row.labelName,scope.row.sortPriority,scope.row.id)">{{msg1}}</span>
								<span class="y-line">|</span>
								<span style="cursor: pointer;" @click="goDelete(scope.row.id)">{{msg2}}</span>
							</template>

						</el-table-column>
					</el-table>

				</template>
			</div>
			<div class="goodsC_bottom">
				<div class="pages" @click="pageChange">
					<el-pagination
							:page-size="pageSize"
							layout="prev, pager, next, jumper"
							:total="totalRecord"
							@click="pageChange">
					</el-pagination>
				</div>
				<div class="confirm">
					<input type="button" value="确认">
				</div>
			</div>
		</div>
		<!--修改部分-->
		<div class="mask" v-if="bianji">
			<div class="mask_content">
				<div class="maskC_top">
					<a>商品标签</a>
					<a>-</a>
					<a style="color:#ec6a47">编辑标签</a>
				</div>
				<div class="maskC_center">
					<div class="tagName">
						<label >标签名称</label>
						<input type="text" v-model="name" ref="reviseTagName">
					</div>
					<div class="sort">
						<label >排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>
						<input type="text" v-model="sorts" ref="reviseTagSort">
					</div>
				</div>
				<div class="maskC_bottom">
					<input type="button" value="取消" @click="gocancle()">
					<input type="button" value="保存" @click="goconfirm()">
				</div>
			</div>
		</div>
		<!--增加部分-->
		<div class="addMask" v-if="adds">
			<div class="addMask_content">
				<div class="addMaskC_top">
					<a>商品标签</a>
					<a>-</a>
					<a style="color:#ec6a47">新增标签</a>
				</div>
				<div class="addMaskC_center">
					<div class="tagName">
						<label >标签名称</label>
						<input type="text" ref="addTagName">
					</div>
					<div class="sort">
						<label >排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>
						<input type="text" ref="addTagSort">
					</div>
				</div>
				<div class="addMaskC_bottom">
					<input type="button" value="取消" @click="addCancle()">
					<input type="button" value="保存" @click="addConfirm()">
				</div>
			</div>
		</div>
		<!--提示框-->
		<div id="toast">
			<div class="toast_left">!</div>
			<div class="toast_right"></div>
		</div>
	</div>
</template>

<script>
    import mBreadcrumb from '../public/headerTag.vue';
    import rq from "./../../md/require.js";
    import Prop from "./../../js/prop.js";
	export default {
		data(){
			return {
                stylemList: {},
				goodsTagList:[],
				goodsTag:{
                    isRecycled:1,
                    page:1,
                    size:10
				},
                loading:true,
                pageSize:0,
                totalRecord:0,
				searchAll:{
                    labelName:"手机",
					page:1,
					size:10
				},
				bianji:false,
                reviseTagAll:{
					id:1,
                    labelName:"手机",
                    sortPriority:1
				},
                adds:false,
				addLabelAll:{
                    labelName:"妖怪",
                    sortPriority:1
                },
				name:"手机",
				sorts:"1",
				removeAll:{
                    labelId:1
				},
				msg1:"编辑",
				msg2:"删除",
                imgShow:false
			}
		},
		mounted(){
            var that = this
            that.mListWidth = $(window).width() - 284 + 'px'
            that.mListHeight = $(window).height() - 195 + 'px'
            that.stylemList = {'width': that.mListWidth, 'height': that.mListHeight};
            $('.pages button.btn-prev').html('上一页')
            $('.pages button.btn-next').html('下一页')

            rq.searchAllTag(that.goodsTag).then(function (data) {
                if (data.result === '成功') {
                    console.log(data)
                    that.goodsTagList = data.data.data
					that.totalRecord=data.data.totalRecord;
                    that.pageSize=data.data.pageSize;
					that.loading=false
                } else {
                    console.log(err)
                    that.goodsTagList = []
                }
            })
		},
		components:{
            mBreadcrumb
		},
		methods:{
//		    页码改变
            pageChange:function () {

            },
//			查询
            goSearch:function () {
                var that=this;
                that.searchAll.labelName=that.$refs.labelName.value
                rq.searchByLabeiName(that.searchAll).then(function (data) {
                    if (data.result === '成功') {
                        console.log(data)
                        that.goodsTagList = data.data.data
                        that.totalRecord=data.data.totalRecord;
                        that.pageSize=data.data.pageSize;
                        that.loading=false
                    } else {
                        console.log(err)
                        that.goodsTagList = []
                    }
                })
            },
//			列表编辑和恢复
            goBianji:function (labelName,sortPriority,id) {
				var that=this;
//                that.reviseTagAll.id=id;
//                that.bianji=!that.bianji;
//                that.name=labelName;
//                that.sort=sortPriority;
				if(that.imgShow === false){
                    that.reviseTagAll.id=id;
                    that.bianji=!that.bianji;
                    that.name=labelName;
                    that.sort=sortPriority;
				}else{
//                    rq.backTag(id).then(function (data) {
//                        rq.searchAllTag(that.checkAll).then(function (data) {
//                            if (data.code === 10001) {
//                                that.goodsTagList = data.data.data
//                                that.totalRecord=data.data.totalRecord;
//                                that.pageSize=data.data.pageSize;
//                            } else {
//                                that.goodsTagList = []
//                            }
//                        })
//                    })
				}
            },
//			标签编辑的确定
            goconfirm:function () {
                var that=this;
                that.reviseTagAll.labelName=that.$refs.reviseTagName.value
                that.reviseTagAll.sortPriority=that.$refs.reviseTagSort.value
                if(that.$refs.reviseTagName.value==""||that.$refs.reviseTagSort.value==""){
                    Prop.makeText("信息不完善",2000);
				}else{
                    rq.reviseTag(that.reviseTagAll).then(function (data) {
                        if (data.result === '成功') {
                            console.log("1")
                            rq.searchAllTag(that.goodsTag).then(function (data) {
                                if (data.result === '成功') {
//                                    console.log(data)
                                    that.bianji=false;
                                    that.goodsTagList = data.data.data
                                    that.totalRecord=data.data.totalRecord;
                                    that.pageSize=data.data.pageSize;
                                } else {
                                    console.log(err)
                                    that.goodsTagList = []
                                }
                            })

                        } else {
                            console.log(err)
//                        that.goodsTagList = []
                        }
                    })
				}

            },
//			标签编辑取消
            gocancle:function () {
                var that=this;
                that.bianji=false;
            },
//			新增标签
            addGoodsTag:function () {
				var that=this;
				that.adds=true;
            },
//			新增的取消
            addCancle:function () {
                var that=this;
                that.adds=false;
            },
//			新增的确定
            addConfirm:function () {
                var that=this;
                that.addLabelAll.labelName=that.$refs.addTagName.value
                that.addLabelAll.sortPriority=that.$refs.addTagSort.value
                if(that.$refs.addTagName.value==""||that.$refs.addTagSort.value==""){
                    Prop.makeText("信息不完善",2000);
				}else{
                    rq.addTag(that.addLabelAll).then(function (data) {
                        if (data.result === '成功') {
                            console.log("1")
                            rq.searchAllTag(that.goodsTag).then(function (data) {
                                if (data.result === '成功') {
//                                    console.log(data)
                                    that.adds=false;
                                    that.goodsTagList = data.data.data
                                    that.totalRecord=data.data.totalRecord;
                                    that.pageSize=data.data.pageSize;
                                } else {
                                    console.log(err)
                                    that.goodsTagList = []
                                }
                            })
                        } else {
                            console.log(err)
//                        that.goodsTagList = []
                        }
                    })
				}
            },
//			删除
            goDelete:function (id) {
				var that=this;
//				that.removeAll.labelId=id;
//                rq.removeTag(that.removeAll).then(function (data) {
//                    if (data.result === '成功') {
//                        rq.searchAllTag(that.goodsTag).then(function (data) {
//                            if (data.result === '成功') {
//                                that.goodsTagList = data.data.data
//                                that.totalRecord=data.data.totalRecord;
//                                that.pageSize=data.data.pageSize;
//                            } else {
//                                console.log(err)
//                                that.goodsTagList = []
//                            }
//                        })
//                    } else {
//                        console.log(err)
//                        that.goodsTagList = []
//                    }
//                })
				if(that.imgShow === false){
                    that.removeAll.labelId=id;
                    rq.removeTag(that.removeAll).then(function (data) {
                        if (data.result === '成功') {
                            rq.searchAllTag(that.goodsTag).then(function (data) {
                                if (data.result === '成功') {
                                    that.goodsTagList = data.data.data
                                    that.totalRecord=data.data.totalRecord;
                                    that.pageSize=data.data.pageSize;
                                } else {
                                    console.log(err)
                                    that.goodsTagList = []
                                }
                            })
                        } else {
                            console.log(err)
                            that.goodsTagList = []
                        }
                    })
				}else{
//				    彻底删除

				}
            },
//			回收站
            rubish:function () {
				var that=this;
                that.imgShow = !that.imgShow;
                if (that.imgShow === true){
                    var that=this;
                    that.msg1="恢复"
                    that.msg2="彻底删除"
					that.goodsTag.isRecycled=0;
                    rq.searchAllTag(that.goodsTag).then(function (data) {
                        if (data.result === '成功') {
                            console.log(data)
                            that.goodsTagList = data.data.data
                            that.totalRecord=data.data.totalRecord;
                            that.pageSize=data.data.pageSize;
                        } else {
                            console.log(err)
                            that.goodsTagList = []
                        }
                    })
				}else{
                    that.msg1="编辑"
                    that.msg2="删除"
                    that.goodsTag.isRecycled=1;
                    rq.searchAllTag(that.goodsTag).then(function (data) {
                        if (data.result === '成功') {
                            console.log(data)
                            that.goodsTagList = data.data.data
                            that.totalRecord=data.data.totalRecord;
                            that.pageSize=data.data.pageSize;
                        } else {
                            console.log(err)
                            that.goodsTagList = []
                        }
                    })
				}
            }
		}
	}
</script>

<style>
	.goodsC_top{
		width: 95%;
		margin: 0 auto;
		height: 50px;
	}
	.c_left{
		float: left;
	}
	.c_left input:nth-of-type(1){
		height: 25px;
		border: 0;
		border: 1px solid #ccc;
		border-radius: 4px;
		outline: none;
	}
	.c_left input:nth-of-type(2){
		border: 0;
		outline: none;
		width: 65px;
		background: #ec6a47;
		color: #fff;
		font-size: 14px;
		height: 28px;
		border-radius: 4px;
		margin-left: 4px;
	}
	.c_right{
		float: right;
	}
	.c_right a{
		background: #ec6a47;
		color: #fff;
		padding: 4px 8px;
		font-size: 14px;
		display: inline-block;
		border-radius: 3px;
	}
	.c_right a:nth-of-type(1){
		display: inline-block;
		margin-right: 10px;
	}
	.goodsC_center{
		border: 1px solid #eee;
		width: 95%;
		margin: 0 auto;
		text-align: center;
	}
	.goodsC_center .cell{
		text-align: center;
	}
	.goodsC_bottom{
		width: 95%;
		height: 60px;
		position: absolute;
		right: 50px;
		bottom: 2%;
	}
	.pages{
		float: left;
		width: 90%;
		text-align: right;
	}
	.pages .el-pager li{
		border-color: #ec6a47;
		background: #fff;
		color: #888;
	}
	.confirm{
		float: right;
		width: 10%;
	}
	.confirm input{
		display: inline-block;
		width: 35%;
		height: 30px;
		background: #ec6a47;
		color: #ffffff;
		font-size: 14px;
		border: 0;
		outline: none;
		margin-right: 10px;
		border-radius: 2px;
	}
	.mask,.addMask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 999;
	}
	.mask_content,.addMask_content{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 400px;
		height: 300px;
		background: #fff;
		border-radius: 5px;
	}
	.maskC_top,.addMaskC_top{
		width: 360px;
		height: 10px;
		border-bottom: 1px solid #eee;
		padding: 20px;
	}
	.maskC_top a:nth-of-type(2){
		color: #ec6a47;
	}
	.addMaskC_top a:nth-of-type(2){
		color: #ec6a47;
	}


	.maskC_center,.addMaskC_center{
		width: 100%;
		height: 150px;
		margin-top: 50px;
	}
	.maskC_center .tagName,.addMaskC_center .tagName{
		  width: 300px;
		  margin: 0 auto;
		  margin-top: 20px;
	}
	.maskC_center .tagName input,.addMaskC_center .tagName input{
		display: inline-block;
		width: 180px;
		padding-left: 6px;
		height: 30px;
		border-radius: 5px;
		margin-left: 5px;
		border:1px solid #cccccc;
		outline: none;
	}
	.maskC_center .sort,.addMaskC_center .sort{
		width: 300px;
		margin: 0 auto;
		margin-top: 40px;
	}
	.maskC_center .sort input,.addMaskC_center .sort input{
		display: inline-block;
		width: 180px;
		padding-left: 6px;
		height: 30px;
		border-radius: 5px;
		margin-left: 7px;
		border:1px solid #cccccc;
		outline: none;
	}
	.maskC_bottom,.addMaskC_bottom{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #fef5f2;
		border-radius: 5px;
	}
	.maskC_bottom input,.addMaskC_bottom input{
		border: 0;
		outline: none;
		display: inline-block;
		width: 60px;
		height: 30px;
		border-radius: 5px;
	}
	.maskC_bottom input:nth-of-type(1){
		background: #e1e1e1;
		color: #7d7b7d;
		font-size: 14px;
		margin-left: 140px;
	}
	.addMaskC_bottom input:nth-of-type(1){
		background: #e1e1e1;
		color: #7d7b7d;
		font-size: 14px;
		margin-left: 140px;
	}
	.maskC_bottom input:nth-of-type(2){
		background: #ec6a47;
		color: #fff;
		font-size: 14px;
		margin-left: 12px;
	}
	.addMaskC_bottom input:nth-of-type(2){
		background: #ec6a47;
		color: #fff;
		font-size: 14px;
		margin-left: 12px;
	}
	#toast{
		position: absolute;
		width: 300px;
		height: 60px;
		left: 42%;
		top: 1%;
		font-size: 20px;
		display: none;
		z-index: 999;
		border: 1px solid #eee;
	}
	.toast_left{
		background: #ec6a47;
		width: 50px;
		height: 60px;
		float: left;
		color: #fff;
		text-align: center;
		line-height: 60px;
		font-size: 20px;
	}
	.toast_right{
		background: #fff;
		width: 238px;
		height: 60px;
		float: left;
		line-height: 60px;
		padding-left: 12px;
	}

</style>