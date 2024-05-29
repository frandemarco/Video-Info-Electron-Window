const electron=require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;
app.on('ready', function(){
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`); //global that says look at current dir and find index.html
});
ipcMain.on('video:submit', (event, path)=>{
    ffmpeg.ffprobe(path,(err, metadata)=>{
        console.log('Video duration is:', metadata.format.duration)
        mainWindow.webContents.send(
            'video:metadata', 
            metadata.format.duration);
    })
});