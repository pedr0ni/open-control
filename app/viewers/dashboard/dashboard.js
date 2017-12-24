const { ipcRenderer } = require('electron');
const mysql = require('../../modules/data/mysql');
const data = require("../../modules/data/data");
const manager = require('../../modules/manager');

let logged_user = document.querySelector("#label-logged");

window.onload = function() {
    console.log("Logado como " + manager.getLogged());
    logged_user.textContent = manager.getLogged();
};
