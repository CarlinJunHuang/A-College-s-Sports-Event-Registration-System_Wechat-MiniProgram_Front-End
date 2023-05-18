<template>
  <view class="home">
		<view class="home-container">
			<view class="home-header">
				<view class="home-title">
				  <span class="line">南方科技大学体育中心</span><br>
				  <span class="line">校级赛事报名系统</span>
				</view>
				<view class="home-subtitle">开放赛事报名</view>
				<view class="home-show">
					<view class="home-sports">
						<text class="show-text">赛事查询</text>
					</view>
					<image class="home-img" src="../static/images/home/search.png"></image>
				</view>
			</view>
			<scroll-view scroll-y="true" :style="'height: '+clientHeight+'px;'" >
				<view class="home-content" :style="'height: '+clientHeight+'px;'">
					<HomeCommodity></HomeCommodity>
				</view>
			</scroll-view>
		</view>
  </view>
</template>

<script>
	import HomeCommodity from '@/components/index/HomeCommodity.vue'
	export default {
		onLoad() {
			uni.hideTabBar()
		},
		data() {
			return{
				selected:0,
				clientHeight:null
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					/* 获取头部的高度, select里面的参数像是css选择器一样选择元素 */
					let info = uni.createSelectorQuery().in(this).select(".home-header")
					info.boundingClientRect((data)=>{
						this.clientHeight = res.windowHeight - data.height
					}).exec(function(res){
						
					})
				}
			})
		},
		components:{
			HomeCommodity
		}
	}
</script>

<style scoped>
	.home-container{
		width: 100vw;
		height: 100%;
		margin-right: -7rpx;
		background: url('@/static/images/Background2.jpg') no-repeat;
		background-size: cover;
		margin-bottom: 120rpx;
		box-sizing: border-box;
	}
	
	.home-header{
		padding: 131rpx 37rpx 0 37rpx;
	}
	
	/* 设置标题 */
	.home-title{
		width: 600rpx;
		height: auto;
		font-size: 48rpx;
		font-family: Microsoft Yahei;
		font-weight: 400;
		color: #d87422;
		line-height: 65rpx;
		letter-spacing: 3.5rpx;
		
	}
	
	/* 设置副标题:项目列表*/
	.home-subtitle{
		margin-top: 15rpx; /* 添加上方间距 */
		width: auto;
		height: auto;
		font-size: 70rpx;
		font-family: Microsoft Yahei;
		font-weight: 550;
		color: #494cef;
		line-height: 90rpx;
		opacity: .9;
		letter-spacing: 5rpx;
	}
	
	/* 设置搜索：查询项目*/
	.home-show{
		margin-top: 15rpx; /* 添加上方间距 */
		width: 285rpx;
		height: 75rpx;
		display: flex;
		align-items: center;
		background-color: #494cef;
		border-radius: 10rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.home-sports{
		height: 27rpx;
		line-height: 25rpx;
		font-size: 35rpx;
		font-family: Microsoft Yahei;
		font-weight: 550;
		color: #e5e5db;
		letter-spacing: 6rpx;
	}
	.home-sports::after{
		content: '';
		width: 1rpx;
		height: 31rpx;
		margin: 0 20rpx;
		border-left: 8rpx solid #ffffff;
		
	}
	.home-img{
		width: 45rpx;
		height: 45rpx;
		margin-left: 5rpx;
	}
	
</style>
