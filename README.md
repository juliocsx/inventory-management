
# Gerenciamento de inventário

Uma aplicação para gerenciamento de inventário. No

## 🚀 Começando

Primeiro, obtenha uma cópia do projeto através do comando **git clone**. Depois disso, copie e cole o URL do projeto e clique enter.

```
$ git clone https://github.com/juliocsx/inventory-management.git
```

Agora abra o terminal de sua escolha no diretório onde o repositório foi baixado. Use o comando abaixo no diretório do projeto

```
docker-compose up -d
```

Acesse as aplicações através das portas 3306 (Banco MySQL), 3000 (API) e 4200 (Web App Angular).

O frontend **não está finalizado**.
## 📦 Lista de rotas

Na tabela abaixo você pode encontrar todas as rotas fornecidas pelo API. Acesse `http://localhost:3000/dev/api` + qualquer trecho da tabela abaixo.

Tipos de produto - Recebe o nome e o preço do produto

| Método | URL | Descrição |
| :--- | :--- | :--- |
| POST | `/product-types` | Criação de Tipo de produto |
| GET | `/product-types` | Procura todos os tipos de produto. É possível usar filtros de `id`, `describe` e `price` | 
| PUT | `/product-types/:id` | Edita um tipo de produto pelo `id`|
| DELETE | `/product-types:id` | Deleta um tipo de produto pelo `id` |

Produtos - Recebe a data de expiração, quantidade e id de um tipo de produto

| Método | URL | Descrição |
| :--- | :--- | :--- |
| POST | `/products` | Criação de produto |
| GET | `/products` | Procura todos os produtos. É possível usar filtros de `id`, `expiration_date`, `quantity` e `product_type_id` | 
| PUT | `/products/:id` | Edita um tipo de produto pelo `id`|
| DELETE | `/products/:id` | Deleta um tipo de produto pelo `id` |

## 🛠️ Construído com

Algumas das tecnologias utilizadas para criar esse projeto

* [NestJS](https://nestjs.com/)
* [Angular](https://angular.dev/)
* [Sequelize](https://sequelize.org/)
* [Docker](https://www.docker.com/)

---

