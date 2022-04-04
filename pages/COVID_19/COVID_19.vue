<template>
	<view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				COVID_19:{},
				COVID_19_world:{}
			};
		},
		methods:{
			//获取疫情数据
			async getCOVID_19(){
				
				//国内疫情
				let data1 = await uni.request({
					method:"GET",
					url:"http://plmm.site:4000/COVID_19"
				})
				data1 = JSON.parse(JSON.stringify(data1))
				this.COVID_19 = data1[1].data.data
				
				// 海外疫情
				let data2 = await uni.request({
					method:"GET",
					url:"http://plmm.site:4000/COVID_19_world"
				})
				data2 = JSON.parse(JSON.stringify(data2))
				this.COVID_19_world = data2[1].data.data[0]
				
				console.log(this.COVID_19,this.COVID_19_world)
				
				return true;
				
			}
		},
		onLoad() {
			this.getCOVID_19()
		},
		async onPullDownRefresh() {
			//这里我想做个判断 3返回true就是请求完了 就关闭下拉等待
			//结果is是promise 得用await来接
			const is = await this.getCOVID_19()
			is && uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="less">

</style>
