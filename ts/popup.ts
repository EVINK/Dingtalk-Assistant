interface Data {
    uname: string,
    psw: string
}

class Storages {

    constructor() { }

    setStorage(value) {
        chrome.storage.sync.set(value)
    }

}

class Popup extends Storages {

    constructor() {
        super()
        this.getStorages("name");
        this.openFastLogin();
        this.addName();
        this.getState()
    }

    private getState() {
        chrome.storage.sync.get("state", (e) => {
            if (e.state) {
                $("#lxj-open").html(e.state)
            }
        })
    }
    private getStorages(key: string) {
        chrome.storage.sync.get(key, (e) => {
            if (e[key]) {
                this.loadList(e[key])
            }
        })
    }

    private loadList(names: Data[]) {
        let html: string = '';
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
        this.delName()//删除账户
        this.changeName();//切换账户
    }

    private openFastLogin() {
        $("#lxj-open").click((e) => {
            let $tar = $(e.target)
            if ($tar.html() === "开启") {
                $tar.html("关闭");
                this.setStorage({ 'state': "关闭" })
            } else {
                $tar.html("开启")
                this.setStorage({ 'state': "开启" })
            }
        })
    }

    private addName() {

        $("#lxj-add").click(() => {
            let uname = $("#lxj-uname");
            let psw = $("#lxj-psw")
            if (!uname.val()) {
                uname.addClass("lxj-warn")
                return;
            }
            if (!psw.val()) {
                psw.addClass("lxj-warn")
                return;
            }
            chrome.storage.sync.get("name", (e) => {
                let names = [];
                if (e.name) {
                    names = e.name;
                    names[names.length] = { uname: uname.val(), psw: psw.val() }
                } else {
                    names[0] = { uname: uname.val(), psw: psw.val() }
                }
                this.setStorage({ 'name': names })
                this.loadList(names)
            })
        })
    }

    private delName(): void {
        $("#lxjlist button").click((e) => {
            let index: number = $(e.target).parent().index()
            $(e.target).parent().remove()
            chrome.storage.sync.get("name",  (e)=> {
                e.name.splice(index, 1)
                this.setStorage({ 'name': e.name })
            })
            chrome.storage.sync.get("index", (e) => {
                if (e.index === index)
                    chrome.storage.sync.remove("index")
                else if (e.index < index) {
                    index--;
                    this.setStorage({ "index": index })
                }
            })
        })
    }

    private changeName(): void {
        $("#lxjlist input").click((e) => {
            let index: number = $(e.target).parent().index();
            this.setStorage({ "index": index })
        })
    }

}

new Popup();
