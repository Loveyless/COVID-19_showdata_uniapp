<template>
	<view class="">
		
		<!-- 抽屉 -->
		<uni-drawer class="drawer" ref="showLeft" mode="left" :mask-click="true" width="150">
			<!-- <scroll-view style="height: 100%;" scroll-y="true"> -->
				<view @click="drawerClick1" class="view1" :class="drawerActive1">
					国内疫情
				</view>
				<view @click="drawerClick2" :class="drawerActive2">
					海外疫情
				</view>
			<!-- </scroll-view> -->
		</uni-drawer>
		
		
		<view class="container">
			
			<!-- 顶部按钮 -->
			<view class="change">
				<view class="title">
					疫情各方数据汇总
				</view>
				
				<!-- 抽屉app上用不了 操 -->
				<!-- <view class="changebtn" @click="showDrawer">
					{{isWorld ? "海外疫情 | 切换" : "国内疫情 | 切换"}}
				</view> -->
				
				<!-- 这个不用抽屉 -->
				<view class="changebtn" @click="isWorld = !isWorld">
					{{isWorld ? "海外疫情 | 切换" : "国内疫情 | 切换"}}
				</view>
				
			</view>
			
			
			
			
			<!-- 国内疫情数据展示 -->
			<view class="show_data_default" v-if="!isWorld">
				<view class="out_box">
					<view class="title">
						<span style="font-size: 28upx;">COVID-19疫情数据</span>
						<span style="font-size: 24upx;color: #7c7c7c;">{{COVID_19.date}}</span>
					</view>
					<view class="box">
						
						<!-- 现存 累计 治愈等数据 -->
						<view class="top">
							
							<view class="item">
								<view style="color:#e58080"> 现存 </view>
								<view style="color:#e58080">{{COVID_19.desc.currentConfirmedCount}}</view>
							</view>
							
							<view class="item">
								<view> 累计 </view>
								<view>{{COVID_19.desc.confirmedCount}}</view>
							</view>
							
							<view class="item">
								<view style="color:#41d031"> 治愈 </view>
								<view style="color:#41d031">{{COVID_19.desc.curedCount}}</view>
							</view>
							
							<view class="item">
								<view style="color:#bcbcbc"> 死亡 </view>
								<view style="color:#bcbcbc">{{COVID_19.desc.deadCount}}</view>
							</view>
							
						</view>
						
						<view @click="isMid = !isMid" style="font-size: 20upx;margin-top: 10upx;color: #b3b3b3;">
							详细信息
						</view>
						
						
						<!-- 疫情详细数据 -->
						<view class="mid" v-show="isMid">
							
							<view class="title">
								<view> 新增境外输入人数 : {{COVID_19.desc.suspectedIncr}} </view>
								<view> 相比昨天现存确诊人数 : {{COVID_19.desc.currentConfirmedIncr}} </view>
								<view> 相比昨天累计确诊人数 : {{COVID_19.desc.confirmedIncr}} </view>
								<view> 相比昨天新增治愈人数 : {{COVID_19.desc.curedIncr}} </view>
								<view> 相比昨天新增死亡人数 : {{COVID_19.desc.suspectedIncr}} </view>
							</view>
							
							<view class="showcity">
								
								<view class="showcity_high">
									<h2>高风险地区</h2>
									<view v-for="item in COVID_19.riskarea.high" :key="item">{{item}}</view>
								</view>
								
								<view class="showcity_mid">
									<h2>中风险地区</h2>
									<view v-for="item in COVID_19.riskarea.mid" :key="item">{{item}}</view>
								</view>
								
							</view>
							
						</view>
						
						<!-- 资讯 -->
						<view class="bottom">
							<view v-for="item in COVID_19.news" :key="item.id">
								<uni-card :title="item.title" :extra="item.pubDateStr" note="Tips">
									<view @click="COVID_19link(item.sourceUrl)" class="link">						
											{{item.summary}}
									</view>
								</uni-card>
							</view>
						</view>
											
					</view>
				</view>
			</view>
			
			<!-- 海外疫情数据展示 -->
			<view class="show_data_world" v-if="isWorld">
				<uni-card v-for="item in COVID_19_world.newslist" :title="item.provinceName" :extra="COVID_19_world.date" note="Tips" :key="item.countryShortCode">
					<view class="container">
						<view class="box" style="color: #e58080;">
							<view class="title">现存确诊人数</view>
							<view class="value">{{item.currentConfirmedCount}}</view>
						</view>
						<view class="box">
							<view class="title">累计确诊人数</view>
							<view class="value">{{item.confirmedCount}}</view>
						</view>
						<view class="box" style="color: #41d031;">
							<view class="title">治愈人数</view>
							<view class="value">{{item.curedCount}}</view>
						</view>
						<view class="box" style="color: #909090;">
							<view class="title">死亡人数</view>
							<view class="value">{{item.deadCount}}</view>
						</view>
						<view class="box" style="color: #909090;">
							<view class="title">死亡率</view>
							<view class="value">{{item.deadRate}}</view>
						</view>
					</view>
				</uni-card>
			</view>
			
		</view>
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//是否是海外疫情
				isWorld:false,
				//切换抽屉样式
				drawerActive1:{active:true},
				drawerActive2:{active:false},
				COVID_19: {},
				COVID_19_world: {},
				//mid详细信息
				isMid:false
			};
		},
		methods: {
			//获取疫情数据
			async getCOVID_19() {

				//国内疫情
				let data1 = await uni.request({
					method: "GET",
					url: "http://plmm.site:4000/COVID_19"
				})
				data1 = JSON.parse(JSON.stringify(data1))
				//截取资讯的开头空格
				data1[1].data.data.news.map((i)=>{
					if(i.summary.slice(0,1) == "\n"){
						i.summary = i.summary.slice(1)
						return i
					}
					return i
				})
				this.COVID_19 = data1[1].data.data

				// 海外疫情
				let data2 = await uni.request({
					method: "GET",
					url: "http://plmm.site:4000/COVID_19_world"
				})
				data2 = JSON.parse(JSON.stringify(data2))
				this.COVID_19_world = data2[1].data.data[0]

				console.log(this.COVID_19, this.COVID_19_world)

				return true;

			},
			//打开抽屉
			showDrawer() {
				this.$refs.showLeft.open();
			},
			//切换国内国外疫情
			drawerClick1(){
				this.isWorld = false
				this.drawerActive1 = {active:true}
				this.drawerActive2 = {active:false}
				this.$refs.showLeft.close()
			},
			drawerClick2(){
				this.isWorld = true
				this.drawerActive1 = {active:false}
				this.drawerActive2 = {active:true}
				this.$refs.showLeft.close()
			},
			//资讯转跳
			COVID_19link(url){
				uni.navigateTo({
					url:`../ShowWord/ShowWord?url=${url}`,
					animationDuration:350
				})
			}
		},
		onLoad() {
			//开局就下拉刷新一下
			uni.startPullDownRefresh()
		},
		//下拉刷新逻辑
		async onPullDownRefresh() {
			//这里我想做个判断 3返回true就是请求完了 就关闭下拉等待
			//结果is是promise 得用await来接
			const is = await this.getCOVID_19()
			is && uni.stopPullDownRefresh()
			uni.showToast({
				title: "刷新成功",
				icon: "success",
				duration: 600
			})
		}
	}
