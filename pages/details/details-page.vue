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
									placeholder-class="weui-input__placeholder" v-bind:value="nameValue"
									@input="onNameInput" />
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
								<label class="weui-label">邮箱号</label>
							</view>
							<view class="weui-cell__bd">
								<input class="weui-input" placeholder="填写本人学校邮箱号" type="number"
									placeholder-class="weui-input__placeholder" v-bind:value="emailValue"
									@input="onEmailInput" />
							</view>
						</view>
						<view class="weui-cells__tips weui-cells__tips_warn " v-show="isEmailWaring">
							此处请输入您的南科大专用个人邮箱号</view>

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

						<view class="weui-form__control-area">
							<view class="weui-cells__group weui-cells__group_form">
								<view class="weui-cells__title header-container">
									填写验证码
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
												class="weui-cell__control weui-cell__control_flex weui-input"
												type="text" placeholder="输入验证码"
												placeholder-class="weui-input__placeholder" v-bind:value="vcodeValue"
												@input="onVerificationCodeInput" />
										</view>

										<view class="weui-cell__ft">
											<view aria-role="button"
												class="weui-cell__control weui-btn weui-btn_default weui-vcode-btn"
												@click="getEmail">获取验证码</view>

										</view>
									</view>
								</view>
								
								<view class="weui-cells__tips weui-cells__tips_warn ">
									{{ countdown > 0 ? '请在' + countdown + '秒后再次发送' : '' }} </view>
								<view class="weui-cells__tips weui-cells__tips_warn " v-show="!firstSend">
									验证码已发送至您的学校企业邮箱，5分钟内有效 </view>
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
							<p>验证码将会以邮件的形式发送到您上面填写的南科大个人邮箱中。</p>
							<p>如果您在学校邮箱中没有收到邮件，<br>
								请尝试以下操作：<br>
								1. 检查您刚刚填写的邮箱号是否正确；<br>
								2. 检查您邮箱的垃圾邮件箱；</p>
							<p>若上述无效，请致电：13923844407</p>
						</view>
					</view>
				</view>



				<view class="weui-form__tips-area">
					<view class="weui-form__tips">
						验证码送达的邮箱为您填写的学校专用个人邮箱
					</view>
				</view>

				<view class="weui-form__opr-area">
					<view aria-role="button" class="weui-btn weui-btn_primary" @click="submitForm">提交</view>
				</view>

				<view class="weui-form__extra-area">
					<view class="weui-footer">
						<view class="weui-footer__links">
							<navigator url="../../feedback/feedback" class="weui-footer__link" @tap="goFeedback">
								遇到问题？向我们反馈！
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
	import {
		addRegistrationDetails,
		sendTestMail
	} from "@/api/system/details-page.js";
	export default {

		data() {
			return {
				value: '',
				currentValue: '',
				isCurrentWaring: false,
				phoneNumber: '',
				isPhoneWaring: false,
				isIdCardWaring: false,
				isEmailWaring: false,
				dialog1: false,
				show1: false,
				countdown: 0,
				firstSend: true,
				message: '',

				isTooManyCheckedWarning: false,
				selectedItems: [],
				selectedGroupItems: [],
				// warnToast: false,
				// hideWarnToast: false

				itemsMap: null,
				groupitemsMap: null,
				categories: ['本科生', '研究生', '教职工'],
				selectedCategory: '本科生',
				gender: '',
				birthYear: '',
				email: '',
				name: '',
				sid: '',
				phone: '',
				idCard: '',
				verificationCode: '',

				form: {
					"id": null,
					"masterId": "1",
					"studentId": null,
					"name": null,
					"gender": null,
					"idCardNumber": null,
					"project1": null,
					"project2": null,
					"relayRace": null,
					"relayRace2": null,
					"email": null,
					"phoneNumber": null,
					"remark": null,
					"verificationCode": null,
				},
			};
		},

		created() {
			this.itemsMap = {};
			for (let item of this.items) {
				this.itemsMap[item.name] = item.value;
			}

			this.groupitemsMap = {};
			for (let groupitem of this.groupitems) {
				this.groupitemsMap[groupitem.name] = groupitem.value;
			}
		},

		methods: {
			goFeedback() {
				wx.navigateTo({
					url: '/pages/feedback/feedback'
				})
			},

			onNameInput(event) {
				this.name = event.mp.detail.value;
				this.form.name = this.name;
			},

			onCurrentInput(event) {
				this.sid = event.target.value;
				this.form.studentId = this.sid;
				const is8Digits = /^\d{8}$/.test(this.sid);
				this.isCurrentWaring = !is8Digits;
			},
			onPhoneInput(event) {
				this.phone = event.mp.detail.value;
				this.form.phoneNumber = this.phone;
				const isPhoneNumber = /^1\d{10}$/.test(this.phone);
				this.isPhoneWaring = !isPhoneNumber;
			},
			onIdCardInput(event) {
				this.idCard = event.mp.detail.value;
				this.form.idCardNumber = this.idCard;
				const isIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard);
				this.isIdCardWaring = !isIdCard;

				if (isIdCard) {
					const genderDigit = this.idCard.slice(16, 17);
					this.gender = genderDigit % 2 === 0 ? '1' : '0';
					this.form.gender = this.gender;
					this.birthYear = parseInt(this.idCard.slice(6, 10));
				}
			},

			onEmailInput(event) {
				this.email = event.mp.detail.value;
				this.form.email = this.email;
				this.isEmailWaring = !(this.email.endsWith("@sustech.edu.cn") || this.email.endsWith(
					"@mail.sustech.edu.cn"));
			},

			onVerificationCodeInput(event) {
				this.verificationCode = event.mp.detail.value;
				this.form.verificationCode = this.verificationCode;
			},

			checkboxChange(e) {
				if (e.detail.value.length >= 2) {
					console.log('checkbox发生change事件，携带value值为：', e.detail.value);
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
				// 根据selectedItems的长度，更新project1和project2
				if (this.selectedItems.length == 0) {
					this.form.project1 = null;
					this.form.project2 = null;
				} else if (this.selectedItems.length == 1) {
					this.form.project1 = this.itemsMap[this.selectedItems[0]]; // 使用映射找到value
					this.form.project2 = null;
				} else {
					this.form.project1 = this.itemsMap[this.selectedItems[0]]; // 使用映射找到value
					this.form.project2 = this.itemsMap[this.selectedItems[1]]; // 使用映射找到value
				}
				console.log(this.form.project1 + this.form.project2);
			},

			groupcheckboxChange(e) {
				let name1 = parseInt(this.groupitems[0].name, 10);
				let name2 = parseInt(this.groupitems[1].name, 10);

				this.selectedGroupItems = e.detail.value.map(name => parseInt(name, 10));
				this.form.relayRace = null;
				this.form.relayRace2 = null;

				if (this.selectedGroupItems.length == 1) {
					let item = this.selectedGroupItems[0];
					if (item == name1) {
						this.form.relayRace = this.groupitemsMap[item];
					} else if (item == name2) {
						this.form.relayRace2 = this.groupitemsMap[item];
					}
				} else if (this.selectedGroupItems.length > 1) {
					let minItem = Math.min(...this.selectedGroupItems);
					let maxItem = Math.max(...this.selectedGroupItems);
					this.form.relayRace = this.groupitemsMap[minItem];
					this.form.relayRace2 = this.groupitemsMap[maxItem];
				}

				//     console.log(this.form.relayRace);
				// 	console.log(this.form.relayRace2);
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
			close() {
				this.dialog1 = false;
				console.log(this.dialog1);
				this.show1 = false;
			},

			getEmail() {
				if (this.email === null || this.email === '' || this.isEmailWaring) {
					this.$modal.alert("请先正确填写个人学校邮箱号~");
				} else {
					if (this.countdown > 0) {
						this.$modal.alert("请在冷却倒计时结束后再次发送");
						return;
					}
					console.log("email");
					sendTestMail(this.email);
					this.startCountdown();
				}
			},
			startCountdown() {
			        this.countdown = this.firstSend ? 30 : 180;
			        this.firstSend = false;
			        let interval = setInterval(() => {
			            this.countdown--;
			            if (this.countdown <= 0) {
			                clearInterval(interval);
			            }
			        }, 1000);
			    },

			validateForm() {
				let keysToIgnore = ['relayRace', 'relayRace2', 'remark', 'id']; //这些字段可以为空
				let atleastOneField = ['project1', 'project2']; // 这两个字段至少有一个需要填写

				// 检查所有非忽略的字段是否都已被填充
				for (let key in this.form) {
					if (!keysToIgnore.includes(key) && (this.form[key] === null || this.form[key] === '')) {
						return false;
					}
				}

				// 检查至少有一个字段是否已被填充
				if (this.form[atleastOneField[0]] === null && this.form[atleastOneField[1]] === null) {
					return false;
				}

				return true;
			},

			submitForm() {
				if (!this.validateForm()) {
					if(this.form.verificationCode === null || this.form.verificationCode === '' || !/^[a-zA-Z0-9]{4}$/.test(this.form.verificationCode)){
						this.$modal.alert("请先正确填写邮箱验证码~");
					}else{
						this.$modal.alert("请填写完成所有的报名信息哦~");
					}
					return;
				}
				console.log(this.form);
				addRegistrationDetails(this.form).then(response => {
					this.$modal.msgSuccess("报名提交成功");
					this.open = false;
					this.getList();
				});
			},

		},

		computed: {
			items() {
				const currentYear = new Date().getFullYear();
				const age = currentYear - this.birthYear;

				if (this.selectedCategory === '本科生') {
					// 在这里进一步区分性别
					if (this.gender === '0') {
						this.form.masterId = '1';
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
						this.form.masterId = '2';
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
					if (this.gender === '0') {
						this.form.masterId = '3';
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
						this.form.masterId = '4';
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
					if (this.gender === '0') {
						if (age <= 39) {
							this.form.masterId = '5';
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
							this.form.masterId = '7';
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
							this.form.masterId = '6';
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
							this.form.masterId = '8';
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