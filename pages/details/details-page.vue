<template>
	<!-- #ifdef MP-WEIXIN -->
	<page-meta root-font-size="system" />
	<view class="page" :data-weui-theme="theme" :data-weui-mode="mode">
		<view class="weui-form">
			<view class="weui-form__text-area">
				<h2 class="weui-form__title">填写报名信息</h2>
				<view class="weui-form__desc">填写/选择您的姓名、性别、学工号、组别大类、联系电话、身份证号以及参报项目</view>
			</view>

			<view class="weui-form__control-area">
				<view class="weui-cells__group weui-cells__group_form">
					<view class="weui-cells__title">信息填写</view>

					<view class="weui-cells">
						<view class="weui-cell weui-cell_active">
							<view class="weui-cell__hd"><label class="weui-label">姓名</label></view>
							<view class="weui-cell__bd">
								<input class="weui-input" placeholder="填写真实姓名"
									placeholder-class="weui-input__placeholder" />
							</view>
						</view>

						<view id="showPicker" aria-haspopup="listbox"
							class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after"
							aria-role="button">
							<view class="weui-cell__hd"> <label class="weui-label">票种</label></view>
							<view class="weui-cell__bd">
								<view class="weui-select">的士票</view>
							</view>
						</view>

						<view class="weui-cells__group weui-cells__group_form">
							<view class="weui-cells weui-cells_form">
								<view class="weui-cell weui-cell_active ">
									<view class="weui-cell__hd"><label class="weui-label">学工号</label></view>
									<view class="weui-cell__bd weui-flex">
										<input class="weui-input" type="text" placeholder="填写本人学工号"
											placeholder-class="weui-input__placeholder" v-bind:value="currentValue"
											@input="onCurrentInput" />
									</view>
								</view>
							</view>
							<view class="weui-cells__tips weui-cells__tips_warn " v-show="isCurrentWaring">
								学工号为8位纯数字</view>
						</view>

						<view class="weui-cell weui-cell_active">
							<view class="weui-cell__hd">
								<label class="weui-label">联系电话</label>
							</view>
							<view class="weui-cell__bd">
								<input class="weui-input" placeholder="填写本人手机号码" type="number"
									placeholder-class="weui-input__placeholder" v-bind:value="phoneNumber"
									@input="onPhoneInput" />
							</view>
						</view>
						<view class="weui-cells__tips weui-cells__tips_warn " v-show="isPhoneWaring">
							请输入您的手机号码</view>

						<view class="weui-cell weui-cell_active">
							<view class="weui-cell__hd">
								<label class="weui-label">身份证号</label>
							</view>
							<view class="weui-cell__bd">
								<input class="weui-input" placeholder="填写本人身份证号" type="text"
									placeholder-class="weui-input__placeholder" @input="onIdCardInput" />
							</view>
						</view>
						<view class="weui-cells__tips weui-cells__tips_warn" v-show="isIdCardWaring">请输入您的身份证号码</view>

						<view class="weui-form__control-area">
							<view class="weui-cells__group weui-cells__group_form">
								<view class="weui-cells__title">单人赛项目选报</view>
								<view class="weui-cells weui-cells_checkbox">
									<checkbox-group bindchange="checkboxChange">
										<label class="weui-cell weui-cell_active weui-check__label"
											:class="{'weui-cell_disabled': item.disabled}" :wx:for="items"
											wx:key="name">
											<view class="weui-cell__hd">
												<checkbox class="weui-check" :value="item.name" :checked="item.checked"
													:disabled="item.disabled" />
												<i class="weui-icon-checked"></i>
											</view>
											<view class="weui-cell__bd">
												<view>{{item.value}}</view>
											</view>
										</label>
									</checkbox-group>
									<navigator class="weui-cell weui-cell_active weui-cell_link"
										hover-class="weui-cell_active">
										<view class="weui-cell__bd">添加更多</view>
									</navigator>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="weui-form__tips-area">
					<view class="weui-form__tips">
						验证码送达的邮箱为您学工号的对应邮箱
					</view>
				</view>
				<view class="weui-form__opr-area">
					<a aria-role="button" class="weui-btn weui-btn_primary">提交</a>
				</view>

				<view class="weui-form__extra-area">
					<view class="weui-footer">
						<view class="weui-footer__links">
							<navigator url="../../feedback/feedback" class="weui-footer__link">遇到问题？向我们反馈！</navigator>
						</view>
						<view class="weui-footer__text">Copyright © 2023 南方科技大学体育中心</view>
					</view>
				</view>

				<view class="weui-cells__group" style="display:none;">
					<view class="weui-cells">

						<view id="showPicker" aria-haspopup="listbox"
							class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after"
							aria-role="button">
							<view class="weui-cell__hd"> <label class="weui-label">票种</label></view>
							<view class="weui-cell__bd">
								<view class="weui-select">的士票</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {

		data() {
			return {
				value: '',
				currentValue: '',
				isCurrentWaring: false,
				phoneNumber: '',
				isPhoneWaring: false,
				isIdCardWaring: false,

				items: [{
						name: '1',
						value: '100m短跑'
					},
					{
						name: '2',
						value: '200m短跑',
						// checked: 'true'
					},
					{
						name: '3',
						value: '1500m长跑',
					},
				],
			};
		},
		methods: {
			onCurrentInput(event) {
				const value = event.target.value;
				const is8Digits = /^\d{8}$/.test(value);
				this.isCurrentWaring = !is8Digits;
			},
			onPhoneInput(event) {
				const value = event.mp.detail.value;
				const isPhoneNumber = /^1\d{10}$/.test(value);
				this.isPhoneWaring = !isPhoneNumber;
			},

			onIdCardInput(event) {
				const value = event.mp.detail.value;
				const isIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
				this.isIdCardWaring = !isIdCard;
			},

			checkboxChange(e) {
				console.log('checkbox发生change事件，携带value值为：', e.detail.value);
			},

		},


	}
</script>

<style>

</style>