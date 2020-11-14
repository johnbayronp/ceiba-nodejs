let knex= require('knex')({
    client:'mysql',
    connection:{ 
        host: 'localhost',
        user:'ceiba',
        password:'ceiba',
        database:'pruebaceiba'
    },
    debug: true
});

knex.raw('select 1+1 as result').catch(err => {
    //console.log("here:",err);
    process.exit(1);
});

let bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;