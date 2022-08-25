# API de Games

API utilizada como parte dos estudos de criação de APIs REST em Node.JS. A API apresenta uma lista de jogos e suas informações básicas (título, ano de lançamento e preço), permitindo a edição destas informações.

## Endpoints

### GET /games

Responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### _Parâmetros_

Nenhum.

#### _Respostas_

- ##### Ok (200)

Caso essa resposta ocorra, você vai receber a listagem de todos os games. Exemplo:

```
[
    {
        "id": 1,
        "title": "Call of Duty: Modern Warfare",
        "year": 2019,
        "price": 40
    },
    {
        "id": 2,
        "title": "Formula One 2022",
        "year": 2022,
        "price": 80
    },
    {
        "id": 3,
        "title": "Super Mario Bros",
        "year": "1990",
        "price": "5"
    },
    {
        "id": 4,
        "title": "Super Monaco GP",
        "year": "1988",
        "price": "20"
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

- ##### Not found (404)

Caso essa resposta ocorra, não há game cadastrado no banco de dados com o valor numérico do parâmetro "id" informado na rota. Exemplo:

- ##### Ok (200)

Caso essa resposta ocorra, você vai receber as informações do game solicitado. Exemplo:

```
{
    "id": 1,
    "title": "Call of Duty: Modern Warfare",
    "year": 2019,
    "price": 40
}
```

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
