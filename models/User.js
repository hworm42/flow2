const Datastore = require('nedb');

    const User = new Datastore();

    User.loadDatabase();

    module.exports = User;