</script>

<style lang="less">
.container{
	.change{
		margin: 15upx 15upx 0 15upx;
		padding: 15upx;
		border: 1px solid #f0f0f0;
		border-radius: 20upx;
		box-shadow: 0px 0px 3px 1px #ebebeb;
		display: flex;
		justify-content: center;
		.title{
			margin-right: 80upx;
			font-size: 28upx;
		}
		.changebtn{
			font-size: 28upx;
		}
	}
	.show_data_default{
		.out_box{
			border: 1px solid #f0f0f0;
			border-radius: 20upx;
			margin: 15upx;
			box-shadow: 0px 0px 3px 1px #ebebeb;
			.title{
				text-align: center;
				margin:20upx 0 20upx 0;
				span{
					margin: 45upx;
				}
			}
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				.top{
					display:flex;
					flex-wrap: wrap;
					justify-content: space-around;
					align-items: center;
					.item{
						text-align: center;
						margin:0 31upx 0 31upx;
					}
				}
				.mid{
					width: 100%;
					font-size: 20upx;
					margin-top: 15upx;
					margin-left: 25upx;
					.title{
						margin-left: 0upx;
					}
					.title view{
						// margin: -12upx 0 -12upx 0;
					}
					.showcity{
						margin-top: 10upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						view{
							text-align: center;
						}
						.showcity_high{
							width: 630upx;
							height: 500upx;
							overflow: auto;
							border: 1px solid #f7f7f7;
							border-radius: 15px;
							margin-bottom: 10upx;
						}
						.showcity_mid{
							width: 630upx;
							height: 500upx;
							overflow: auto;
							border: 1px solid #f7f7f7;
							border-radius: 15px;
						}
					}
				}
				
				.bottom{
					.link{
						color: #616161;
						padding: 0;
						margin: 0;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3; //行数
						-webkit-box-orient: vertical;
					}
				}
				
			}
		}
		
	}
	.show_data_world{
		.container{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			text-align: center;
			width: 100%;
			.box{
				padding: 0 40upx 0 40upx;
			}
		}
	}
}
	
	
.drawer{
	color: #1e1e1e;
	.view1{
		margin-top: 400upx;
		border-top: 1px solid #ccc;
	}
	view{
		padding-top: 8upx;
		height: 50upx;
		border-bottom: 1px solid #ccc;
		text-align: center;
	}
	.active{
		background-color: #edecf1;
	}
}
</style>
