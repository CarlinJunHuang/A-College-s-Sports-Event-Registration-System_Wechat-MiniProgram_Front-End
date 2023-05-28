<template>
	<view class="home-item" :style="{ '--background-color': color }">
		<view class="item-main" :style="{ 'background-image': 'url(' + item.sportImg + ')' }" @tap="goStart">
			<view class="item-content" >
				<!-- <image class="left-arrow" src="../../static/images/tabbar/work_.png" mode=""></image> -->
				<text class="item-sport" :style="{ color: color }">{{item.sportName}}</text>
				<text class="item-catalog" :style="{ color: color }">{{item.sportTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		computed: {
			color() {
				return this.item.priority === '高' ? '#f1dede' : '#c9c9f1'
			}
		},
		methods:{
			goStart(){
				wx.navigateTo({
				    url:'../../details/about?sportName=' + encodeURIComponent(this.item.sportName)
				})
			}
		}
	}
</script>

<style scoped>
	.home-item{
		width: 690rpx;
		height: 530rpx;
		background: var(--background-color, #eee5df);
		box-shadow: 0 24rpx 38rpx 0 rgba(60,128,209,0.09);
		border-radius: 40rpx;
		position: relative;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}
	.item-main{
		width: 660rpx;
		height: 504rpx;
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		border-radius: 40rpx;
		top: 13rpx;
		left: 15rpx;
	}
	.item-content{
		padding-top: 320rpx;
		text-align: center;
		display: flex;
		flex-direction: column; 
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
	.item-sport{
		font-size: 68rpx;
		font-family: Microsoft Yahei;
		font-weight: 550;
		color: #eee5df;
		letter-spacing: 3rpx;
		text-shadow:1rpx 1rpx 10rpx #101010;
	}
	.item-catalog{
		margin-top: 0rpx;
		font-size: 42rpx;
		font-family: Microsoft Yahei;
		font-weight: 550;
		color: #eee5df;
		letter-spacing: 3rpx;
		text-shadow:1rpx 1rpx 8rpx #2a2a2a;
	}
</style>