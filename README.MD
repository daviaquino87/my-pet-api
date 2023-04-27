<div align="center">
<img src='.github/img/image.jpg' style='align:center'>
<br>

## MyPet

Aplicação para gerenciamento de gastos do mês com meu pet

</div>

## Documentação da API

#### Adiciona uma Compra

```http
  POST /spending
```

| Parâmetro | Tipo    | Descrição                                                                                      |
| :-------- | :------ | :--------------------------------------------------------------------------------------------- |
| `price`   | `float` | **Obrigatório**. Valor da Compra                                                               |
| `date`    | `date`  | **opcional**. Data da sua compra (obs: se não for passado data, o valor padrão é a data atual) |

#### Retorna todas as compras

```http
  GET /spending
```

| Parâmetro | Tipo    | Descrição                                  |
| :-------- | :------ | :----------------------------------------- |
| `page`    | `query` | **Obrigatório**. Rota paginada em 10 items |

#### Atualizar uma compra

```http
  PUT /spendings/update/:{spendingId}
```

| Parâmetro    | Tipo    | Descrição                                                                                      |
| :----------- | :------ | :--------------------------------------------------------------------------------------------- |
| `spendingId` | `param` | **Obrigatório**. Id da compra a ser deleta                                                     |
| `price`      | `float` | **opcional**. Valor da Compra                                                                  |
| `date`       | `date`  | **opcional**. Data da sua compra (obs: se não for passado data, o valor padrão é a data atual) |

#### Deletar uma compra

```http
  DELETE /spendings/delete/:{spendingId}
```

| Parâmetro | Tipo | Descrição |

| - - | - - | **informativo**. Retorna a soma geral dos gastos |

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

PORT=

NODE_ENV=

JWT_PASS=

POSTGRESQL_USERNAME=

POSTGRESQL_PASSWORD=

POSTGRESQL_DATABASE=

DATABASE_URL=

## Referência

- [Node ->](https://docs.airplane.dev/?gclid=CjwKCAjwo_KXBhAaEiwA2RZ8hJmXoWmob1OH96oqMIgvjqHXFqZOur-vKIBaoElzdHtpRSgEi7E8ChoC2ckQAvD_BwE)

## Instalação

Importando e instalando dependências do projeto

```bash
  git clone https://github.com/daviaquino87/MyPet-API.git
```

```bash
 npm i
```

```bash
  npm run build:setup
```

```bash
  npx prisma migrate dev
```

```bash
  npm run start:dev
```
