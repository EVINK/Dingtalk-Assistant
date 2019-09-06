interface Settings {
    banGlobalStyle: boolean
    banSnapshotShortcut: boolean
    snapshotShortcut: Array<string>
    msgClickedAction: 'close' | 'focus'
}

interface ContactMap {
    [key: string]: HTMLElement
}

interface chromeNotificationOptions {
    title: string,
    message: string,
    type?: 'basic' | 'image' | 'list' | 'progress',
    iconUrl?: string
}
