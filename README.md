# Aplicativo de Biblioteca Pessoal

## Proposta

Construir uma aplicação fullstack capaz de exibir uma lista de livros cadastrados, cadastrar novos livros, buscar por livro cadastrado, e exibir detalhes de um livro selecionado.

## Ferramentas Utilizadas

- Expo
- React Hook Form
- Express.js
- MongoDB
- Mongoose

## Links públicos

- Web App: https://fullstack-challenge-1.juliano988.repl.co/
- API: https://fullstack-challenge.juliano988.repl.co/
- APK Download: https://github.com/juliano988/fullstack-challenge/raw/master/apk/BookApp.apk

![APK Download](https://github.com/juliano988/fullstack-challenge/blob/master/assets/app_qr_code.PNG?raw=true)

## Utilização Local

1. Atualizar a constante `DB_URI` contida no arquivo `.env` com a URI de acesso ao banco de dados MongoDB

2. Executar o seguinte comando via terminal na raiz do diretório do projeto:

```node
yarn
node server
```

3. Atualizar a constante `API_DOMAIN` contida no arquivo `App.tsx` com o domínio da API
    - Ex.: `http://localhost:3000`

4. Executar os seguintes comandos via terminal na raiz do diretório do projeto:

```node
expo build:web
npx serve web-build
```

## Rotas da API

- `GET - https://fullstack-challenge.juliano988.repl.co/api/list-books`
    - Retorna os livros contidos no banco de dados
    - Parâmetros:
      - `p` - Parâmetro de paginação que recebe um número inteiro correspondente a pagina desejada
      - `q` - Parâmetro de busca contendo o título do livro, subtitulo, ou autor que deseja buscar

- `POST - https://fullstack-challenge.juliano988.repl.co/api/insert-book`
    - Insere um novo livro no banco de dados
    - Parâmetros:
      - Objeto contendo as informações do livro que deseja salvar:
        - `title` - Titulo do livro
        - `subtitle` - Subtitulo do livro
        - `author` - Autor do livro
        - `description` - Descrição do livro
        - `cover` - Imagem da capa do livro em base64

## Detalhes de desenvolvimento

- 09/06 - 6 horas
- 10/06 - 11 horas
- 11/06 - 11 horas
- 12/06 - 7 horas
- 13/06 - 10 horas
- 14/06 - 7 horas

Total aproximado de horas de desenvolvimento: 52