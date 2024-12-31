const Datastore = require('nedb');

    const DirectMessage = new Datastore();

    DirectMessage.loadDatabase();

    module.exports = DirectMessage;
