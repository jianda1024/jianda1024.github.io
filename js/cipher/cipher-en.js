// 按钮：网页加密
var html =  '<div style="margin-bottom:1rem;">'
+ '<button type="button" onclick="encryptHtmlPage()" style="color:#A5A5A5">网页加密</button>'
+ '<input type="text" id="srcFileName" readonly="readonly" class="style-hide">'
+ '<input type="file" id="uploadSrcFile" class="style-hide" accept=".md"/>'
+ '</div>';
$("div.book-toc-content").prepend(html);

// 网页加密
function encryptHtmlPage() {
    document.getElementById("uploadSrcFile").click();
    $("#uploadSrcFile").change(function () {
        var filePath = $("#uploadSrcFile").val();
        if (filePath.indexOf(".md") != -1 && filePath.lastIndexOf("\\")) {
            var fileName = filePath.substr(filePath.lastIndexOf("\\") + 1);
            $("#srcFileName").val(fileName);
        } else {
            return;
        }

        var file = document.getElementById("uploadSrcFile").files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function () {
            var article = this.result;
            var articleHead = article.substring(0, article.indexOf("---", 10) + 3).replace('encrypt: true', 'decrypt: true');
            var articleBase64 = encodeBase64(article);
            $("#articleHead").remove();
            $("#articleBase64").remove();
            var html = '<div id="articleHead" class="style-hide">' + articleHead + '</div>\n'
                + '<div id="articleBase64" class="style-hide">' + articleBase64 + '</div>';
            $("div.book-page").append(html);
            encryptAndDownloadFile();
        }
    });
}

// 加密并下载文件
function encryptAndDownloadFile() {
    var secretKey = getSecretKey();
    if (isEmpty(secretKey)) {
        return;
    }

    var fileName = $("#srcFileName").val();
    if (isEmpty(fileName)) {
        alert("请上传原文本文件！");
        return;
    }

    // 目录：catalog
    var catalogHtml = $("nav#TableOfContents").prop("outerHTML");
    var catalogBase64 = encodeBase64(catalogHtml);
    var catalogData = encryptByAes(secretKey, catalogBase64);

    // 正文：content
    var contentHtml = $("article.markdown").prop("outerHTML");
    var contentBase64 = encodeBase64(contentHtml);
    var contentData = encryptByAes(secretKey, contentBase64);

    // 文档：article
    var articleBase64 = $("#articleBase64").text();
    var articleData = encryptByAes(secretKey, articleBase64);

    // 下载文件
    var articleBody = '<div class="style-hide">\n\n'
        + '<p id="catalogData">' + catalogData + '</p>\n\n'
        + '<p id="contentData">' + contentData + '</p>\n\n'
        + '<p id="articleData">' + articleData + '</p>\n\n'
        + '<p id="fileName">' + fileName + '</p>\n\n'
        + '</div>';
    var text = $("#articleHead").text() + "\n\n" + articleBody;
    var blob = new Blob([text], { type: "text/plain" });
    saveAs(blob, fileName);
}