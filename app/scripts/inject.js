var loginStatusKeep = setInterval(function () {
    if (window.sessionStorage.getItem('EvinK') === 'Handsome') {
        var element = document.createElement('div');
        element.id = 'LSPScript-finished-EvinK';
        document.body.appendChild(element);
        return clearInterval(loginStatusKeep);
    }
    var wkToken = window.sessionStorage.getItem('wk_token');
    if (!wkToken)
        return;
    wkToken = JSON.parse(wkToken);
    // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);
    if (wkToken.isAutoLogin) {
        window.sessionStorage.setItem('EvinK', 'Handsome');
        return location.reload();
    }
    wkToken.isAutoLogin = true;
    // console.log(JSON.stringify(wkToken));
    window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));
}, 1000);
