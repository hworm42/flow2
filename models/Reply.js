const Datastore = require('nedb');

    const Reply = new Datastore();

    Reply.loadDatabase();

    module.exports = Reply;
