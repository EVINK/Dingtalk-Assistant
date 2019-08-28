var __awaiter=this&&this.__awaiter||function(r,i,c,s){return new(c=c||Promise)(function(e,n){function t(e){try{a(s.next(e))}catch(e){n(e)}}function o(e){try{a(s.throw(e))}catch(e){n(e)}}function a(n){n.done?e(n.value):new c(function(e){e(n.value)}).then(t,o)}a((s=s.apply(r,i||[])).next())})},__generator=this&&this.__generator||function(t,o){var a,r,i,e,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(a)throw new TypeError("Generator is already executing.");for(;c;)try{if(a=1,r&&(i=2&n[0]?r.return:n[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,n[1])).done)return i;switch(r=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,r=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(i=0<(i=c.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){c.label=n[1];break}if(6===n[0]&&c.label<i[1]){c.label=i[1],i=n;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(n);break}i[2]&&c.ops.pop(),c.trys.pop();continue}n=o.call(t,c)}catch(e){n=[6,e],r=0}finally{a=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}},DingTalkContent=function(){function a(){this.dingTalkFullScreenStyle=document.createElement("style"),this.notificationBanListKey="newMessageBanList",this.globalNotificationLockKey="notificationLock",this.dingTalkFullScreenStyle.id="dingTalkFullScreenStyle",generaPageContent.head.appendChild(this.dingTalkFullScreenStyle),this.init(),this.getLatestContacts()}return a.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){var o,n=this;return __generator(this,function(e){return this.initDingTalkStyle(),a.checkLSPStatus(),this.switchTheme(),o=this,chrome.runtime.onMessage.addListener(function(e,n,t){e.message.fullScreen?o.genFullScreenDingTalk():!1===e.message.fullScreen?o.genRawDingTalkStyle():e.message.initDingTalkStyle?o.initDingTalkStyle():e.message.checkLSPStatus?a.checkLSPStatus():e.message.theme&&o.switchTheme(e.message.theme),t({result:"success"})}),chrome.runtime.sendMessage({storeDtId:!0}),window.onload=function(){n.newMessageListener(),n.initMessageSelector()},[2]})})},a.prototype.genFullScreenDingTalk=function(){this.dingTalkFullScreenStyle.innerHTML="\n                            #layout-main {\n                                width: 100%;\n                                height: 100%;\n                            }\n                            #body {\n                                height: 100%;\n                            }\n                            #layout-container {\n                                display: block;\n                            }\n    "},a.prototype.genRawDingTalkStyle=function(){this.dingTalkFullScreenStyle.innerHTML+="\n                            #layout-main {\n                                width: 1000px;\n                            }\n                            #body {\n                                height: 542px;\n                            }\n                            #layout-container {\n                                display: flex;\n                            }\n    "},a.prototype.initDingTalkStyle=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get("fullScreen")];case 1:return e.sent()?this.genFullScreenDingTalk():this.genRawDingTalkStyle(),[2]}})})},a.checkLSPStatus=function(){return __awaiter(this,void 0,void 0,function(){var n,t,o;return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get("loginStatusPersistence")];case 1:return e.sent()?(n="LSPScript-of-EVINK",document.querySelector("#"+n)?[2]:("\n            var loginStatusKeep = setInterval(function () {\n                if (window.sessionStorage.getItem('EvinK') === 'Handsome') {\n                    var element = document.createElement('div');\n                    element.id = 'LSPScript-finished-EvinK';\n                    document.body.appendChild(element);\n                    return clearInterval(loginStatusKeep); \n                }\n                var wkToken = window.sessionStorage.getItem('wk_token');\n                if (!wkToken) return;\n                wkToken = JSON.parse(wkToken);\n                // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);\n                if (wkToken.isAutoLogin) {\n                    window.sessionStorage.setItem('EvinK', 'Handsome');\n                    return location.reload();\n                }\n                wkToken.isAutoLogin = true;\n                // console.log(JSON.stringify(wkToken));\n                window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));\n            }, 1000)\n        ",(t=document.createElement("script")).id=n,t.innerHTML+="\n            var loginStatusKeep = setInterval(function () {\n                if (window.sessionStorage.getItem('EvinK') === 'Handsome') {\n                    var element = document.createElement('div');\n                    element.id = 'LSPScript-finished-EvinK';\n                    document.body.appendChild(element);\n                    return clearInterval(loginStatusKeep); \n                }\n                var wkToken = window.sessionStorage.getItem('wk_token');\n                if (!wkToken) return;\n                wkToken = JSON.parse(wkToken);\n                // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);\n                if (wkToken.isAutoLogin) {\n                    window.sessionStorage.setItem('EvinK', 'Handsome');\n                    return location.reload();\n                }\n                wkToken.isAutoLogin = true;\n                // console.log(JSON.stringify(wkToken));\n                window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));\n            }, 1000)\n        ",document.body.appendChild(t),[4,StorageArea.get("loginStatusPersistence")])):[2];case 2:return e.sent()&&(o=setInterval(function(){if(document.querySelector("#LSPScript-finished-EvinK"))return generaPageContent.genBubbleMsg("登录状态已保存"),clearInterval(o)},1e3)),[2]}})})},a.prototype.newMessageListener=function(){var r=this;function a(e){var n=this;e.forEach(function(a){return __awaiter(n,void 0,void 0,function(){var n,t,o;return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get(r.globalNotificationLockKey)];case 1:return e.sent()?[2]:(n=a.target.parentElement.parentElement.parentElement.querySelector('.title-wrap.info .name-wrap .name span.name-title.ng-binding[ng-bind-html="convItem.conv.i18nTitle|emoj"]'),[4,StorageArea.get(r.notificationBanListKey)]);case 2:return 0<=(e.sent()||[]).indexOf(n.textContent)?[2]:(t=a.target.parentElement.parentElement.querySelector('.noti .unread-num.ng-scope em.ng-binding[ng-show="!convItem.conv.notificationOff"]'))?(o="1"===t.textContent.toString()?"钉钉 - "+n.textContent:"钉钉 - "+n.textContent+" ("+t.textContent+")",[2,chrome.runtime.sendMessage({chromeNotification:{title:o,message:a.target.textContent}})]):[2]}})})})}var i={childList:!0,subtree:!0,characterData:!0},c=setInterval(function(){var e=Array.from(document.querySelectorAll('#sub-menu-pannel .latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]'));if(e){clearInterval(c);for(var n=0,t=e;n<t.length;n++){var o=t[n];new MutationObserver(a).observe(o,i)}}},1e3)},a.prototype.initMessageSelector=function(){return __awaiter(this,void 0,void 0,function(){function n(){m=[];for(var e=0,n=p;e<n.length;e++){n[e].remove()}l.appendChild(u),d.remove(),g.remove()}var t,l,u,o,a,d,g,m,p,r=this;return __generator(this,function(e){switch(e.label){case 0:return[4,function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,new Promise(function(n){var t=setInterval(function(){var e=document.querySelector("#header");if(e)return clearInterval(t),void n(e)},1e3)})]})})}()];case 1:return t=e.sent(),(l=document.createElement("div")).classList.add("contact-selector-area-EVINK"),t.appendChild(l),l.innerHTML+="\n        <style>\n        div.contact-selector-area-EVINK {\n        position: absolute;\n        top: 0;\n        left: 130px;\n        width: 100px;\n        height: 100%;\n        display: flex;\n        flex-flow: row;\n        justify-content: space-evenly;\n        align-items: center;\n        }\n        div.contact-selector-area-EVINK a {\n        color: white;\n        cursor: pointer;\n        }\n        .contact-cover-box-EVINK {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: #00000033;\n        overflow: hidden;\n        }\n        .contact-cover-box-EVINK::after, .contact-cover-box-EVINK::before{\n        content: '';\n        position: absolute;\n        }\n        .contact-cover-box-EVINK::before{ \n        left: 13px;\n        width: 38px;\n        height: 38px;\n        border-radius: 50%;\n        }\n        .contact-cover-box-EVINK::after{ \n        left: 20px;\n        width: 24px;\n        height: 100%;\n        }\n        .contact-cover-box-hover-EVINK::after {\n        top: 100%;\n        background: no-repeat center/100% url(\""+chrome.extension.getURL("assets/imgs/notification-disable-red.svg")+'");\n        }\n        .contact-cover-box-hover-EVINK::before {\n        top: 100%;\n        background: #000000ab;\n        }\n        .contact-cover-box-hover-EVINK:hover::before {\n        top: 9px;\n        }\n        .contact-cover-box-hover-EVINK:hover::after {\n        top: 0;\n        }\n        .contact-cover-box-permanent-EVINK::after {\n        top: 0;\n        background: no-repeat center/100% url("'+chrome.extension.getURL("assets/imgs/notification-disable-white.svg")+'");\n        }\n        .contact-cover-box-permanent-EVINK::before {\n        top: 9px;\n        background: #ff0000cf;\n        }\n        </style>\n        ',u=document.createElement("a"),l.appendChild(u),u.style.display="flex",u.style.justifyContent="center",u.style.alignItems="center",o=new Image,u.appendChild(o),o.src=chrome.extension.getURL("assets/imgs/notification-setting.svg"),o.style.width="18px",a=document.createElement("span"),u.appendChild(a),a.textContent="通知设置",d=document.createElement("a"),o=new Image,d.appendChild(o),o.src=chrome.extension.getURL("assets/imgs/finish.svg"),o.style.width="26px",g=document.createElement("a"),o=new Image,g.appendChild(o),o.src=chrome.extension.getURL("assets/imgs/cancel.svg"),o.style.width="26px",m=[],p=[],u.onclick=function(e){return __awaiter(r,void 0,void 0,function(){var n,r,i,t,o,a,c,s;return __generator(this,function(e){switch(e.label){case 0:return[4,StorageArea.get(this.globalNotificationLockKey)];case 1:return e.sent()?[2,GeneralPageContent.alert("通知已被禁用，若要启用通知，请前往设置页")]:[4,StorageArea.get(this.notificationBanListKey)];case 2:if(m=(m=e.sent())||[],n="contact-cover-box-EVINK",document.querySelector("."+n))return[2];if(r="contact-cover-box-permanent-EVINK",i="contact-cover-box-hover-EVINK",u.remove(),l.appendChild(d),l.appendChild(g),!(t=document.querySelectorAll("#sub-menu-pannel .conv-lists-box.ng-isolate-scope conv-item div.conv-item:first-child")))return[2,sendMessage({bubble:"没有找到最近联系人"})];for(t=Array.from(t),o=function(e){var t=document.createElement("div");e.appendChild(t),t.classList.add(n);var o=!1,a=e.querySelector('p.name span[ng-bind-html="convItem.conv.i18nTitle|emoj"]');0<=m.indexOf(a.textContent)?(t.classList.add(r),o=!0):t.classList.add(i),t.onclick=function(e){if(o){t.classList.remove(r),t.classList.add(i);var n=m.indexOf(a.textContent);0<=n&&m.splice(n,1),o=!1}else t.classList.remove(i),t.classList.add(r),m.push(a.textContent),o=!0;e.stopPropagation()},p.push(t)},a=0,c=t;a<c.length;a++)s=c[a],o(s);return[2]}})})},d.onclick=function(){var e={};e[r.notificationBanListKey]=m,StorageArea.set(e),n()},g.onclick=function(){n()},[2]}})})},a.prototype.switchTheme=function(r){return __awaiter(this,void 0,void 0,function(){var n,t,o,a;return __generator(this,function(e){switch(e.label){case 0:return n="dt-night-mode-EvinK",(t=document.querySelector(n))&&t.remove(),r?[3,2]:[4,StorageArea.get("theme")];case 1:r=e.sent()||"original",e.label=2;case 2:switch(r){case"night":o={main:"#020f2f",header:"#04236e",font:"white",selectedFont:"white",chatBoxHeader:"#04236e",chatBoxTextAreaBg:"white",chatBoxTextAreaFont:"black",myMsgBubble:"#0945ff",msgBubble:"#031a59"};break;case"dark-green":o={main:"#122906",header:"#07462b",font:"white",selectedFont:"white",chatBoxHeader:"#07462b",chatBoxTextAreaBg:"white",chatBoxTextAreaFont:"black",myMsgBubble:"#446e0b",msgBubble:"#446e0b"};break;case"light-green":o={main:"white",header:"#0e9d62",font:"black",selectedFont:"#0e9c61",chatBoxHeader:"#0e9c6129",chatBoxTextAreaBg:"transparent",chatBoxTextAreaFont:"black",myMsgBubble:"#e9ffcf",msgBubble:"#e9ffcf"};break;default:return[2]}return(a=document.createElement("div")).id=n,generaPageContent.head.appendChild(a),a.innerHTML+="\n        <style>\n        #content-pannel .content-pannel-head {\n        background: "+o.chatBoxHeader+";  /* 聊天框header */\n        color: "+o.font+";\n        }\n        #content-pannel .content-pannel-head {  \n         border-bottom: 0 solid transparent; \n        }\n        .main-chat.chat-items.ng-isolate-scope {\n        background: "+o.main+"; /* 聊天框 */ \n        }\n        .chat-item.me.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {\n        background: "+o.myMsgBubble+";\n        border: 1px solid transparent;\n        }\n        .chat-item.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {\n        background: "+o.msgBubble+";\n        color: "+o.font+";\n        border: 1px solid transparent;\n        }\n        #header {\n        /* header */\n        border: 1px solid "+o.header+";\n        }\n        #header.lng-zh {\n        /* header */\n        background: url('https://g.alicdn.com/DingTalkWeb/web/3.8.7/assets/webpack-img/logo_cn.png') no-repeat 35px 18px scroll "+o.header+";\n        }\n        .search-bar-wraper .main-search-2 .select2-search-field input {\n            background-color: white;\n            border: 1px solid "+o.main+";\n         }\n         \n         #menu-pannel .main-menus .menu-item.selected {\n         color: "+o.selectedFont+";\n         }\n         #menu-pannel, #menu-pannel .profile {\n         background: "+o.main+";\n         border: 1px solid "+o.main+";\n        }\n        .conv-lists-box.ng-isolate-scope {\n        background: "+o.main+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover {\n        background-color: "+o.chatBoxHeader+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active {\n        background-color: "+o.chatBoxHeader+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: "+o.selectedFont+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: "+o.selectedFont+";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: "+o.font+";\n        }\n        #sub-menu-pannel {\n        border-right: 0 solid transparent; \n        }\n        \n        .nocontent-logo {\n        background: "+o.main+";\n        }\n        #content-pannel .nocontent-tips {\n        background: "+o.main+";\n        color: "+o.font+";\n        }\n        \n        .conv-detail-pannel .send-msg-box-wrapper .action-area .send-message-button {\n        background-color: "+o.main+";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper {\n        border-top: 0 solid transparent; \n        }\n        .conv-detail-pannel .send-msg-box-wrapper .input-area {\n        background: "+o.main+";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper .input-area .msg-box .input-msg-box {\n        /* 聊天框Text area */\n        color: "+o.chatBoxTextAreaFont+";\n        background-color: "+o.chatBoxTextAreaBg+";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper .action-area {\n        border-left: 0 solid transparent;\n        }\n         \n        .chat-head .conv-operations .iconfont {\n        color: "+o.font+";\n        }       \n        \n        ::-webkit-scrollbar-track-piece {\n        background-color: "+o.main+";\n        }\n        ::-webkit-scrollbar-thumb {\n        background-color: white;\n        }\n        .conv-detail-pannel .content-pannel-body .chat-item.me .msg-bubble-area .text a {\n        color: #38adff; \n        }\n        </style>\n        ",[2]}})})},a.prototype.getLatestContacts=function(){return new Promise(function(n,e){var t=setInterval(function(){var e=Array.from(document.querySelector("#sub-menu-pannel").querySelectorAll("conv-item"));e&&(clearInterval(t),n(e))},1e3)})},a}();new DingTalkContent;