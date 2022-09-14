# API de Games

API utilizada como parte dos estudos de criação de APIs REST em Node.JS. A API apresenta uma lista de games e suas informações básicas (título, ano de lançamento e preço), permitindo a edição destas informações.

## Endpoints

### GET /games

Responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### _Parâmetros_

Nenhum.

#### _Respostas_

- ##### Ok (200)

Caso essa resposta ocorra, você vai receber a listagem de todos os games cadastrados no banco de dados. Exemplo:

```
[
    {
        "id": 4,
        "title": "Formula One 2022",
        "year": 2022,
        "price": 80,
        "createdAt": "2022-08-25T18:18:39.000Z",
        "updatedAt": "2022-08-25T18:18:39.000Z"
    },
    {
        "id": 6,
        "title": "Asseto Corsa",
        "year": 2015,
        "price": 5,
        "createdAt": "2022-08-26T13:13:37.000Z",
        "updatedAt": "2022-08-26T13:13:37.000Z"
    },
    {
        "id": 9,
        "title": "Super Monaco GP",
        "year": 1992,
        "price": 25,
        "createdAt": "2022-08-26T15:03:33.000Z",
        "updatedAt": "2022-08-26T15:03:33.000Z"
    },
    {
        "id": 10,
        "title": "Star Wars: Battle Front",
        "year": 2005,
        "price": 15,
        "createdAt": "2022-08-26T15:29:48.000Z",
        "updatedAt": "2022-08-26T15:29:48.000Z"
    },
    {
        "id": 11,
        "title": "Need For Speed",
        "year": 1998,
        "price": 12,
        "createdAt": "2022-09-14T19:07:34.000Z",
        "updatedAt": "2022-09-14T19:07:34.000Z"
    }
]
```

- ##### Unauthorized (401)

Caso essa resposta ocorra, significa que ocorreu alguma falha durante o processo de autenticação da requisição. Motivos: token inválido ou token expirado. Exemplo:

```
{
    "err": "Invalid Token"
}
```

### GET /game/:id

Responsável por exibir as informações do game cujo "id" foi usado como parâmetro na rota.

#### _Parâmetros_

"id": id do game no banco de dados

Exemplo:

```
http://localhost:8080/game/1
```

#### _Respostas_

- ##### Bad request (400)

Caso essa resposta ocorra, o parâmetro "id" informado na rota não é do tipo numérico inteiro. Exemplo:

```
Bad Request
```

- ##### Not found (404)

Caso essa resposta ocorra, não há game cadastrado no banco de dados com o valor numérico do parâmetro "id" informado na rota. Exemplo:

```
Not Found
```

- ##### Ok (200)

Caso essa resposta ocorra, você vai receber as informações do game solicitado e os links relacionados, em modelo HATEOAS. Exemplo:

```
{
    "game": {
        "id": 6,
        "title": "Asseto Corsa",
        "year": 2015,
        "price": 5,
        "createdAt": "2022-08-26T13:13:37.000Z",
        "updatedAt": "2022-08-26T13:13:37.000Z"
    },
    "_links": [
        {
            "href": "http://localhost:8080/game/6",
            "method": "GET",
            "rel": "get_game"
        },
        {
            "href": "http://localhost:8080/game/6",
            "method": "PUT",
            "rel": "edit_game"
        },
        {
            "href": "http://localhost:8080/game/6",
            "method": "DELETE",
            "rel": "delete_game"
        },
        {
            "href": "http://localhost:8080/games",
            "method": "GET",
            "rel": "get_all_games"
        }
    ]
}
```

- ##### Unauthorized (401)

Caso essa resposta ocorra, significa que ocorreu alguma falha durante o processo de autenticação da requisição. Motivos: token inválido ou token expirado. Exemplo:

```
{
    "err": "Invalid Token"
}
```

### POST /game

Responsável por cadastrar um novo game no banco de dados.

#### _Parâmetros_

"title": título do game.

"year": ano de lançamento do game.

"price": preço do game.

Exemplo:

```
{
    "title": "Need For Speed",
    "year": "1998",
    "price": "12" 
}
```

#### _Respostas_

- ##### Ok (200)

Caso essa resposta ocorra, o game foi cadastrado com sucesso no banco de dados. Exemplo:

```
OK
```

- ##### Bad Request (400)

Caso essa resposta ocorra, ocorreu algum erro de sintaxe no envio dos parâmetros. O erro será exibido no console. Exemplo:

```
{
    "title": "Need For Speed",
    "year": 1998
    "price": 12
}
```
```
SyntaxError: Unexpected string in JSON at position 57
    at JSON.parse (<anonymous>)
    at parse (C:\Users\erico\projetos\nodeJS\api-de-games\node_modules\body-parser\lib\types\json.js:89:19)
    at C:\Users\erico\projetos\nodeJS\api-de-games\node_modules\body-parser\lib\read.js:128:18
    at AsyncResource.runInAsyncScope (node:async_hooks:201:9)
    at invokeCallback (C:\Users\erico\projetos\nodeJS\api-de-games\node_modules\raw-body\index.js:231:16)
    at done (C:\Users\erico\projetos\nodeJS\api-de-games\node_modules\raw-body\index.js:220:7)
    at IncomingMessage.onEnd (C:\Users\erico\projetos\nodeJS\api-de-games\node_modules\raw-body\index.js:280:7)
    at IncomingMessage.emit (node:events:538:35)
    at endReadableNT (node:internal/streams/readable:1345:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
 ```

- ##### Unauthorized (401)

Caso essa resposta ocorra, significa que ocorreu alguma falha durante o processo de autenticação da requisição. Motivos: token inválido ou token expirado. Exemplo:

```
{
    "err": "Invalid Token"
}
```

### DELETE /game/:id





### POST /auth

Responsável por realizar o processo de login.

#### _Parâmetros_

"email": e-mail utilizado pelo usuário.

"password": senha utilizada pelo usuário.

Exemplo:

```
{
    "email": "dev.ericotoscano@gmail.com",
    "password": "12345"
}
```

#### _Respostas_

- ##### OK! 200

- ##### Falha na Autenticação! 401
