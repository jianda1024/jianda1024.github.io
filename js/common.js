// 为标签添加class属性
$("img").wrap('<div class="style-center"></div>')
$(".markdown>table").wrap('<div class="style-margin-left"></div>')
$(".markdown>div>pre").addClass("style-margin-left")
isShowIData();

// 判断空
function isEmpty(param){
    if (param == null || param == undefined || param == "") {
        return true;
    }
    return false;
}

// 切换内容
function multiContent(param) {
    element = $("#multi-content-list")
    if (element.hasClass('style-hide')) {
        element.removeClass('style-hide');
    } else {
        element.addClass('style-hide');
    }
}

// 显示IData
function showIData() {
    sessionStorage.setItem("Blog.IWiki.isShowIData", true);
    $("#idata").removeClass('style-hide');
}
function isShowIData() {
    var isShow = sessionStorage.getItem("Blog.IWiki.isShowIData");
    if (isShow) {
        $("#idata").removeClass('style-hide');
    } else {
        $("#idata").addClass('style-hide');
    }
}

// var links=$('#TableOfContents ').find('a');
// var txt;
// for (var idx in links) {
//     txt=txt+"\n"+links[idx].outerHTML+"<br/>"

// } 
// console.log(txt)