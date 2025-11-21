# GeoLens

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2C344B?logo=prisma&logoColor=white)](https://www.prisma.io/)

Aplicação web para gerenciamento de cidades, países e continentes, construída com **React, TypeScript, Express, Prisma e PostgreSQL**.  
Permite cadastro, edição, remoção e visualização de dados com interface moderna, responsiva e suporte a tema claro/escuro.

---

## Tecnologias

- **Frontend**: React, TypeScript, Vite, CSS Modules  
- **Backend**: Node.js, TypeScript, Express, Prisma  
- **Banco de dados**: PostgreSQL  
- **Design & UX**: Gradientes, temas dinâmicos, CSS Variables  

---

## APIs Externas

O GeoLens utiliza as seguintes APIs para obter informações geográficas e meteorológicas:

- [**OpenMeteo**](https://open-meteo.com/) – API de previsão do tempo para cidades  
- [**OpenMeteo Geocoding**](https://open-meteo.com/en/docs/geocoding-api) – API de geocodificação de cidades  
- [**REST Countries**](https://restcountries.com/) – API para informações sobre países, idiomas e moedas  

---

## Funcionalidades

- CRUD completo de **cidades, países e continentes**  
- Pesquisa e filtros  
- Tema claro e escuro alternável  
- Preenchimento automático de dados utilizando APIs externas  

---

## Requisitos

- **Node.js** => 22.15
- **npm** => 10.9  
- **PostgreSQL** = 16
- Navegador moderno (Chrome, Edge, Firefox)  

---

## Rodando o Backend

### 1. Criar o banco de dados PostgreSQL

**Linux:**

```bash
psql -U postgres
CREATE DATABASE geolens;
\q
```

**Windows:**

```powershell
psql -U postgres
CREATE DATABASE geolens;
\q
```

Substitua postgres pelo usuário do seu PostgreSQL, se necessário.

### 2. Configurar a variável de ambiente DATABASE_URL

**Linux:**

```bash
export DATABASE_URL="postgresql://usuario:senha@localhost:5432/geolens"
```

**Windows:**

```powershell
$env:DATABASE_URL="postgresql://usuario:senha@localhost:5432/geolens"
```

### 3. Instalar dependências do backend

```bash
cd backend
npm install
```

### 4. Aplicar as migrações do Prisma

```bash
npx prisma db push
```

Cria todas as tabelas definidas no schema do Prisma no banco de dados.

### 5. Rodar o backend
```bash
npm run dev
```

Servidor rodando em <http://localhost:3000>.

Rodando o Frontend

### 1. Instalar dependências
```bash
cd frontend
npm install
```

### 2. Rodar o frontend
```
npm run dev
```

Frontend disponível em <http://localhost:5173> (Vite).

## Autor

Desenvolvido por **Ygor Ruan Pereira** - [LinkedIn](https://www.linkedin.com/in/ygorrpereira) | [GitHub](https://github.com/YgorPereira)
