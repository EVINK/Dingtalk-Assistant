
// 这个也可以
// 可以将这个get方法封装一下，下次就直接调用就好了，不需要每次将这个api写一遍
// 比如
let storage = {
    get(key, handler) {
        chrome.storage.sync.get(key, function (e) {
            if (e.name) {
                handler(e.name)
            }
        });
    }
}
// 这样写会一点
storage.get("name", loadList);

chrome.storage.sync.get("state", function (e) {
    if (e.state) {
        $("#lxj-open").html(e.state)
    }
})
addName();//添加账户
openFastLogin();//是否开启一键登录
// 这样的都可以写成函数，
function addName(){
    $("#lxjAdd").click(function () {
        var uname = $("#lxjUname");
        var psw = $("#lxjPsw")
        if (!uname.val()) {
            uname.addClass("lxj-warn")
            return;
        }
        if (!psw.val()) {
            psw.addClass("lxj-warn")
            return;
        }
        chrome.storage.sync.get("name", function (e) {
            var names = [];
            if (e.name) {
                names = e.name;
                names[names.length] = { uname: uname.val(), psw: psw.val() }
            } else {
                names[0] = { uname: uname.val(), psw: psw.val() }
            }
            chrome.storage.sync.set({ 'name': names });
            loadList(names)
        })

    })
}
function sendMsgToContent(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
    })
}
//是否开启一键登录
function openFastLogin(){
    $("#lxj-open").click((e) => {
        var $tar = $(e.target)
        if ($tar.html() == "开启") {
            sendMsgToContent({ msg: "开启" })
            $tar.html("关闭")
            chrome.storage.sync.set({ 'state': "关闭" });
        } else {
            sendMsgToContent({ msg: "关闭" })
            $tar.html("开启")
            chrome.storage.sync.set({ 'state': "开启" });
        }
    })
}
function loadList(names) {
    var html = ''
    for (var list of names) {
        html += `
        <li>
            <input type="radio" value="" name="login-name">
            <span>${list.uname}</span>
            <button>Del</button>
        </li>
        `
    }
    $("#lxjlist").html(html)
    chrome.storage.sync.get("index", function (e) {
        $("#lxjlist").find("input:eq(" + e.index + ")").prop("checked", true)
    })
    delName()//删除账户
    changeName();//切换账户
}
function delName(){
    $("#lxjlist button").click((e) => {
        var index = $(e.target).parent().index()
        $(e.target).parent().remove()
        chrome.storage.sync.get("name", function (e) {
            e.name.splice(index, 1)
            chrome.storage.sync.set({ 'name': e.name })
        })
        chrome.storage.sync.get("index", function (e) {
            if (e.index == index)
                chrome.storage.sync.remove("index")
            else if (e.index < index) {
                index--;
                chrome.storage.sync.set({ "index": index })
            }
        })
    })
}
function changeName(){
    $("#lxjlist input").click((e) => {
        var index = $(e.target).parent().index();
        chrome.storage.sync.set({ "index": index })
    })
}