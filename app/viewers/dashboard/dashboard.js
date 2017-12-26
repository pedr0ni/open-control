const { ipcRenderer } = require('electron');
const mysql = require('../../modules/data/mysql');
const data = require("../../modules/data/data");

mysql.db().query("SELECT id,total FROM vendas", function(error, results, fields) {
    if (error) throw error;
    var total = 0;
    for (var i = 0; i < results.length; i++) {
        total += results[i].total;
    }
    document.querySelector("#label-vendas").textContent = "R$ " + total;
});

mysql.db().query("SELECT COUNT(clientes.id) as res FROM clientes UNION SELECT COUNT(produtos.id) FROM produtos UNION SELECT COUNT(funcionarios.id) FROM funcionarios", function(error, results, fields) {
    if (error) throw error;
    document.querySelector("#label-clientes").textContent = results[0].res;
    document.querySelector("#label-produtos").textContent = results[1].res;
    document.querySelector("#label-funcionarios").textContent = results[2].res;
});

let table_vendas = document.querySelector("#table-vendas");

mysql.db().query("SELECT vendas.quantidade,vendas.total,clientes.nome AS cl_nome,produtos.nome AS pr_nome FROM vendas INNER JOIN clientes ON vendas.cliente_id = clientes.id INNER JOIN produtos ON vendas.produto_id = produtos.id", function(error, results, fields) {
    if (error) throw error;
    var rows = "";
    for (var i = 0; i < results.length; i++) {
        rows += "<tr><td>"+results[i].cl_nome+"</td><td>"+results[i].pr_nome+"</td><td>"+results[i].quantidade+"</td><td>"+results[i].total+"</td></tr>";
    }
    table_vendas.innerHTML = rows;
});

var table_estoque = document.querySelector("#table-estoque");

mysql.db().query("SELECT id,nome,quantidade FROM produtos WHERE quantidade <= 5 ORDER BY quantidade DESC", function(error, results, fields) {
    if (error) throw error;
    var rows = "";
    for (var i = 0; i < results.length; i++) {
        rows += "<tr><td>#"+results[i].id+"</td><td>"+results[i].nome+"</td><td>"+results[i].quantidade+"</td></tr>";
    }
    table_estoque.innerHTML = rows;
});

data.read()
    .then((obj) => {
        document.querySelector("#label-logged").textContent = obj.email;
    }).catch((err) => {
        console.log("Erro ao obter usuário logado.")
    });


window.onload = function() {};
