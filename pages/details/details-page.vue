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

						<view id="showPicker" @click="showPicker"
							class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
							<view class="weui-cell__hd">
								<label class="weui-label">组别大类</label>
							</view>
							<view class="weui-cell__bd">
								<view class="weui-select">{{selectedCategory}}</view>
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
								<view class="weui-cells__tips weui-cells__tips_warn" v-show="isTooManyCheckedWarning">
									最多只能选择两项单人项目</view>
								<view class="weui-cells weui-cells_checkbox">
									<checkbox-group @change="checkboxChange">
										<label class="weui-cell weui-cell_active weui-check__label"
											:class="{'weui-cell_disabled': item.disabled}" v-for="item in items"
											:key="item.name">
											<view class="weui-cell__hd">
												<checkbox class="weui-check" :value="item.name"
													:checked="selectedItems.includes(item.name)"
													:disabled="item.disabled" />
												<i class="weui-icon-checked"></i>
											</view>
											<view class="weui-cell__bd">
												<view>{{item.value}}</view>
											</view>
										</label>
									</checkbox-group>
								</view>
							</view>
						</view>
						<!-- <view aria-role="alert" v-bind:class="['fadeIn', hideWarnToast ? 'fadeOut' : '']" v-if="warnToast">
							<view class="weui-mask_transparent"></view>
							<view class="weui-toast">
								<i class="weui-icon-warn weui-icon_toast"></i>
								<view class="weui-toast__content">最多只能选择两项单人项目哦</view>
							</view>
						</view> -->

						<view class="weui-form__control-area">
							<view class="weui-cells__group weui-cells__group_form">
								<view class="weui-cells__title">团体赛项目选报</view>
								<view class="weui-cells__title">非必选，且名额不与个人赛冲突</view>
								<view class="weui-cells weui-cells_checkbox">
									<checkbox-group @change="groupcheckboxChange">
										<label class="weui-cell weui-cell_active weui-check__label"
											:class="{'weui-cell_disabled': groupitem.disabled}"
											v-for="groupitem in groupitems" :key="groupitem.name">
											<view class="weui-cell__hd">
												<checkbox class="weui-check" :value="groupitem.name"
													:disabled="groupitem.disabled" />
												<i class="weui-icon-checked"></i>
											</view>
											<view class="weui-cell__bd">
												<view>{{groupitem.value}}</view>
											</view>
										</label>
									</checkbox-group>
								</view>
							</view>
						</view>

					</view>
				</view>

				<view class="weui-form__control-area">
					<view class="weui-cells__group weui-cells__group_form">
						<view class="weui-cells__title header-container">
							填写学校邮箱验证码
							<button style="width: auto;" class="weui-btn_reset weui-btn_icon" @click="open1">
								<view class="weui-icon-info-circle"></view>
								<view class="weui-hidden_abs">帮助</view>
							</button>
						</view>
						<view class="weui-cells weui-cells_form">
							<view class="weui-cell weui-cell_active weui-cell_vcode weui-cell_wrap">
								<view class="weui-cell__hd">
									<label class="weui-label">邮箱验证码</label>
								</view>
								<view class="weui-cell__bd">
									<input bindinput="bindVcodeInput"
										class="weui-cell__control weui-cell__control_flex weui-input" type="text"
										placeholder="输入验证码" placeholder-class="weui-input__placeholder" />

								</view>

								<view class="weui-cell__ft">
									<view aria-role="button"
										class="weui-cell__control weui-btn weui-btn_default weui-vcode-btn">获取验证码</view>

								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-if="dialog1 || show1" aria-role="dialog" aria-modal="true" aria-labelledby="js_dialog1_title">
					<view class="weui-mask" :class="dialog1 ? 'weui-animate_fade-in' : 'weui-animate_fade-out'"
						@click="close"></view>
					<view class="weui-half-screen-dialog"
						:class="dialog1 ? 'weui-animate_slide-up' : 'weui-animate_slide-down'">
						<view class="weui-half-screen-dialog__hd">
							<view class="weui-half-screen-dialog__hd__side">
								<view aria-role="button" class="weui-btn_icon weui-wa-hotarea" @click="close">关闭<i
										class="weui-icon-close-thin"></i></view>
								<view style="display:none;" aria-role="button" class="weui-icon-btn weui-icon-btn_close"
									@click="close">关闭</view>
							</view>
							<view class="weui-half-screen-dialog__hd__main">
								<strong class="weui-half-screen-dialog__title custom-font"
									id="js_dialog1_title">提示</strong>
							</view>
						</view>
						<view class="weui-half-screen-dialog__bd"
							style="padding-top: 30rpx; height: 800rpx; font-size: 38rpx; line-height: 60rpx;">
							<p>验证码将会以邮件的形式发送到您上面填写的学工号所对应的学校邮箱中。</p>
							<p>如果您在学校邮箱中没有收到邮件，<br>
							请尝试以下操作：<br>
							1. 检查您刚刚填写的学工号是否正确；<br>
							2. 检查您邮箱的垃圾邮件箱；</p>
							<p>若上述无效，请致电：13923844407</p>
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
							<navigator url="../../feedback/feedback" class="weui-footer__link">遇到问题？向我们反馈！
							</navigator>
						</view>
						<view class="weui-footer__text">Copyright © 2023 南方科技大学体育中心</view>
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
				dialog1: false,
				show1: false,

				isTooManyCheckedWarning: false,
				selectedItems: [],
				// warnToast: false,
				// hideWarnToast: false,

				categories: ['本科生', '研究生', '教职工'],
				selectedCategory: '本科生',
				gender: '',
				birthYear: '',
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

				if (isIdCard) {
					const genderDigit = value.slice(16, 17);
					this.gender = genderDigit % 2 === 0 ? '女' : '男';
					this.birthYear = parseInt(value.slice(6, 10));
				}
			},

			checkboxChange(e) {
				if (e.detail.value.length >= 2) {
					// this.openWarnToast();
					// Update selectedItems instead of items
					this.selectedItems = e.detail.value.slice(0, 2);
					this.isTooManyCheckedWarning = true;
					for (let item of this.items) {
						if (!this.selectedItems.includes(item.name)) {
							item.disabled = true;
						}
					}
				} else {
					this.isTooManyCheckedWarning = false;
					this.selectedItems = e.detail.value;
					console.log('checkbox发生change事件，携带value值为：', e.detail.value);
					for (let item of this.items) {
						item.disabled = false;
					}
				}
			},

			groupcheckboxChange(e) {
				this.selectedItems = e.detail.value;
			},

			// openWarnToast() {
			//     this.warnToast = true;
			//     setTimeout(() => {
			//         this.hideWarnToast = true;
			//         setTimeout(() => {
			//             this.warnToast = false;
			//             this.hideWarnToast = false;
			//         }, 300);
			//     }, 1200);
			// },


			showPicker() {
				const self = this;
				uni.showActionSheet({
					itemList: this.categories,
					success: function(res) {
						self.selectedCategory = self.categories[res.tapIndex];
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},

			onShow() {

			},

			open1() {
				this.dialog1 = true;
				this.show1 = true;
			},
			var that = this;
			    setTimeout(function(){
			      that.setData({
			        this.show1 = false,
			      });
			    }, 400);
			  },
			close() {
				this.dialog1 = false;
				console.log(this.dialog1);
				this.show1 = false;
			},

		},

		computed: {
			items() {
				const currentYear = new Date().getFullYear();
				const age = currentYear - this.birthYear;

				if (this.selectedCategory === '本科生') {
					// 在这里进一步区分性别
					if (this.gender === '男') {
						return [{
								name: '1',
								value: '100m短跑',
							},
							{
								name: '2',
								value: '200m短跑',
							},
							{
								name: '3',
								value: '400m短跑',
							},
							{
								name: '5',
								value: '1500m中长跑',
							},
							{
								name: '6',
								value: '3000m中长跑',
							},
							{
								name: '7',
								value: '跳高',
							},
							{
								name: '8',
								value: '跳远',
							},
							{
								name: '9',
								value: '铅球',
							},
							{
								name: '10',
								value: '三级跳',
							},
						];
					} else {
						return [{
								name: '1',
								value: '100m短跑',
							},
							{
								name: '2',
								value: '200m短跑',
							},
							{
								name: '3',
								value: '400m短跑',
							},
							{
								name: '4',
								value: '800m中长跑',
							},
							{
								name: '5',
								value: '1500m中长跑',
							},
							{
								name: '7',
								value: '跳高',
							},
							{
								name: '8',
								value: '跳远',
							},
							{
								name: '9',
								value: '铅球',
							},
						];
					}
				} else if (this.selectedCategory === '研究生') {
					// 在这里进一步区分性别
					if (this.gender === '男') {
						return [{
								name: '1',
								value: '100m短跑',
							},
							{
								name: '2',
								value: '200m短跑',
							},
							{
								name: '3',
								value: '400m短跑',
							},
							{
								name: '5',
								value: '1500m中长跑',
							},
							{
								name: '6',
								value: '3000m中长跑',
							},
							{
								name: '7',
								value: '跳高',
							},
							{
								name: '8',
								value: '跳远',
							},
							{
								name: '9',
								value: '铅球',
							},
						];
					} else {
						return [{
								name: '1',
								value: '100m短跑',
							},
							{
								name: '2',
								value: '200m短跑',
							},
							{
								name: '3',
								value: '400m短跑',
							},
							{
								name: '4',
								value: '800m中长跑',
							},
							{
								name: '5',
								value: '1500m中长跑',
							},
							{
								name: '7',
								value: '跳高',
							},
							{
								name: '8',
								value: '跳远',
							},
							{
								name: '9',
								value: '铅球',
							},
						];
					}
				} else if (this.selectedCategory === '教职工') {
					// 在这里进一步区分性别和年龄
					if (this.gender === '男') {
						if (age <= 39) {
							return [{
									name: '1',
									value: '100m短跑',
								},
								{
									name: '3',
									value: '400m短跑',
								},
								{
									name: '5',
									value: '1500m中长跑',
								},
								{
									name: '7',
									value: '跳高',
								},
								{
									name: '8',
									value: '跳远',
								},
							];
						} else {
							return [{
									name: '11',
									value: '50m短跑',
								},
								{
									name: '5',
									value: '1500m中长跑',
								},
								{
									name: '12',
									value: '5000m中长跑',
								},
								{
									name: '7',
									value: '跳高',
								},
								{
									name: '8',
									value: '跳远',
								},
							];
						}
					} else {
						if (age <= 39) {
							return [{
									name: '1',
									value: '100m短跑',
								},
								{
									name: '3',
									value: '400m短跑',
								},
								{
									name: '5',
									value: '1500m中长跑',
								},
								{
									name: '7',
									value: '跳高',
								},
								{
									name: '8',
									value: '跳远',
								},
							];
						} else {
							return [{
									name: '11',
									value: '50m短跑',
								},
								{
									name: '5',
									value: '1500m中长跑',
								},
								{
									name: '12',
									value: '5000m中长跑',
								},
								{
									name: '7',
									value: '跳高',
								},
								{
									name: '8',
									value: '跳远',
								},
							];
						}
					}
				}
			},

			groupitems() {
				const currentYear = new Date().getFullYear();
				const age = currentYear - this.birthYear;

				if (this.selectedCategory === '本科生') {

					return [{
							name: '13',
							value: '4×100m接力赛',
						},
						{
							name: '14',
							value: '4×400m接力赛',
						},
					];


				} else if (this.selectedCategory === '研究生') {
					return [{
							name: '13',
							value: '4×100m接力赛',
						},
						{
							name: '14',
							value: '4×400m接力赛',
						},
					];

				} else if (this.selectedCategory === '教职工') {
					return [{
							name: '13',
							value: '4×100m接力赛',
						},
						{
							name: '15',
							value: '教职工拔河赛',
						},
					];
				}
			},


		},


	}
