'use strict';

const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow
const path = require('path');

var mainWindow = null;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    resizable: false,
    show: false,
  });
  mainWindow.openDevTools();

  mainWindow.setMenu(null);
  mainWindow.once("ready-to-show", function() {
    mainWindow.show();
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
