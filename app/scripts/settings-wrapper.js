var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const f = document.querySelector('#settings');
window.addEventListener('message', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = e.data;
        if (!data.fn)
            return;
        switch (data.fn) {
            case 'storageSet':
                StorageArea.set(data.data);
                f.contentWindow.postMessage({ id: data.id }, '*');
                break;
            case 'storageGet':
                const v = yield StorageArea.get(data.key);
                f.contentWindow.postMessage({ data: v, id: data.id }, '*');
                break;
            default:
                f.contentWindow.postMessage({ id: data.id }, '*');
                break;
        }
    });
});
