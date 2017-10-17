<template>
	<div class="memberList">
		<m-Breadcrumb mTitle1="会员管理" mTitle2="会员列表"></m-Breadcrumb>
		<div class="memberList-content" :style="stylemList">
			<!--上边的信息-->
			<div class="top">
				<div class="top-left">
					<span class="mc">手机号码</span>
					<div class="tel">
						<input type="text" placeholder="请输入手机号码">
					</div>
					<span class="mc">注册时间</span>
					<div class="bianhao">
						<el-date-picker
								v-model="startTime"
								type="datetime"
								placeholder="开始时间">
						</el-date-picker>
					</div>
					<span class="mc">-</span>
					<div class="bianhao">
						<el-date-picker
								v-model="finishTime"
								type="datetime"
								placeholder="结束时间">
						</el-date-picker>
					</div>
					<button @click="checkWord">查询</button>
				</div>
			</div>
			<div class="bottom">
				<!--展示的表格信息-->
				<template>
					<el-table :data="memberList" stripe style="width: 100%" v-loading.body="loading">
						<el-table-column label="编号">
							<template scope="scope">
								{{scope.row.id}}
								<img src="../../img/finish.png" alt="" @click="changeImg(scope.$index, scope.row)" v-if="scope.row.memberStatus === 0">
								<img src="../../img/start.png" alt="" @click="changeImg(scope.$index, scope.row)"  v-if="scope.row.memberStatus === 1">
							</template>
						</el-table-column>
						<el-table-column label="会员昵称">
							<template scope="scope">
								<span style="color:#ec6a47;cursor: pointer" @click="canshu(scope.$index, scope.row)">{{scope.row.memberNickName}}</span>
							</template>
						</el-table-column>

						<el-table-column label="联系方式" prop="memberTel">

						</el-table-column>
						<el-table-column label="会员等级" prop="memberGrade">

						</el-table-column>
						<el-table-column label="会员积分" prop="memberIntegral">

						</el-table-column>
						<el-table-column label="购买次数" prop="varietyName">

						</el-table-column>
						<el-table-column label="注册时间">
							<template scope="scope">
								{{scope.row.registeredTime }}
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template scope="scope">
								<span style="color:#ec6a47; cursor: pointer;">加标签</span>
								<span class="y-line">|</span>
								<span @click="songJF(scope.row.$index, scope.row)" style="cursor: pointer;">送积分</span>
							</template>

						</el-table-column>
					</el-table>

				</template>
				<!--分页效果-->
				<div class="pages" @click="pageChange">
					<el-pagination
							:page-size="checkAll.size"
							layout="prev, pager, next, jumper"
							:total="sizeNum"
							@click="pageChange">
					</el-pagination>
					<button>确认</button>
				</div>
				<!--送积分模块-->
				<div class="jf" v-if="jfDiv">
					<div class="jf-all">
						<div class="top" style="border-bottom:1px solid #7c7d7d">
							<span style="color:#7c7d7d">会员管理</span><span style="margin: 0 15px;">-</span><span style="color:#ec6a47">积分</span>
						</div>
						<div class="jf-middle">
							<div>
								<span>积分数</span>
								<el-input placeholder="请输入赠送的积分数（可以是负数）" v-model="addScore.recordContent"></el-input>

							</div>
							<div>
								<span>描&nbsp;&nbsp;&nbsp;述</span>
								<el-input placeholder="请输入赠送描述....." v-model="addScore.recordDescribe" type="textarea" :rows="2"></el-input>
							</div>
						</div>
						<div class="bottom">
							<button style="background:#7c7d7d" @click="quxiao">取消</button>
							<button style="background:#ec6a47" @click="queding">确定</button>
						</div>
					</div>
				</div>

				<!--详细信息-->
				<div class="fixed-canshu" v-if="canshuDiv" :style="stylemList">
					<button>禁&nbsp;用</button>
					<template>
						<el-tabs v-model="activeName">
							<el-tab-pane label="基本信息" name="first">
								<div class="firstAll">
									<div class="firstAll-top" style="padding-top: 20px;border: 1px solid #eee">
										<!--<img :src="canshuList.memberAvatar" alt="">-->
										<img src="./../../img/headerLogo.png" alt="">
										<div class="firstAll-top-one">
											<h3>会员昵称：{{canshuList.memberNickName}}</h3>
											<div>
												<span>手机号码：{{canshuList.memberTel}}</span>
												<span>登陆账号：{{canshuList.loginAccount}}</span>
											</div>
											<div>
												<span>性&nbsp;&nbsp;别：{{canshuList.memberTel}}</span>
												<span>邀&nbsp;请 &nbsp;人：{{canshuList.memberTel}}</span>
											</div>
											<div>
												<span>生&nbsp;&nbsp;日：{{canshuList.memberTel}}</span>
												<span>注册时间：{{canshuList.modifyTime}}</span>
											</div>
											<div>
												<span>积&nbsp;&nbsp;分：{{canshuList.memberIntegral}}</span>
											</div>
										</div>
									</div>
									<div class="firstAll-middle" style="border: 1px solid #eee;margin:16px 0;padding:10px 20px">
										<h4>标签信息</h4>
										<div style="padding: 14px 0">
											<span v-if="hasTag">暂无标签</span>
											<span v-if="!hasTag">
												<a style="border: 1px solid orangered;padding: 3px 7px;display: inline-block;margin-right: 5px;" v-for="item in tagList">{{item.labelName}}</a>
											</span>
											<span style="color:#ec6a47">加标签</span>
										</div>
									</div>
									<div class="firstAll-bottom" style="border: 1px solid #eee;margin:16px 0;padding:10px 20px">
										<div style="padding-top: 15px">
											<span style="float: right;color:#ec6a47">订单列表</span>
											<span>交易统计</span>
										</div>
										<ul style="margin-top: 15px">
											<li>
												<h4>无下单</h4>
												<span>最近下单</span>
											</li>
											<li>
												<h4>0.001元</h4>
												<span>最近订单金额</span>
											</li>
											<li>
												<h4>0.08元</h4>
												<span>累计消费金额</span>
											</li>
											<li>
												<h4>6笔</h4>
												<span>累计消费订单数</span>
											</li>
											<li>
												<h4>0.2元</h4>
												<span>累计退款金额</span>
											</li>
											<li>
												<h4>1笔</h4>
												<span>累计退款单数</span>
											</li>
										</ul>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="卡券信息" name="second">
								<div class="packet_top" style="width: 100%">
									<el-table :data="packetList" stripe style="width: 96%;margin: 0 auto" v-loading.body="loading">
										<el-table-column label="序号">
											<template scope="scope">
												00{{scope.row.couponId}}
											</template>
										</el-table-column>
										<el-table-column label="优惠券名称">
											<template scope="scope">
												<span style="color:#ec6a47;cursor: pointer">{{scope.row.couponName}}</span>
											</template>
										</el-table-column>
										<el-table-column label="价值(元)" prop="couponFaceValue">

										</el-table-column>
										<el-table-column label="获取时间" prop="obtainTime">

										</el-table-column>
										<el-table-column label="有效期" prop="expireTime">

										</el-table-column>
										<el-table-column label="使用时间" prop="startTime">

										</el-table-column>
										<el-table-column label="状态">
                                            <template scope="scope">
                                                <span v-if="scope.row.couponStatus === 2">未使用</span>
                                                <span v-if="scope.row.couponStatus === 1"></span>
                                            </template>
										</el-table-column>
									</el-table>
								</div>
								<!--卡券信息中的分页效果-->
								<div class="packet_bottom">

								</div>
							</el-tab-pane>
							<el-tab-pane label="会员权益" name="third"></el-tab-pane>
							<el-tab-pane label="积分记录" name="fourth"></el-tab-pane>
							<el-tab-pane label="收货地址" name="fifth">
								<div class="adress_top" style="width: 100%">
									<el-table :data="adressList" stripe style="width: 96%;margin: 0 auto" v-loading.body="loading">
										<el-table-column label="序号">
											<template scope="scope">
												00{{scope.row.id}}
											</template>
										</el-table-column>
										<el-table-column label="收货人">
											<template scope="scope">
												<span style="color:#ec6a47;cursor: pointer">{{scope.row.consigneeName}}</span>
											</template>
										</el-table-column>
										<el-table-column label="联系电话" prop="consigneeTel">

										</el-table-column>
										<el-table-column label="详细地址">
											<template scope="scope">
												{{scope.row.locationProvince}}{{scope.row.locationCity}}{{scope.row.locationArea}}{{scope.row.locationAreaVillage}}{{scope.row.detailAddress}}
											</template>
										</el-table-column>
										<el-table-column label="状态">
                                            <template scope="scope">
                                                <span v-if="scope.row.addressStatus === 0">默认</span>
                                                <span v-if="scope.row.addressStatus === 1">普通</span>
                                            </template>
										</el-table-column>
									</el-table>
								</div>
								<!--收货地址中的分页效果-->
								<div class="adress_bottom">
								</div>
							</el-tab-pane>
							<el-tab-pane label="历史订单" name="sixth"></el-tab-pane>
						</el-tabs>
					</template>
				</div>

			</div>


		</div>
	</div>
