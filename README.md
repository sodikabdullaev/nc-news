# NC NEWS

### Introduction

The web app is powered with REST API so that it can interact with different platforms. [PSQL][psql] is used as a database and [node-postgress][npl] to connect with. The aim of the project is to replicate news websites such as Reddit and etc. Testing is done with JEST and Supertest.

### Installation

You can fork or create a new branch from the main repository.

```
git clone https://github.com/sodikabdullaev/nc-news.git
```

Once cloned in your local machine run:

```
npm install
```

Create two `.test.env` and `.dev.env` files in the root folder. And write the database names in both files.

```
PGDATABASE=YOUR_DATABASE_NAME
```

```
PGDATABASE=YOUR_DATABASE_NAME_TEST
```

Some extra database and seeding settings can be found under `/db` folder.
Now we should setup our databses and seed them with test and dev data. The seeding data can be found under `/db/data`. Run the following script commands.

```
npm run setup-dbs
```

Once you get successfull message that databases are created now it is time to seed.

```
npm run seed
```

Supertest handles setting up server and running it, however you can find server settings in `/listen.js` file.
To run testing run:

```
npm run test
```

Under the `/__tests__` folder you can find already writen tests. Feel free to add your own.
To check all `API` please refer to `/endpoints.js` file. Alternatively when project is running you can use `/api` endpoint to get all available api list.

## DEMO

The database is stored in [ElephantSQL][esql] and the project is in [Render][rndr]

The live demo is available [here][prl]

## License

MIT

[//]: #
[npl]: https://node-postgres.com/
[psql]: https://www.postgresql.org/
[esql]: https://www.elephantsql.com/
[rndr]: https://render.com/

[prl]: [https://nc-news-4wkm.onrender.com/api]
