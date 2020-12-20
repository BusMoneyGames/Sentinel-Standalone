const electron = require("electron");
const { ipcMain } = require('electron')
const fs = require('fs');
const path = require("path");
const console = require('console');
const isDev = require("electron-is-dev");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 900, height: 680,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    })
    
    // mainWindow.loadURL(isDev? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.loadURL(isDev? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
    //mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
    mainWindow.on("closed", () => (mainWindow = null));
}
ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
  })

app.on("ready", createWindow);
app.on("window-all-closed", () => 
{
    if (process.platform !== "darwin") 
    {
        app.quit();
    }
});

app.on("activate", () => 
{
    if (mainWindow === null) 
    {
        console.log("testing baby")
        createWindow();
    }
});