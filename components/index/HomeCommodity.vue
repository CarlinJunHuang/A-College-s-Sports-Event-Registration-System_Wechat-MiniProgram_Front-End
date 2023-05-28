<template>
	<view class="homecommodity">
		<block v-for="(item,index) in homeData" :key='index'>
			<HomeItem :item='item'></HomeItem>
		</block>
	</view>
</template>

<script>
	import HomeItem from '@/components/index/HomeItem.vue'
	export default{
		data(){
			return{
				homeData:[{
					sportImg: '/static/images/events/SportMeeting.jpg',
					priority:'高',
					sportTime:'2023年7月15日-8月26日',
					sportName:'2023年秋季运动会',
					info:'',
				},{
					sportImg: '/static/images/events/GirlBasketball.jpg',
					priority:'低',
					sportTime:'2023年8月24日-11月16日',
					sportName:'女子三人篮球赛',
					info:'这个比赛还没有什么规则哦~',
				}
				]
			}
		},
		components:{
			HomeItem
		}
	}
</script>

<style scoped>
	.homecommodity{
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
	}
</style>