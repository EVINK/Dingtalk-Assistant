
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === "开启") {
        if ($("#lxj-auto-login")[0]) return;
        var html = `
                <button id="lxj-auto-login" >一键登录</button>
             `
        var fatherEl = $("#login-form"),
            unameInp = $("[data-loginname=loginEmail]"),
            pswInp = $(".j-inputtext.dlpwd"),
            loginInp = $("#dologin")[0]
        login(html, fatherEl, unameInp, pswInp, loginInp)
        // if(url==="https://mail.163.com/"){
        //     console.log(1)
        //     var fatherEl=$("#login-form"),
        //     unameInp=$("[data-loginname=loginEmail]"),
        //     pswInp=$(".j-inputtext.dlpwd"),
        //     loginInp=$("#dologin")[0]
        //     login(html,fatherEl,unameInp,pswInp,loginInp)
        // }else if(url==="https://mail.qq.com/"){
        //     console.log(2)
        //     var fatherEl=$("#login"),
        //     unameInp=$("#u"),
        //     pswInp=$("#p"),
        //     loginInp=$("#login_button")[0]
        //     console.log(fatherEl,unameInp,pswInp,loginInp)
        //     login(html,fatherEl,unameInp,pswInp,loginInp,"qq-login")
        // }
    } else {
        $("#lxj-auto-login").remove();
    }

})
function login(html, fatherEl, unameInp, pswInp, loginInp, className = null) {
    console.log(arguments)
    fatherEl.append(html)
    $("#lxj-auto-login").addClass(className)
        .click((e) => {
            e.preventDefault();
            chrome.storage.sync.get("index", function ({ index }) {
                // var index = e.index
                console.log(index)
                // 这里建议使用 === 这样会避免类型转换
                // 注意要格式化代码
                // if (index) {

                // }
                // 这样写会好点，当没有index时
                if (index === undefined) {
                    alert("未选择帐号")
                } else {
                    chrome.storage.sync.get("name", function ({ name }) {
                        // 这样使用解构的方式会好点
                        console.log(name)
                        unameInp.val(name[index].uname)
                        pswInp.val(name[index].psw)
                        loginInp.click();
                    })
                }
            });

        })
}



