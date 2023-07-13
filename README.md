<br/>
<p align="center">
  <h3 align="center">Web Wallet</h3>

  <p align="center">
    <a href="https://github.com/caiofsr/web-wallet"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
  </p>
</p>



## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Built With](#built-with)
  - [Data Modelling](#data-modelling)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Endpoints](#endpoints)
- [Author](#author)
- [Future Improvements](#future-improvements)

## Built With

Esse projeto foi feito com Node.js, NestJS, prisma e postgres. Utilizando da Arquitetura Limpa as pastas de `src` representam algumas camadas utilizadas nesse projeto.

### Data Modelling
<img src="images/data-modelling.png" alt="Logo">

## Getting Started

Para rodar o projeto localmente siga os próximos passos.

### Prerequisites

* npm

```sh
npm install npm@latest -g
```

* docker-compose (opcional)
Você pode usar uma instância do postgres já instalada no seu computador, só alterar as credencias nos arquivos locais

### Installation

1. Instale os pacotes do npm

```sh
npm install
```

2. Altere as variáveis de ambiente no arquivo `.env`. OBS: `DATABASE_URL` é o mais importante pois o prisma utiliza. As variáveis que começam com `DB_` são utilizada para criação da instância no docker com o docker-compose.
```ENV
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
DATABASE_URL=
```

3. Inicie o banco de dados com docker-compose
```sh
docker-compose up -d
```

4. Execute as migrations pelo prisma
```sh
npx prisma migrate dev
```

5. Após as migrations execute o seed do banco de dados
```sh
npx prisma db seed
```

6. Por fim inicie o servidor da API

```sh
npm run start:dev
```

* Para rodar os testes
  ```sh
  npm run tests
  ```

## Endpoints

* `[POST]` - http://localhost:{your_port}/offers?userId={user_id}
  * Acceptance body
  ```json
  {
    "quantity": integer,
    "walletCoinId": integer
  }
  ```
* `[GET]` - http://localhost:{your_port}/offers?page={actual_page}&limit={limit_offers_per_page}

* `[DELETE]` http://localhost:{your_port}/offers/{offer_id}?userId={user_id}


## Author

* **Caio Fernando** - *Software Engineer* - [Github](https://github.com/caiofsr)

## Future Improvements

* Aperfeiçoar o sistema para lidar de forma melhorada nome e o token das moedas no endpoint de listagem das ofertas.
* "Dockerizar" a aplicação inteira para eventuais escalonamentos com Kubernetes.
* Esclarecer a mensagem de erro do validator do endpoint de criar ofertas.
* Otimização das queries com adição de index em campos importantes
* Trocar a geração de id de sequencial para uuid
* Adicionar logging e telemetria

