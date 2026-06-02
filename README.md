# 🚀 Aula 03: Criação de API REST com Persistência em Arquivo Local (FS)

Este repositório contém o código desenvolvido durante a aula 03 de Back-End na Unicarioca. O objetivo desta aula foi avançar no desenvolvimento de APIs HTTP, aprendendo a ler e salvar informações em um arquivo de banco de dados simulado (`dados.json`) utilizando o módulo nativo `FS` (File System) do Node.js.

---

## 🛠️ Novas Tecnologias e Conceitos Aprendidos

* **Módulo FS (File System)**: Manipulação de arquivos locais (leitura com `fs.readFile` e escrita com `fs.writeFile`).
* **Middlewares (`express.json()`)**: Configuração necessária para que o Express consiga entender e traduzir dados enviados no formato JSON no corpo das requisições.
* **Parâmetros de URL (Route Params)**: Captura de IDs dinâmicos através da rota (`/usuarios/:id`).
* **Método HTTP POST**: Criação de novos registros enviados pelo cliente.
* **Status Codes HTTP**: Uso correto de respostas como `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found` e `500 Internal Server Error`.

---

## 📌 Rotas da API

O servidor roda na porta `3000` e gerencia uma lista de usuários armazenada em `dados.json`:

| Método | Rota | Descrição | Status Esperados |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Página inicial com sumário de orientações. | `200 OK` |
| **GET** | `/usuarios/:id` | Busca um usuário específico na base pelo número do ID. | `200 OK` / `404 Not Found` |
| **POST** | `/usuarios` | Cadastra um novo usuário no arquivo `dados.json`. | `201 Created` / `400 Bad Request` |

---

## ⚙️ Como Testar as Rotas (Dica)

Como este projeto agora aceita requisições do tipo **POST** (para enviar dados), você não conseguirá testar tudo apenas abrindo o navegador. É recomendável utilizar ferramentas de testes de API como:
* **Postman**
* **Insomnia**
* Extensão **Thunder Client** (direto no VS Code/Codespace)

### Exemplo de Corpo (Body) para o POST `/usuarios`:
Ao enviar um novo usuário, configure a requisição como `JSON` e envie no seguinte formato:
```json
{
  "id": 3,
  "nome": "Antônio Carlos",
  "email": "antonio@exemplo.com"
}
