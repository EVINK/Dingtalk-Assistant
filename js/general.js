var storage = new ((function () {
    function class_1() {
    }
    class_1.prototype.set = function (data) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.set(data);
        });
    };
    class_1.prototype.get = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(null, function (result) {
                resolve(result[key]);
            });
        });
    };
    return class_1;
}()))();
var sendMessage = function (msg, callback) {
    return new Promise(function (solve, reject) {
        chrome.tabs.query({ active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: msg }, callback);
        });
    });
};
//# sourceMappingURL=general.js.map