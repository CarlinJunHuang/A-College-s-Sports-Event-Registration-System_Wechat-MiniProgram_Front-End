import request from '@/utils/request'

export function addRegistrationDetails(data) {
	return request({
		url: 'web/RegistrationDetailsForWeb',
		method: 'post',
		data: data, 
	})
}

import config from '@/config'
export function sendTestMail(email) {
	let baseUrl = config.baseUrl;
	uni.request({
	    url: baseUrl + '/web/Email/VerificationCode/' + email, 
	    method: 'GET',
	    success: (res) => {
	        console.log(res.data);
	    },
	    fail: (error) => {
	        console.log('request fail', error);
	    }
	})

}