</template>

<script>
    import mBreadcrumb from '../public/headerTag.vue'
    import $ from 'jquery'
    import rq from "./../../md/require.js";
    export default {
        components: {
            mBreadcrumb
        },
        data: function () {
            return {
                mTitle3: '1',
                stylemList: {},
                memberList: [],
                loading:true,
                checkAll:{
                    page:1,
                    size:4,
                    res:"1505020841",
                    res2:"1506144041",
                    memberTel:""
				},
                startTime: '',
                finishTime: '',
                sizeNum:0,
                jfDiv:false,
				tagDiv:true,
                addScore: {
                    memberId: 1,
                    recordDescribe: '',
                    recordContent: 1,
                    contentGenre: 1,
                    recordGenre: 1
                },
				canshuDiv:false,
                canshuAll: {
                    id: 0
                },
                canshuList: [],
                activeName:"first",

                hasTag:false,
				tagList:[],
				tagAll:{
                    memberId:1
				},

				packetAll:{
                    memberId:1
				},
                packetList:[],

                adressList:[],
				adressAll:{
                    memberId:1
				},
                isShow:false
            }
        },
        mounted() {
            var that = this
            that.mListWidth = $(window).width() - 244 + 'px'
            that.mListHeight = $(window).height() - 175 + 'px'
            that.stylemList = {'width': that.mListWidth, 'height': that.mListHeight};
//          会员列表的请求
            rq.searchMember(that.checkAll).then(function (data) {
				if (data.result === '成功') {
				    console.log(data)
					that.memberList = data.data.data
					that.loading=false;
				} else {
					that.memberList = []
				}
			})
//			卡券列表的请求
            rq.searchPacket(that.packetAll).then(function (data) {
                if (data.result === '成功') {
                    console.log(data)
                    that.packetList = data.data
                    that.loading=false;
                } else {
                    that.packetList = []
                }
            })
//			详情页中该会员的标签列表
			rq.searchTag(that.tagAll).then(function (data) {
                if (data.result === '成功') {
                    console.log(data)
                    that.tagList = data.data
                } else {
                    console.log(err)
                    that.tagList = []
                }
            })

        },
        methods: {
//          关键字查找
			checkWord: function () {
					var that = this
					if (that.startTime === '') {
						that.checkAll.res = ''
					} else {
						that.checkAll.res = that.startTime.getTime()
					}
					if (that.finishTime === '') {
						that.checkAll.res2 = ''
					} else {
						that.checkAll.res2 = that.finishTime.getTime()
					}
					rq.searchMember(that.checkAll).then(function (data) {
						if (data.result === '成功') {
							that.memberList = data.data.data
							that.sizeNum = data.data.totalRecord
						} else {
							that.memberList = []
							that.sizeNum = 0
						}
					})
				},
//          图片之间的转换
            changeImg: function (index, row) {
                var that = this
                rq.changeMember(row.id).then(function (data) {
                    if (data.result === '成功') {
                        rq.searchMember(that.checkAll).then(function (data) {
                            console.log(data)
                            that.memberList = data.data.data
                            that.sizeNum = data.data.totalRecord
                        })
                    }
                })
            },
//          页数改变
            pageChange: function () {
                var that = this
                that.checkAll.page = $('.memberList .el-pager li.active').html()
                rq.searchMember(that.checkAll).then(function (data) {
                    if (data.result === '成功') {
                        that.memberList = data.data.data
                        that.sizeNum = data.data.totalRecord
                    } else {
                        that.memberList = []
                        that.sizeNum = 0
                    }
                })
            },
//			送积分
            songJF: function (index, row) {
                var that = this
                that.addScore.memberId = row.id
                that.jfDiv = !that.jfDiv
            },
//			送积分的取消按钮
			quxiao:function () {
                var that=this;
                that.jfDiv = !that.jfDiv
            },
//          送积分的确定按钮
            queding: function () {
                var that = this
                rq.addMemberScore(that.addScore).then(function (data) {
                    if (data.result === '成功') {
                        rq.searchMember(that.checkAll).then(function (data) {
                            that.memberList = data.data.data
                            that.sizeNum = data.data.totalRecord
                        })
                        that.jfDiv = !that.jfDiv
                    }
                })
            },
//			添加标签
//            addTag:function (index,obj) {
//				var that=this;
//				console.log(index,obj)
//				$("tbody .el-table__row").eq(index).css("position","relative")
//                var $div = $("<div class='tag'>新增节点：数据结构</div>");
//                $("tbody .el-table__row").eq(index).append($div)
//				$("tbody .el-table__row .tag").css({
//                    "position":"absolute",
//                    "bottom":"0px",
//                    "right":"20px",
//                    "font-size":"20px"
//                })
//
//    		},
//          参数
            canshu: function (index, row) {
                var that = this;
                that.canshuDiv = !that.canshuDiv;
                that.canshuAll.id = row.id;
                that.packetAll.memberId=row.id;
                that.tagAll.memberId=row.id;
                that.adressAll.memberId=row.id;
                that.parameterDiv = false;
                rq.checkMemberDetail(that.canshuAll).then(function (data) {
                    console.log(data.data)
                    if (data.result === '成功') {
                        that.canshuList = data.data
                    }
                });
                //收货地址列表的请求
                rq.searchAdress(that.adressAll).then(function (data) {
                    if (data.result === '成功') {
                        console.log(data)
                        that.adressList = data.data.data
                    } else {
                        console.log(err)
                        that.adressList = []
                    }
                })
            }
        }
    }
