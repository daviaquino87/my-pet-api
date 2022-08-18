

<div align="center">
<img src='./cache/img/image.jpg' style='align:center'>
<br>

## MyPet

Aplicação para gerenciamento de gastos do mês com meu pet
</div>



## Documentação da API

#### Adiciona uma Compra

```http
  POST /spending
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `price` | `float` | **Obrigatório**. Valor da Compra |
| `date` | `date` | **opciona**. Data da sua compra (obs: se não for passado data, o valor padrão é a data atual) |

#### Retorna todas as compras

```http
  GET /spending
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| - -     | - - | **listagem**. Retorna todas as compras feitas |

#### Retorna um balanço do valor compras

```http
  GET /balance
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| - -     | - - | **informativo**. Retorna a soma geral dos gastos |




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`URL`

`KEY`

`PORT`


## Referência

 - [Supabase -> ](https://supabase.com/docs)
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
  npm run dev
```
    
