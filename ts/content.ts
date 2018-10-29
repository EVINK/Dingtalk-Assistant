class Content {

  private storageIndex: number

  constructor() {
    this.listenStorage();
    chrome.storage.sync.get("state", (e) => {
      if (e.state === "关闭")
        this.loadAutoLogin("开启")
    })
    chrome.storage.sync.get("index", (e) => {
      this.storageIndex=e.index
    })
  }

  private listenStorage() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let key in changes) {
        var storageChange = changes[key];
        if (key === "state") {
          this.loadAutoLogin(storageChange.oldValue)
        } else if (key === "index") {
          this.storageIndex = storageChange.newValue
        }
      }
    });
  }

  private loadAutoLogin(state:string) {
    if (state === "开启") {
      if ($("#lxj-auto-login")[0]) return;
      let html = `
                <button id="lxj-auto-login" >一键登录</button>
             `
      let url = location.href;
      if (url.indexOf("163.com") !== -1) {
        let fatherEl = $("#login-form"),
          unameInp = $("[data-loginname=loginEmail]"),
          pswInp = $(".j-inputtext.dlpwd"),
          loginInp = $("#dologin")[0];
        this.login(html, fatherEl, unameInp, pswInp, loginInp);
      } else if (url.indexOf("qq.com") !== -1) {
        alert("放假了，下次再写")
      }
    } else {
      $("#lxj-auto-login").remove();
    }
  }

  private login(html: string, fatherEl: JQuery, unameInp: JQuery, pswInp: JQuery, loginInp: HTMLElement, className = null) {
    fatherEl.append(html)
    $("#lxj-auto-login").addClass(className)
      .click((e) => {
        e.preventDefault();
        if (this.storageIndex === undefined) {
          alert("未选择帐号")
        } else {
          chrome.storage.sync.get("name", ({ name }) => {
            unameInp.val(name[this.storageIndex].uname)
            pswInp.val(name[this.storageIndex].psw)
            loginInp.click();
          })
        }
        ;
      })
  }
}

new Content();
