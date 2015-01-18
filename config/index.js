var mongoose = require('mongoose');

module.exports = {
	port: 8888,
	dbHost: 'mongodb://localhost:27017/lithe',
    auth : {
        ttl: 7 * 24 * 60 * 60
    },

	/**
     * establish a mongoose connection to the database
     * @method connectDB
     */
    connectDB : function () {
        if(mongoose.connection.readyState === 0){
            mongoose.connect(this.dbHost, {w:'majority', fsync:true, journal:true, debug:true});
        }
    }
};