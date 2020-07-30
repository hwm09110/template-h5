import http from '@/request';

// 获取微信配置参数
function getWxconfig(pageUrl){
	return http.getWxApiConfig({pageUrl})
}

// 注册微信分享
function setWXShareConfig(config) {
  wx.config({
    // debug: USER_UID == 668775?true:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appId, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature, // 必填，签名，见附录1
    jsApiList: [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
      'onMenuShareQZone'
    ]
  });
}

// 配置自定义分享
function setShareOptions(title,link,imgUrl,desc){
	wx.ready(function(){
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		//分享到朋友圈
		wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc,
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
		});
		// “分享给朋友”
		wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      trigger: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
      },
      cancel: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
		});
		//分享到qq
		wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
		});
		//分享到qq空间
		wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
		});
	});
	wx.error(function(res){
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		console.log('wx.error', res)
	});
}

// 注册微信录音
function setWXRecordConfig(config, callback) {
	wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: config.appId, // 必填，公众号的唯一标识
			timestamp: config.timestamp, // 必填，生成签名的时间戳
			nonceStr: config.nonceStr, // 必填，生成签名的随机串
			signature: config.signature, // 必填，签名，见附录1
			jsApiList: [
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd', //监听录音自动停止接口
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd', //监听语音播放完毕接口
				'uploadVoice',
				'downloadVoice'
			]
	});
	wx.ready(function(){
		typeof callback == 'function' && callback()
	})
}

// 开始录音
function startRecord(){
	return new Promise((resolve, reject)=>{
		wx.startRecord({
				success: function(){
					resolve()
				},
				cancel: function () {
						alert('拒绝授权,将不能使用录音留言功能！')
						reject()
				}
		});
	})
}

// 停止录音
function stopRecord(){
	return new Promise((resolve, reject)=>{
		wx.stopRecord({
			success: function (res) {
				const localId = res.localId //本地音频id
				resolve(localId)
			},
			fail: function (res) {
				reject(res)
			}
		})
	})
}

// 自动停止录音
function autoStopRecord(){
	return new Promise((resolve, reject)=>{
		wx.onVoiceRecordEnd({
				// 录音时间超过一分钟没有停止的时候会执行 complete 回调
				complete: function (res) {
						resolve(res)
				}
		});
	})
}

//播放本地录音
function playRecord(localId){
	wx.playVoice({
			localId: localId
	});
}

//暂停播放本地录音
function pauseVoice(localId){
	wx.pauseVoice({
			localId: localId
	});
}

//停止播放本地录音
function stopVoice(localId){
	wx.stopVoice({
			localId: localId
	});
}


//上传录音
//调用微信的上传录音接口把本地录音先上传到微信的服务器
//不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
function uploadRecord(localId){
	return new Promise((resolve, reject)=>{
		wx.uploadVoice({
				localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
						// console.log(res);
						//把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
						resolve(res)
				},
				fail: function (res) {
					reject(res)
				}
		});
	})
}


// 注册微信扫一扫
function setWXScanConfig(config, callback) {
	wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appId, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature, // 必填，签名，见附录1
    jsApiList: [
      'scanQRCode',
    ]
	});
	wx.ready(function(){
		typeof callback == 'function' && callback()
	});
}

// 调起微信扫一扫
function scanQRCode() {
  return new Promise((resolve, reject) => {
    wx.scanQRCode({
      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        resolve(result);
      },
      fail: function (res) {
        reject(res)
      }
    });
  })
}


export default {
	getWxconfig,
	setWXShareConfig,
  setWXRecordConfig,
  setWXScanConfig,
	setShareOptions,
	startRecord,
	stopRecord,
	autoStopRecord,
	playRecord,
	pauseVoice,
	stopVoice,
  uploadRecord,
  scanQRCode
}
