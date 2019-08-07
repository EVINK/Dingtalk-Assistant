var __awaiter=this&&this.__awaiter||function(a,i,c,s){return new(c=c||Promise)(function(e,n){function t(e){try{r(s.next(e))}catch(e){n(e)}}function o(e){try{r(s.throw(e))}catch(e){n(e)}}function r(n){n.done?e(n.value):new c(function(e){e(n.value)}).then(t,o)}r((s=s.apply(a,i||[])).next())})},__generator=this&&this.__generator||function(t,o){var r,a,i,e,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,a=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(i=0<(i=c.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){c.label=n[1];break}if(6===n[0]&&c.label<i[1]){c.label=i[1],i=n;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(n);break}i[2]&&c.ops.pop(),c.trys.pop();continue}n=o.call(t,c)}catch(e){n=[6,e],a=0}finally{r=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}},DingTalkContent=function(){function r(){this.dingTalkFullScreenStyle=document.createElement("style"),this.newMessageNotificationLock=!1,this.notificationBanListKey="newMessageBanList",this.globalNotificationLockKey="notificationLock",this.dingTalkFullScreenStyle.id="dingTalkFullScreenStyle",generaPageContent.head.appendChild(this.dingTalkFullScreenStyle),this.init()}return r.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){var o,n=this;return __generator(this,function(e){return this.initDingTalkStyle(),r.checkLSPStatus(),this.switchNightMode(!0),o=this,chrome.runtime.onMessage.addListener(function(e,n,t){e.message.fullScreen?o.genFullScreenDingTalk():!1===e.message.fullScreen?o.genRawDingTalkStyle():e.message.initDingTalkStyle?o.initDingTalkStyle():e.message.checkLSPStatus&&r.checkLSPStatus(),t({result:"success"})}),chrome.runtime.sendMessage({storeDtId:!0}),window.onload=function(){n.newMessageListener(),n.initMessageSelector()},[2]})})},r.prototype.genFullScreenDingTalk=function(){this.dingTalkFullScreenStyle.innerHTML="\n                            #layout-main {\n                                width: 100%;\n                                height: 100%;\n                            }\n                            #body {\n                                height: 100%;\n                            }\n                            #layout-container {\n                                display: block;\n                            }\n    "},r.prototype.genRawDingTalkStyle=function(){this.dingTalkFullScreenStyle.innerHTML+="\n                            #layout-main {\n                                width: 1000px;\n                            }\n                            #body {\n                                height: 542px;\n                            }\n                            #layout-container {\n                                display: flex;\n                            }\n    "},r.prototype.initDingTalkStyle=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get("fullScreen")];case 1:return e.sent()?this.genFullScreenDingTalk():this.genRawDingTalkStyle(),[2]}})})},r.checkLSPStatus=function(){return __awaiter(this,void 0,void 0,function(){var n,t,o;return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get("loginStatusPersistence")];case 1:return e.sent()?(n="LSPScript-of-EVINK",document.querySelector("#"+n)?[2]:("\n            var loginStatusKeep = setInterval(function () {\n                if (window.sessionStorage.getItem('EvinK') === 'Handsome') {\n                    var element = document.createElement('div');\n                    element.id = 'LSPScript-finished-EvinK';\n                    document.body.appendChild(element);\n                    return clearInterval(loginStatusKeep); \n                }\n                var wkToken = window.sessionStorage.getItem('wk_token');\n                if (!wkToken) return;\n                wkToken = JSON.parse(wkToken);\n                // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);\n                if (wkToken.isAutoLogin) {\n                    window.sessionStorage.setItem('EvinK', 'Handsome');\n                    return location.reload();\n                }\n                wkToken.isAutoLogin = true;\n                // console.log(JSON.stringify(wkToken));\n                window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));\n            }, 1000)\n        ",(t=document.createElement("script")).id=n,t.innerHTML+="\n            var loginStatusKeep = setInterval(function () {\n                if (window.sessionStorage.getItem('EvinK') === 'Handsome') {\n                    var element = document.createElement('div');\n                    element.id = 'LSPScript-finished-EvinK';\n                    document.body.appendChild(element);\n                    return clearInterval(loginStatusKeep); \n                }\n                var wkToken = window.sessionStorage.getItem('wk_token');\n                if (!wkToken) return;\n                wkToken = JSON.parse(wkToken);\n                // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);\n                if (wkToken.isAutoLogin) {\n                    window.sessionStorage.setItem('EvinK', 'Handsome');\n                    return location.reload();\n                }\n                wkToken.isAutoLogin = true;\n                // console.log(JSON.stringify(wkToken));\n                window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));\n            }, 1000)\n        ",document.body.appendChild(t),[4,StorageArea.get("loginStatusPersistence")])):[2];case 2:return e.sent()&&(o=setInterval(function(){if(document.querySelector("#LSPScript-finished-EvinK"))return generaPageContent.genBubbleMsg("登录状态已保存"),clearInterval(o)},1e3)),[2]}})})},r.prototype.newMessageListener=function(){var n=this,i=this;function o(a){return __awaiter(this,void 0,void 0,function(){var n,t,o,r;return __generator(this,function(e){switch(e.label){case 0:return a.querySelector(".unread-num.ng-scope")?(n=a.parentElement.parentElement,t=n.querySelector('.latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]'),o=n.querySelector(".name-wrap .name-title.ng-binding"),t.textContent&&o.textContent?[4,StorageArea.get(i.notificationBanListKey)]:[2]):[3,2];case 1:return 0<=(e.sent()||[]).indexOf(o.textContent)?[2]:(20<(r=t.textContent).length&&(r=r.slice(0,20)+"..."),[2,chrome.runtime.sendMessage({chromeNotification:{title:"钉钉 - "+o.textContent,message:r}})]);case 2:return[2]}})})}var t=new MutationObserver(function(e){e.forEach(function(t){return __awaiter(n,void 0,void 0,function(){var n;return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get(this.globalNotificationLockKey)];case 1:if(e.sent())return[2];if(this.newMessageNotificationLock)return[2];if("characterData"===t.type){if(0<=t.target.parentElement.className.indexOf("time"))return[2];if(0<=(n=t.target.parentElement.parentElement.parentElement).className.indexOf("noti"))return[2,o(n)]}else if(0<=t.target.className.indexOf("noti"))return[2,o(t.target)];return[2]}})})})}),r={childList:!0,subtree:!0,characterData:!0},a=setInterval(function(){var e=document.querySelector("#sub-menu-pannel");e&&(clearInterval(a),t.observe(e,r))},1e3)},r.prototype.initMessageSelector=function(){return __awaiter(this,void 0,void 0,function(){function n(){a.newMessageNotificationLock=!0,setTimeout(function(){return a.newMessageNotificationLock=!1},1e3),m=[];for(var e=0,n=h;e<n.length;e++){n[e].remove()}u.appendChild(d),g.remove(),p.remove()}var t,u,d,o,r,g,p,m,h,a,i=this;return __generator(this,function(e){switch(e.label){case 0:return[4,function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,new Promise(function(n){var t=setInterval(function(){var e=document.querySelector("#header");if(e)return clearInterval(t),void n(e)},1e3)})]})})}()];case 1:return t=e.sent(),(u=document.createElement("div")).classList.add("contact-selector-area-EVINK"),t.appendChild(u),u.innerHTML+="\n        <style>\n        div.contact-selector-area-EVINK {\n        position: absolute;\n        top: 0;\n        left: 130px;\n        width: 100px;\n        height: 100%;\n        display: flex;\n        flex-flow: row;\n        justify-content: space-evenly;\n        align-items: center;\n        }\n        div.contact-selector-area-EVINK a {\n        color: white;\n        cursor: pointer;\n        }\n        .contact-cover-box-EVINK {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: #00000033;\n        overflow: hidden;\n        }\n        .contact-cover-box-EVINK::after, .contact-cover-box-EVINK::before{\n        content: '';\n        position: absolute;\n        }\n        .contact-cover-box-EVINK::before{ \n        left: 13px;\n        width: 38px;\n        height: 38px;\n        border-radius: 50%;\n        }\n        .contact-cover-box-EVINK::after{ \n        left: 20px;\n        width: 24px;\n        height: 100%;\n        }\n        .contact-cover-box-hover-EVINK::after {\n        top: 100%;\n        background: no-repeat center/100% url(\""+chrome.extension.getURL("assets/imgs/notification-disable-red.svg")+'");\n        }\n        .contact-cover-box-hover-EVINK::before {\n        top: 100%;\n        background: #000000ab;\n        }\n        .contact-cover-box-hover-EVINK:hover::before {\n        top: 9px;\n        }\n        .contact-cover-box-hover-EVINK:hover::after {\n        top: 0;\n        }\n        .contact-cover-box-permanent-EVINK::after {\n        top: 0;\n        background: no-repeat center/100% url("'+chrome.extension.getURL("assets/imgs/notification-disable-white.svg")+'");\n        }\n        .contact-cover-box-permanent-EVINK::before {\n        top: 9px;\n        background: #ff0000cf;\n        }\n        </style>\n        ',d=document.createElement("a"),u.appendChild(d),d.style.display="flex",d.style.justifyContent="center",d.style.alignItems="center",o=new Image,d.appendChild(o),o.src=chrome.extension.getURL("assets/imgs/notification-setting.svg"),o.style.width="18px",r=document.createElement("span"),d.appendChild(r),r.textContent="通知设置",g=document.createElement("a"),o=new Image,g.appendChild(o),o.src=chrome.extension.getURL("assets/imgs/finish.svg"),o.style.width="26px",p=document.createElement("a"),o=new Image,p.appendChild(o),o.src=chrome.extension.getURL("assets/imgs/cancel.svg"),o.style.width="26px",m=[],h=[],d.onclick=function(e){return __awaiter(i,void 0,void 0,function(){var n,a,i,t,o,r,c,s,l=this;return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get(this.globalNotificationLockKey)];case 1:return e.sent()?[2,GeneralPageContent.alert("通知已被禁用，若要启用通知，请前往设置页")]:[4,StorageArea.get(this.notificationBanListKey)];case 2:if(m=(m=e.sent())||[],n="contact-cover-box-EVINK",document.querySelector("."+n))return[2];if(a="contact-cover-box-permanent-EVINK",i="contact-cover-box-hover-EVINK",d.remove(),u.appendChild(g),u.appendChild(p),this.newMessageNotificationLock=!0,setTimeout(function(){return l.newMessageNotificationLock=!1},1e3),!(t=document.querySelectorAll("#sub-menu-pannel .conv-lists-box.ng-isolate-scope conv-item div.conv-item:first-child")))return[2,sendMessage({bubble:"没有找到最近联系人"})];for(t=Array.from(t),o=function(e){var t=document.createElement("div");e.appendChild(t),t.classList.add(n);var o=!1,r=e.querySelector('p.name span[ng-bind-html="convItem.conv.i18nTitle|emoj"]');0<=m.indexOf(r.textContent)?(t.classList.add(a),o=!0):t.classList.add(i),t.onclick=function(e){if(o){t.classList.remove(a),t.classList.add(i);var n=m.indexOf(r.textContent);0<=n&&m.splice(n,1),o=!1}else t.classList.remove(i),t.classList.add(a),m.push(r.textContent),o=!0;e.stopPropagation()},h.push(t)},r=0,c=t;r<c.length;r++)s=c[r],o(s);return[2]}})})},a=this,g.onclick=function(){var e={};e[i.notificationBanListKey]=m,StorageArea.set(e),n()},p.onclick=function(){n()},[2]}})})},r.prototype.switchNightMode=function(e){var n="dt-night-mode-EvinK";if(!e){var t=document.querySelector(n);if(t)return t.remove()}var o="white",r="#0e9d62",a="black",i="#0e9c61",c="#0e9c6129",s="transparent",l="black",u="#e9ffcf",d="#e9ffcf",g=document.createElement("div");g.id=n,generaPageContent.head.appendChild(g),g.innerHTML+="\n        <style>\n        #content-pannel .content-pannel-head {\n        background: "+c+";  /* 聊天框header */\n        color: "+a+";\n        }\n        #content-pannel .content-pannel-head {  \n         border-bottom: 0 solid transparent; \n        }\n        .main-chat.chat-items.ng-isolate-scope {\n        background: "+o+"; /* 聊天框 */ \n        }\n        .chat-item.me.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {\n        background: "+u+";\n        border: 1px solid transparent;\n        }\n        .chat-item.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {\n        background: "+d+";\n        color: "+a+";\n        border: 1px solid transparent;\n        }\n        #header {\n        /* header */\n        border: 1px solid "+r+";\n        }\n        #header.lng-zh {\n        /* header */\n        background: url('https://g.alicdn.com/DingTalkWeb/web/3.8.7/assets/webpack-img/logo_cn.png') no-repeat 35px 18px scroll "+r+";\n        }\n        .search-bar-wraper .main-search-2 .select2-search-field input {\n            background-color: white;\n            border: 1px solid "+o+";\n         }\n         \n         #menu-pannel .main-menus .menu-item.selected {\n         color: "+i+";\n         }\n         #menu-pannel, #menu-pannel .profile {\n         background: "+o+";\n         border: 1px solid "+o+";\n        }\n        .conv-lists-box.ng-isolate-scope {\n        background: "+o+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover {\n        background-color: "+c+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active {\n        background-color: "+c+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: "+i+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: "+i+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: "+a+";\n        }\n        #sub-menu-pannel {\n        border-right: 0 solid transparent; \n        }\n        \n        .nocontent-logo {\n        background: "+o+";\n        }\n        #content-pannel .nocontent-tips {\n        background: "+o+";\n        color: "+a+";\n        }\n        \n        .conv-detail-pannel .send-msg-box-wrapper .action-area .send-message-button {\n        background-color: "+o+";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper {\n        border-top: 0 solid transparent; \n        }\n        .conv-detail-pannel .send-msg-box-wrapper .input-area {\n        background: "+o+";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper .input-area .msg-box .input-msg-box {\n        /* 聊天框Text area */\n        color: "+l+";\n        background-color: "+s+";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper .action-area {\n        border-left: 0 solid transparent;\n        }\n         \n        .chat-head .conv-operations .iconfont {\n        color: "+a+";\n        }       \n        \n        ::-webkit-scrollbar-track-piece {\n        background-color: "+o+";\n        }\n        ::-webkit-scrollbar-thumb {\n        background-color: white;\n        }\n        .conv-detail-pannel .content-pannel-body .chat-item.me .msg-bubble-area .text a {\n        color: #38adff; \n        }\n        </style>\n        "},r}();new DingTalkContent;