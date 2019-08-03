#!/bin/bash

tmux kill-window

sessionName="dev-DingTalk-Assisstant"

tmux has-session -t $sessionName
# ↑ 上个命令的退出状态，或函数的返回值。
hasSession=$?

if [ "$hasSession" = "0" ];then
    tmux attach -t $sessionName
    exit 0
fi

echo "$sessionName 启动中……"

tmux new-session -d -s $sessionName -n "DingTalk-Dev-Session" "$SHELL"
t=$sessionName:"DingTalk-Dev-Session"
# tmux split-window -vb -t $t "trap '' 2;node main.js;$SHELL"
# watch server ts
tmux split-window -h -t $t "trap '' 2;./node_modules/typescript/bin/tsc --watch -p ./ -w;$SHELL"
# watch views less
tmux split-window -h -t $t "trap '' 2;./node_modules/gulp/bin/gulp.js jsMinify compileLess watchLess wacthJs;$SHELL"

tmux attach -t $sessionName
