const express = require('express');

const app = express();

const clientes = [];

const port = 3000;

app.get("/", (req, res) => {res.send("Ola, mundo!");});

app.get("/cliente", (req, res) => {res.send(clientes);});  //GET

app.get("/cliente/:id", (req, res) => {
    const id = req.params.id; // pega o id do cliente da rota
    const cliente= clientes.find(c => c.id == id); // procura o cliente pelo id
    res.send(cliente); // envia o cliente encontrado
   }) //GET

/*app.post("/clientes", express.json(), (req, res) => {
    const nome = req.body.nome;
    clientes.push(nome);
    res.status(201).send(nome + " adicionado com sucesso!");  //POST
});*/ //POST
app.use(express.json()); // define que usaremos o json
app.post("/cliente", (req, res) => {
    let cliente = req.body; // pega o nome do cliente do corpo da requisição
    cliente.id = clientes.length + 1; // define um id para o cliente
   // console.log(req.body);  // Log do request body no console
    clientes.push(req.body); // adiciona o cliente ao array
    res.send('O nome foi adicionado com sucesso');
})

app.put("/cliente/:id", (req, res) => {
    const id = req.params.id; // pega o id do cliente da rota
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id == id) { // procura o cliente pelo id
            clientes[i].nome = req.body; // atualiza o nome do cliente
            res.send('O idade foi atualizado com sucesso');
            return; // sai do loop se encontrar o cliente
        }
    }
    }); //PUT

app.listen(port, ()=>{ console.log("Servidor rodando na porta http://localhost:3000/"); });