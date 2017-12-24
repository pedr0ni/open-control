const jsonfile = require('jsonfile-promised');
const fs = require('fs');

let path = __dirname + "/open-control.json";

module.exports =  {

    exist: function() {
        return fs.existsSync(path);
    },
    save: function(email) {
        console.log("[INFO] Salvando arquivo de config.");

        jsonfile.writeFile(path, {email: email, time: Date.now()})
            .then(() => {
                console.log("[INFO] Arquivo de config. salvo com sucesso.");
            }).catch((err) => {
                console.log("[ERRO] Não foi possivel salvar o arquivo de config.");
                console.log(err);
            });

    },
    read: function() {
        return jsonfile.readFile(path);
    }

}
