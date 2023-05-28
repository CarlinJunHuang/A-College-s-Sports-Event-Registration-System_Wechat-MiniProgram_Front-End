<template>
	<view class="weui-article">
		<view aria-role="heading" aria-level="4" class="weui-article__h1"
			style="font-size: 25px; font-weight: 600; margin-bottom: 25px; text-align: center">
			{{ sportName }}报名规程
		</view>
		<view class="weui-form__opr-area">
			<view aria-role="button" class="weui-btn weui-btn_primary" @click="goDetailspage">开始报名</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				sportName: ''
			};
		},
		onLoad(options) {
			this.sportName = decodeURIComponent(options.sportName);
		},

		methods: {
			goDetailspage() {
				wx.navigateTo({
					url: '/pages/details/details-page'
				})
			}
		}
	}
</script>

<style>
	.page {
		background-color: var(--weui-BG-2)
	}

	image {
		margin: 8rpx 0
	}
</style>