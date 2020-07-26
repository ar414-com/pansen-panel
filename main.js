const { app,BrowserWindow,Menu,shell,ipcMain,dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const RiotLiveClient = require("./src/class/RiotLiveClientDataApi");
const { autoUpdater } = require("electron-updater");
let mainWindow;
app.on('ready',() => {

    mainWindow = new BrowserWindow({
        height: 650,
        width: 1250,
        webPreferences: {
            nodeIntegration:true
        }
    });

    Menu.setApplicationMenu(null);
    // mainWindow.webContents.openDevTools();

    const url = isDev ? "http://localhost:36007" : `file://${path.join(path.dirname(require.main.filename),'./build/index.html')}`;

    mainWindow.loadURL(url);

    mainWindow.on('closed', () => {
        app.quit();
    });

    const riotLiveClient = new RiotLiveClient(mainWindow);
    riotLiveClient.init();

    ipcMain.on('go-github',() => {
        shell.openExternal('https://github.com/ar414-com/pansen-panel');
    });

    appAutoUpdate();

});


function appAutoUpdate() {
    autoUpdater.autoDownload = false;

    if(isDev){
        autoUpdater.updateConfigPath = path.join(path.dirname(require.main.filename),"./app-update.yml");
    }

    autoUpdater.checkForUpdates();

    autoUpdater.on('error',(e) => {
        //更新错误
        console.log('Update Error',e);
    });

    autoUpdater.on('checking-for-update',(ret) => {
        //开始检测更新
        console.log('checking-for-update',ret);
    });

    autoUpdater.on('update-available',(ret) => {
        //发现新版本
        this.mainWindow.show();
        dialog.showMessageBox(new BrowserWindow({
            show: false,
            modal:true,
            alwaysOnTop: true
        }),{
            type: 'info',
            title: 'New version found',
            message: ret.releaseNotes,
            cancelId:0,
            defaultId:1,
            buttons: ['Talk later','Update Now']
        }).then((ret) => {
            if(ret.response === 1) {
                autoUpdater.downloadUpdate();
            }
        });
        console.log('update-available',ret);
    });

    autoUpdater.on('update-not-available',(ret) => {
        //没有发现更新
        console.log('update-not-available',ret);
    });

    autoUpdater.on('download-progress',(ret) => {
        //下载进度
        // mainWindow.setProgressBar
        console.log('download-progress',ret);
        if(ret.total && ret.total > 0){
            this.mainWindow.setProgressBar(ret.percent / 100);
        }
    });

    autoUpdater.on('update-downloaded',(ret) => {
        //完成更新包下载
        console.log('update-downloaded',ret);
    });
}