</script>

<style>
	.memberList .memberList-content{
		background: white;
		margin:8px 22px 0 22px;
		padding:0px 27px;
		box-sizing: border-box;
		position: relative;
	}
	.memberList .memberList-content .top{
		padding:33px 0 26px 0;
	}
	.memberList .memberList-content .top .top-left {
		font-size: 14px;
		color:#626363;
		display: inline-block;
	}
	.memberList .memberList-content .top .top-left>div.tel{
		width: 154px;
	}
	.memberList .memberList-content .top .top-left>div{
		width:193px;
		display: inline-block;
		height:30px;
		padding: 0;
		border: 1px solid #ccc;
		border-radius: 1px;
		margin: 0 14px;
		position: relative;
	}
	.memberList .memberList-content .top .top-left>div.bianhao{
		top:10px;
	}
	.memberList .memberList-content .top .top-left div input{
		padding: 0;
		border: 0;
		height:30px;
		outline:0;
	}
	.memberList .memberList-content .top .top-left>div>div{
		position: absolute;
		color:#ec6a47;
	}
	.memberList .memberList-content .top .top-left button{
		width:60px;
		height:32px;
		background: #ec6a47;
		padding: 0;
		border:0;
		color:#fff;
		font-size: 14px;
		border-radius: 2px;
		outline:none;
		cursor: pointer;
		font-weight: bold;
		position: relative;
		top:-1px;
	}
	.memberList .memberList-content  .el-table{
		text-align: center;
		border:0;
	}
	.memberList .memberList-content  .el-table th{
		text-align: center;
	}
	.memberList .memberList-content .el-table tr{
		height:66px;
		border: 0;
		font-size: 14px;
		color:#7c7d7d;
	}
	.memberList .memberList-content  .el-table thead tr{
		font-size: 16px;
		color:#636363;
	}
	.memberList .memberList-content  .el-table th{
		background: #f3efee !important;
	}
	.memberList .memberList-content  .el-table th div{
		background: #f3efee !important;
	}
	.memberList .memberList-content  .el-table tr .el-table__row--striped{
		background: #f8f8fb;
	}
	.memberList .memberList-content .el-table tbody tr span{
		font-size: 14px;
		color:#7c7d7d;
	}
	.memberList .memberList-content  .el-table tbody tr span.y-line{
		margin:0px 10px;
		position: relative;
		top:-1px;
	}
	.memberList .fixed-div{
		position: absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background: rgba(0,0,0,0.2);
		z-index:1000;
	}
	.memberList .fixed-div>div{
		width:450px;
		height:350px;
		background: white;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		border-radius: 5px;
	}
	.memberList .fixed-div div .div-top {
		width: 450px;
		height:50px;
		color:#7c7d7d;
		padding: 0 14px;
		border-bottom: 2px solid #ddd;
		box-sizing: border-box;
	}
	.memberList .fixed-div div .div-top span{
		color:#7c7d7d;
		z-index:10001;
		line-height: 50px;
		margin:0 1px;
	}
	.memberList .fixed-div div .div-top span:last-child{
		color:#ec6a47;
	}
	.memberList .fixed-div div .div-content{
		width:450px;
		height:250px;
		text-align: center;
		font-size:14px;
	}
	.memberList .fixed-div div .div-content>div{
		height:50px;
		position: relative;
		top:54px;
	}
	.memberList .fixed-div div .div-content>div>div>div{
		position: absolute;
		height: 14px;
		left:172px;
		border:0;
		color:#ec6a47;
	}
	.memberList .fixed-div div .div-content>div.selectMes>div>div:last-child{
		position: absolute;
		height: 14px;
		top:32px;
	}
	.memberList .fixed-div div .div-content>div div{
		display: inline-block;
		height:32px;
		border: 1px solid #ddd;
		border-radius: 2px;
		margin-left: 15px;
	}
	.memberList .fixed-div div .div-content>div input{
		outline:0;
		padding: 0;
		border: 0;
		line-height: 32px;
	}
	.memberList .fixed-div div .div-content>div.selectMes>div {
		width:151px;
		height:34px;
		border: 1px solid #ddd;
		box-sizing: border-box;
		margin-left: 15px;
	}
	.memberList .fixed-div div .div-content>div.selectMes>span {
		position: relative;
		top:-10px;
	}
	.memberList .fixed-div div .div-content>div.selectMes>div>div.el-select {
		width:151px;
		height:26px;
		box-sizing: border-box;
		margin-left: 15px;
		position: absolute;
		top:4px;
	}
	.memberList .fixed-div div .div-content>div.selectMes>div>div.el-select>div.el-input {
		width:150px;
		height:27px;
		box-sizing: border-box;
		border: 0;
		/*margin-left: -1px;*/
		position: relative;
		left:-16px;
	}
	.memberList .fixed-div div .div-content>div.selectMes>div>div.el-select>div.el-input i{
		color:black;
	}
	.memberList .fixed-div div .div-content>div.selectMes>div>div.el-select>div.el-input>.el-input__inner {
		width:146px;
		height:27px;
		box-sizing: border-box;
		border: 0;
		margin-left: -1px;
	}
	.el-select-dropdown__item{
		border-bottom: 1px solid #ddd;
	}
	.el-select-dropdown__item:hover, .el-select-dropdown__item:hover{
		background: #f3efee;
	}
	.memberList .fixed-div div .div-content>div span{
		outline:0;
		height:20px;
		border-radius: 2px;
	}
	.memberList .fixed-div div .div-bottom{
		width:450px;
		height:50px;
		background: #f3efee;
		text-align: center;
		line-height: 50px;
		font-weight: 100;
		font-size: 14px;
	}
	.memberList .fixed-div div .div-bottom button:first-child{
		color:black;
		background:#ddd;
	}
	.memberList button.btn-prev{
		color:#ec6a47;
		border:1px solid #ddd;
	}
	.memberList button.btn-next{
		color:#ec6a47;
		border:1px solid #ddd;
	}
	.memberList button.disabled{
		color:black;
		border:1px solid transparent;
	}
	.memberList .el-pager li{
		margin: 0 3px;
		min-width:20px !important;
		border:1px solid #ddd !important;
		padding: 0 4px !important;
		box-sizing: border-box;
	}
	.memberList .el-pager li.active{
		background: transparent;
		border: 1px solid transparent !important;
		color:black;
		box-sizing: border-box;
	}
	.memberList .el-pagination{
		display: inline-block;
		font-weight: bold;
	}
	.memberList .el-pagination button{
		font-weight: bold;
	}
	.memberList div.pages{
		position: absolute;
		bottom:20px;
		right:27px;
	}
	.memberList div.pages>button{
		width:60px;
		height: 28px;
		font-size: 14px;
		border-radius: 2px;
		background: #ec6a47;
		color:#fff;
		border:0;
		outline:0;
		padding:0;
		position: relative;
		top:2px;
		font-weight: bold;
	}
	.memberList .el-table__row img{
		width:60px;
		position: absolute;
		top:0;
		left:0;
	}
	.memberList .el-pagination__editor input{
		width:41px !important;
	}
	.memberList input::-webkit-input-placeholder{ color:#000;}
	.memberList input.change::-webkit-input-placeholder{ color:#ec6a47;}
	.memberList .fixed-canshu{
		position: absolute;
		top:0;
		left:0;
		z-index: 1000;
		background: white;
	}
	.memberList .fixed-canshu>button{
		position: absolute;
		right:27px;
		top:8px;
		z-index:300;
		width:60px;
		height:26px;
		outline: 0;
		border: 0;
		background: #7c7d7d;
		color:white;
		font-size: 16px;
		border-radius: 3px;
	}
	.memberList .fixed-canshu .el-tabs__nav-scroll{
		background: #f3efee;
		color:black;
	}
	.memberList .fixed-canshu .el-tabs__item{
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		margin-right: -1px !important;
		box-sizing: border-box;
		color: black;
		font-weight: bold;
		font-size: 12px;
	}
	.memberList .fixed-canshu .el-tabs__active-bar{
		background: #ec6a47;
	}
	.memberList .fixed-canshu .el-tabs__item.is-active{
		color:#ec6a47;
	}
	.memberList .fixed-canshu .el-tabs{
		width: 100%;
		height:100%;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll{
		height:100%;
		padding:16px 27px;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll span{
		color:#7c7d7d;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-top{
		border: 1px solid #7c7d7d;
		padding:0 20px;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-top img{
		width: 150px;
		height:150px;
		border-radius: 50%;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-top .firstAll-top-one{
		display: inline-block;
		margin-left: 60px;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-top .firstAll-top-one div{
		margin:20px 0;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-top .firstAll-top-one h3{
		color:#7c7d7d;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-top .firstAll-top-one div span{
		margin-right: 30px;
		color:#7c7d7d;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-bottom>div{
		padding:20px 0 0 0;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-bottom ul{
		list-style:none;
		display: inline-flex;
		width: 100%;
		padding: 0;
		margin-right: -40px;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-bottom ul li{
		width:16.6%;
		border-right:1px solid #eee;
		text-align: center;
		height:100px;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-bottom ul li h4{
		margin-bottom: 10px;
		margin-top: 20px;
	}
	.memberList .fixed-canshu .el-tabs__content .el-tab-pane div.firstAll div.firstAll-bottom ul li:last-child{
		border: 0;
	}
	.memberList .noLine{
		outline: 0;
		padding:0;
		margin:0;
		border: 1px;
		background: transparent;
		text-align: center;
		font-size: 14px;
		color: #7c7d7d;
		height:38px;
		border-bottom: 2px solid transparent;
		box-sizing: border-box;
	}
	.memberList .noLine:hover{
		border-color:#ddd;
		box-sizing: border-box;
	}
	.memberList input{
		padding-left:5px !important;
	}
	.memberList div.x-line{
		width:156px !important;
		height:38px !important;
		border-bottom: 2px solid transparent;
		box-sizing: border-box !important;
		line-height: 38px !important;
		margin: 0 auto;
	}
	.borderColor{
		border-bottom:2px solid #ddd !important;
	}
	.memberList .fixed-canshu div.parameterWord{
		color:#ec6a47;
		font-size: 12px;
		position: absolute;
		top:10px;
	}
	.memberList div.jf{
		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background: rgba(0,0,0,0.2);
		z-index:300;
	}
	.memberList div.jf .jf-all{
		z-index:200;
		width:500px;
		height:277px;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		background: white;
		overflow: hidden;
	}
	.memberList div.jf .jf-all .top{
		padding: 10px 20px;
		font-weight: bold;
		font-size: 16px;
	}
	.memberList div.jf .jf-all .jf-middle{
		padding: 10px 20px;
		height:160px;
	}
	.memberList div.jf .jf-all .jf-middle>div{
		line-height: 70px;
		text-align: center;
	}
	.memberList div.jf .jf-all .jf-middle>div>div{
		display: inline-block;
		width:50%;
		margin-left: 15px;
	}
	.memberList div.jf .jf-all .bottom{
		height:54px;
		background: #f3efee;
		line-height: 54px;
		text-align: center;
	}
	.memberList div.jf .jf-all .bottom button{
		width:60px;
		height:32px;
		border:0;
		padding:0;
		color:white;
		border-radius: 3px;
	}
</style>

