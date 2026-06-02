// Importamos o módulo Express (para o servidor) e o FS (File System, para ler/escrever arquivos)
const express = require('express');
const fs = require('fs');
const app = express();

// O "Middleware" express.json() é crucial. Ele instrui o servidor a 
// converter automaticamente os dados que chegam no formato JSON para objetos JavaScript.
app.use(express.json());
const CAMINHO_ARQUIVO = './dados.json';

//Rota raiz
app.get('/', (req, res) => {
    res.send(" Bem vido para acessar os dados digite /usuarios ao final do URL")
})


// Rota para buscar um usuário específico pelo ID
// O ":id" na URL é um parâmetro dinâmico (variável)
app.get('/usuarios/:id', (req, res) => {
    // 1. Capturamos o ID enviado na URL
    // Importante: Parâmetros de URL chegam como Texto (String). 
    // Como nosso JSON usa números, convertemos com parseInt.
    const idProcurado = parseInt(req.params.id);

    // 2. Lemos o arquivo de dados
    fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao ler a base de dados." });
        }

        // 3. Convertemos o texto do JSON para um Array de objetos JavaScript
        const usuarios = JSON.parse(data);

        // 4. Utilizamos o método .find() para localizar o objeto com o ID correspondente
        const usuarioEncontrado = usuarios.find(u => u.id === idProcurado);

        // 5. Verificação de existência (Tratamento de Erro)
        if (usuarioEncontrado) {
            // Se encontrar, retornamos o objeto e o status 200 (OK)
            res.status(200).json(usuarioEncontrado);
        } else {
            // Se não encontrar, retornamos status 404 (Not Found)
            res.status(404).json({ mensagem: "Usuário não localizado em nossa base." });
        }
    });
});

// --- ROTA GET: CONSULTA ---
app.post('/usuarios', (req, res) => {
    const novoUser = req.body;

    if (!novoUser || Object.keys(novoUser).length === 0) {
        return res.status(400).send("Erro, Está vazio");
    }

    fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
        // Se houver um erro físico de leitura (ex: arquivo não achado), já barra aqui
        if (err) {
            return res.status(500).send("Erro ao ler o arquivo");
        }

        let usuarios = [];

        if (data) {
            try {
                usuarios = JSON.parse(data);
            } catch (e) {
                return res.status(500).send("Erro ao processar os dados atuais");
            }
        }

        usuarios.push(novoUser);
        const novoJson = JSON.stringify(usuarios, null, 2);

        fs.writeFile(CAMINHO_ARQUIVO, novoJson, (err) => {
            if (err) {
                return res.status(500).send("Erro ao salvar o arquivo");
            } else {
                // Tópico 6: Retornando o status 201 com um objeto JSON de sucesso
                return res.status(201).json({
                    mensagem: "Tudo Certo",
                    usuarioInserido: novoUser
                });
            }
        });
    });
});


app.listen(3000, () => console.log("Servidor ativo na porta 3000"));