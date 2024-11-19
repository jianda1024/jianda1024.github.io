var author = "ruanjianda";

// 获取秘钥
function getSecretKey() {
    var secretKeyText = $('meta[name="secretKeyText"]').attr('content');;
    var tokenKey = "Blog.IWiki.Page.Token";
    var token = sessionStorage.getItem(tokenKey);

    // 如果未缓存token, 提示用户输入token
    if (isEmpty(token)) {
        token = prompt("请输入口令：", "");
    }
    if (isEmpty(token)) {
        console.log("口令为空！")
        return "";
    }

    // 解密secretKey
    var secretKey;
    try {
        secretKey = decryptByAes(token, decodeBase64(secretKeyText));
    } catch (error) {
        console.log("获取秘钥失败！")
    }

    // 缓存token
    if (isEmpty(secretKey)) {
        sessionStorage.removeItem(tokenKey);
        alert("无效口令！");
    } else {
        sessionStorage.setItem(tokenKey, token);
    }

    return secretKey;
}

// Base64编码
function encodeBase64(src) {
    var text = String(src);
    var data = CryptoJS.enc.Utf8.parse(text);
    return CryptoJS.enc.Base64.stringify(data);
}

// Base64解码
function decodeBase64(src) {
    var data = CryptoJS.enc.Base64.parse(src);
    return data.toString(CryptoJS.enc.Utf8);
}

// AES 加密
function encryptByAes(pwd, src) {
    var text = String(src);
    var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(pwd));
    var iv = CryptoJS.enc.Utf8.parse(author);
    var data = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return data.toString();
}

// AES 解密
function decryptByAes(pwd, src) {
    var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(pwd));
    var iv = CryptoJS.enc.Utf8.parse(author);
    var data = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return data.toString(CryptoJS.enc.Utf8);
}