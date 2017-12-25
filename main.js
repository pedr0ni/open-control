const { app, BrowserWindow, ipcMain } = require('electron');
const data = require('./app/modules/data/data');

console.log("[INFO] Aplicativo inicializando...");
var start = Date.now();

app.on('ready', () => {

    var ready = Date.now() - start;
    console.log("[INFO] Aplicativo iniciado em " + ready + "ms.");

    let loaderWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        maximizable: false,
        frame: false
    });

    loaderWindow.setMenu(null);
    loaderWindow.loadURL(`file://${__dirname}/app/viewers/loader/loader.html`);

    setTimeout(function () {


        if (data.exist()) {
            //Manda para o Dashboard
            //Seta Logado
            data.read()
                .then((obj) => {
                    console.log("[INFO] Logado como " + obj.email);
                }).catch((err) => {
                    console.log(err);
                });

            let dashboardWindow = new BrowserWindow({
                width: 1280,
                height: 720,
                resizable: false,
                maximizable: false
            });

            dashboardWindow.loadURL(`file://${__dirname}/app/viewers/dashboard/dashboard.html`);

        } else {
            let welcomeWindow = new BrowserWindow({
                width: 1280,
                height: 720,
                resizable: false,
                maximizable: false
            });

            welcomeWindow.loadURL(`file://${__dirname}/app/viewers/welcome/welcome.html`);
        }


        loaderWindow.destroy();

    }, 2250);

});

ipcMain.on('login', (event, email) => {
    console.log("[INFO] Logando como " + email);
    data.save(email);
    manager.setLogged(email);
});
