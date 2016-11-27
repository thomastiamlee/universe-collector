'use strict';

const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const ipcMain = require("electron").ipcMain;
const path = require('path');

var mainWindow = null;
var welcomeWindow = null;

app.on('ready', function() {
  welcomeWindow = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: false,
    show: false
  });

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    resizable: false,
    show: false,
  });
  mainWindow.openDevTools();
  mainWindow.setMenu(null);
  welcomeWindow.openDevTools();
  welcomeWindow.setMenu(null);

  welcomeWindow.once("ready-to-show", function() {
    welcomeWindow.show();
  });

  ipcMain.on("details-submitted", function(event, data) {
    welcomeWindow.close();
    mainWindow.webContents.send("create-details", data);
    mainWindow.show();
  });

  ipcMain.on("session-complete", function(event, data) {
    mainWindow.close();
  });

  /*mainWindow.once("ready-to-show", function() {
    mainWindow.show();
  });*/

  welcomeWindow.loadURL('file://' + __dirname + '/app/welcome.html');
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
