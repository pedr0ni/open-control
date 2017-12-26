const { app, BrowserWindow, ipcMain } = require('electron');
const data = require('./app/modules/data/data');
var eNotify = null;

console.log("[INFO] Aplicativo inicializando...");
var start = Date.now();

var mainWindow = null;

app.on('ready', () => {
    eNotify = require('electron-notify');
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

        mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            resizable: false,
            maximizable: false
        });

        if (data.exist()) {
            //Manda para o Dashboard
            //Seta Logado
            data.read()
                .then((obj) => {
                    console.log("[INFO] Logado como " + obj.email);
                    eNotify.notify({
                        title: "Open-Control",
                        text: "Você está acessando o sistema como " + obj.email,
                        image: __dirname + "/app/assets/images/success.png"
                    });
                }).catch((err) => {
                    console.log(err);
                });



            mainWindow.loadURL(`file://${__dirname}/app/viewers/dashboard/dashboard.html`);

        } else {

            mainWindow.loadURL(`file://${__dirname}/app/viewers/welcome/welcome.html`);
        }

        mainWindow.on('closed', () => {
            mainWindow.destroy();
            mainWindow = null;
        });

        loaderWindow.destroy();
        loaderWindow = null;

    }, 2250);

});

ipcMain.on('login', (event, email) => {
    console.log("[INFO] Logando como " + email);
    data.save(email);
    eNotify.notify({
        title: "Open-Control",
        text: "Você efetuou login como " + email,
        image: __dirname + "/app/assets/images/success.png"
    });
    mainWindow.loadURL(`file://${__dirname}/app/viewers/dashboard/dashboard.html`);
});
