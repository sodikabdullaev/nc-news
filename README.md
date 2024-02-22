# NC NEWS

### Introduction

The web app is powered with REST API so that it can interact with different platforms. [PSQL][psql] is used as a database and [node-postgress][npl] to connect with. The aim of the project is to replicate news websites such as Reddit etc. Testing is done with JEST and Supertest.

### Installation

You can fork or make a new branch from the main repository.

```
git clone https://github.com/sodikabdullaev/nc-news.git
```

Once cloned in your local environment run:

```
npm install
```

Create `.test.env` and `.dev.env` files in the root folder. And write the database name in both files.

```
PGDATABASE=YOUR_DATABASE_NAME
```

```
PGDATABASE=YOUR_DATABASE_NAME_TEST
```

Some extra database and seeding settings can be found under `/db` folder.
Now we should setup our databses and seed them with test and dev data. The seed data can be found under `/db/data`. Run the following script commands.

```
npm run setup-dbs
```

Once you get successfull message that databses are created now it is time to seed.

```
npm run seed
```

Supertest handles setting up server and running it, however you can find server settings in `/listen.js` file.
To run testing run:

```
npm run test
```

Under the `/__tests__` folder you can find writen tests. Feel free to add your own.
To check all `API` please refer to `/endpoints.js` file. You will find the list of endpoints.

## License

MIT

[//]: #
[npl]: https://node-postgres.com/
[psql]: https://www.postgresql.org/
