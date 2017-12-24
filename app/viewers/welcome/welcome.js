const { ipcRenderer } = require('electron');
const mysql = require('../../modules/data/mysql');

const ver = require('electron').remote.app.getVersion(); //Obtem a versão do package.json ~

let register_btn = document.querySelector("#register-btn");


register_btn.addEventListener('click', function(event) {
    event.preventDefault();

    let email = document.querySelector("#register-email").value;
    let senha = document.querySelector("#register-senha").value;

    if (email == "" || senha == "") {
        console.log("Nulos");
        return;
    }

    mysql.db().query("SELECT id,email FROM users WHERE email = '"+email+"' AND senha = '"+senha+"' LIMIT 1", function(error, results, fields) {
        if (error) throw error;
        if (results.lenght == 0) {
            //Não encontrado.
            console.log("Email ou senha incorreto");
            return;
        }
        ipcRenderer.send('login', results[0].email);
    });
});

let app_version = document.querySelector("#app-version");

window.onload = function() {
    app_version.textContent = ver;
};
