'use strict';

const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow
const path = require('path');

var mainWindow = null;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
