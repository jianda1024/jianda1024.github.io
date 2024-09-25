// 为标签添加class属性
$("img").wrap('<div class="style-center"></div>')
$(".markdown>table").wrap('<div class="style-margin-left"></div>')
$(".markdown>div>pre").addClass("style-margin-left")

// 判断空
function isEmpty(param){
    if (param == null || param == undefined || param == "") {
        return true;
    }
    return false;
}

// 切换内容
function clickContent(param) {
    console.log("log:")
    console.log(param)
    element = $("#multi-content-list")
    if (element.hasClass('style-hide')) {
        element.removeClass('style-hide');
    } else {
        element.addClass('style-hide');
    }
}