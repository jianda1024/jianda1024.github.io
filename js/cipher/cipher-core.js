var author="ruanjianda";

// 获取秘钥
function getSecretKey() {
    var secretKeyAes = "S/CFX1OWDaRI+Soe+kv3ooeO2bod/0bxgoyyG8kWkVdIBK9MY41YJLiRt+93/YAU";
    var tokenKey = "Blog.IWiki.token";
    var token = $.cookie(tokenKey);

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
        secretKey = decryptByAes(token, secretKeyAes);
    } catch (error) {
        console.log("获取秘钥失败！")
    }

    // 缓存token
    if (isEmpty(secretKey)) {
        $.removeCookie(tokenKey);
        alert("无效口令！");
    } else {
        var date = new Date();
        date.setTime(date.getTime() + (5 * 60 * 1000));
        $.cookie(tokenKey, token, { expires: date, path: '/' });
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

// 临时加密
function encryptText() {
    var pwd = "*****";
    var md5 = CryptoJS.MD5(pwd).toString().toUpperCase();
    console.log("MD5: " + md5);
    var ciphertext = encryptByAes(pwd, md5);
    console.log("AES: " + ciphertext);
    console.log("解密：" + decryptByAes(pwd, ciphertext));
}