</script>

<style>
	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-container .weui-btn_reset {
		margin-right: 10rpx;
	}

	.custom-font {
		font-size: 50rpx;
		/* 或者你想要的大小 */
	}

	p {
		margin-bottom: 25rpx;
		/* 调整这个值以改变空行的大小 */
	}

	@-webkit-keyframes weuiFadeIn {
		0% {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes weuiFadeIn {
		0% {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.weui-animate-fade-in,
	.weui-animate_fade-in {
		-webkit-animation: weuiFadeIn ease .4s forwards;
		animation: weuiFadeIn ease .4s forwards;
	}

	@-webkit-keyframes weuiFadeOut {
		0% {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes weuiFadeOut {
		0% {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	.weui-animate-fade-out,
	.weui-animate_fade-out {
		-webkit-animation: weuiFadeOut ease .4s forwards;
		animation: weuiFadeOut ease .4s forwards;
	}

	@-webkit-keyframes weuiSlideUp {
		0% {
			-webkit-transform: translate3d(0, 100%, 0);
			transform: translate3d(0, 100%, 0)
		}

		to {
			-webkit-transform: translateZ(0);
			transform: translateZ(0)
		}
	}

	@keyframes weuiSlideUp {
		0% {
			-webkit-transform: translate3d(0, 100%, 0);
			transform: translate3d(0, 100%, 0)
		}

		to {
			-webkit-transform: translateZ(0);
			transform: translateZ(0)
		}
	}

	.weui-animate-slide-up,
	.weui-animate_slide-up {
		-webkit-animation: weuiSlideUp ease .4s forwards;
		animation: weuiSlideUp ease .4s forwards
	}

	@-webkit-keyframes weuiSlideDown {
		0% {
			-webkit-transform: translateZ(0);
			transform: translateZ(0)
		}

		to {
			-webkit-transform: translate3d(0, 100%, 0);
			transform: translate3d(0, 100%, 0)
		}
	}

	@keyframes weuiSlideDown {
		0% {
			-webkit-transform: translateZ(0);
			transform: translateZ(0)
		}

		to {
			-webkit-transform: translate3d(0, 100%, 0);
			transform: translate3d(0, 100%, 0)
		}
	}

	.weui-animate-slide-down,
	.weui-animate_slide-down {
		-webkit-animation: weuiSlideDown ease .4s forwards;
		animation: weuiSlideDown ease .4s forwards
	}
</style>