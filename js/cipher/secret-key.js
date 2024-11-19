// 临时加密
function secretKey(token) {
    var webToken = "984868"
    var webKey = "Blog.IWiki.By.Jianda1024";
    if(!isEmpty(token)){
        webToken = token
    }
    console.log("token: " + webToken);
    
    // 加密
    var md5Text = CryptoJS.MD5(webKey).toString().toUpperCase();
    var aesText = encryptByAes(webToken, md5Text);
    var base64Text = encodeBase64(aesText);
    console.log("secretKeyText: " + base64Text);

    // 解密
    var base64Pwd = decodeBase64(base64Text);
    var aesPwd = decryptByAes(webToken, base64Pwd);
    console.log("result: "+ (md5Text === aesPwd));
}