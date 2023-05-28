<template>
	<view class="weui-form">
		<view class="weui-form__text-area">
			<h2 class="weui-form__title">问题反馈</h2>
			<view class="weui-form__desc">
				<p>请在此处描述您遇到的问题</p>
				<p>可以是报名规则问题</p>
				<p>也可以是系统操作问题</p>
			</view>
		</view>
		<view class="weui-form__control-area">
			<view class="weui-cells__group weui-cells__group_form">
				<view class="weui-cells__title">问题描述</view>
				<view class="weui-cells weui-cells_form">
					<view class="weui-cell" hover-class="weui-cell_active">
						<view class="weui-cell__bd">
							<textarea class="weui-textarea" placeholder="请描述你所发生的问题"
								placeholder-class="weui-input__placeholder" rows="3"></textarea>
							<view aria-role="option" class="weui-textarea-counter"><span>0</span>/200</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="weui-form__opr-area">
			<view class="weui-btn weui-btn_primary" aria-role="button" @click="submitFeedback">提交</view>
		</view>

		<view class="weui-form__tips-area">
			<view class="weui-form__tips">
				<p>关于报名，体育中心受理邮箱：xxxx@sustech.edu.cn</p>
				<p>关于系统，运维受理邮箱：SDIM@sustech.edu.cn</p>
				<p>若遇紧急情况，可致电：13923844407</p>
			</view>
		</view>

	</view>
</template>

<script>
	export default {

		methods: {
			submitFeedback() {
				this.$modal.msgSuccess("感谢您的反馈！");
			},
		}
	}
</script>

<style>
	p {
		margin-bottom: 10rpx;
		/* 调整这个值以改变空行的大小 */
	}
</style>