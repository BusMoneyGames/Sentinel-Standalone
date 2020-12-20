window.ipcRenderer = require('electron').ipcRenderer;

window.ipcRenderer.send('ping')