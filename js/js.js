$(document).ready(function() {
	// 登录页面的显示和隐藏
	// $("#register_hide").click(function() {
	// 	$(".LoginMain .register").hide();
	// 	$(".LoginMain .login").show();
	// });
	// $("#login_hide").click(function() {
	// 	$(".LoginMain .register").show();
	// 	$(".LoginMain .login").hide();
	// });
	sendcode();
	returntop();
})
// 注册 校验手机号
var register_phone = function() { //手机号判断
	var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
	var register_phone = $("#register_phone").val();
	if (!reg.test(register_phone)) {
		$("#register_error").css("visibility", "visible");
		$("#register_error").text("请输入正确的手机号码");
		$("#register_phone").focus(); //让输入框获得焦点
		$("#register_phone").select(); //选中输入框的内容                     
		return false;
	} else {
		$("#register_error").css("visibility", "hidden");
		return true;
	}
}
// 注册 用户协议校验
// var register_radio = function() {
// 	// var register_radio = document.getElementById("register_radio").checked;
// 	var register_radio = $("#register_radio").is(":checked")
// 	if (!register_radio) {
// 		$("#register_error").css("visibility", "visible");
// 		$("#register_error").text("请同意用户注册协议 !");
// 		return false;
// 	} else {
// 		$("#register_error").css("visibility", "hidden");
// 		return true;
// 	}
// }
// 注册按钮
var register = function() {
	if (register_phone()) {
		var phone = $("#register_phone").val();
		$.post("/?mod=guestbook", {
			phone: phone,
			submit: "submit"
		}, function(result) {
			if (result == "ok") {
				//清空内容
				$("#register_phone").val("");
				// alert('提交成功!');
				$(".LoginMain .register").hide();
				$(".LoginMain .login").show();
			} else {
				$("#register_error").css("visibility", "visible");
				$("#register_error").text("提交失败 !");
			}
		})
	} else {
		console.log("表格内容不符合校验");
		// 先用着调整好之后注销
		$(".LoginMain .register").hide();
		$(".LoginMain .login").show();
	}
}
var sendcode = function() {
	$("#submitOrderDuanxin").click(function() {
		if (register_phone()) {
			var TimerId = null;
			$("#submitOrderDuanxin").attr('data-seconds', 60);
			$("#submitOrderDuanxin").attr('disabled', 'disabled');
			TimerId = setInterval(() => {
				let sec = parseInt($("#submitOrderDuanxin").attr('data-seconds'));
				// console.log(sec)
				if (sec > 0) {
					$("#submitOrderDuanxin").attr('data-seconds', sec - 1);
					$("#submitOrderDuanxin").html(sec - 1 + '秒后重新发送！');
				} else {
					clearInterval(TimerId);
					$("#submitOrderDuanxin").removeAttr('disabled');
					$("#submitOrderDuanxin").html('重新发送！');
				}
			}, 1000);
			var phone = $("#register_phone").val();
			$.post("http://xzt.huizo.cn/api/wechat/send", {
				phone: phone
			}, function(result) {
				if (result.code == 0) {
					$("#register_error").css("visibility", "visible");
					$("#register_error").html("验证码发送成功!");
				} else {
					$("#register_error").css("visibility", "visible");
					$("#register_error").html(result.msg);
				}
			}, "json");
			return false;
		}
	});
}
var returntop = function() {
	$("#back-to-top").hide(); //隐藏这个div
	//检测屏幕高度
	var height = $(window).height();
	//scroll() 方法为滚动事件
	$(window).scroll(function() {
		if ($(window).scrollTop() > height) {
			$("#back-to-top").fadeIn(500); //fadeIn() 方法使用淡入效果来显示被选元素，假如该元素是隐藏的。
			//淡出淡入的效果为0.5秒
		} else {
			$("#back-to-top").fadeOut(500);
		}
	});
	$("#back-to-top").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500); //返回顶部的时间为0,5秒
		return false;
	});
}
