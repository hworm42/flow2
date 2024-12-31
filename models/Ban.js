const Datastore = require('nedb');

    const Ban = new Datastore();

    Ban.loadDatabase();

    module.exports = Ban;
