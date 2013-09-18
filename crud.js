var mongo = require('mongodb');

module.exports = function(conf) {

    var MongoClient = require('mongodb').MongoClient,
        BSON = mongo.BSONPure;

    // default conf
    var conf = conf || {};
    conf.uri = conf.uri || "mongodb://localhost:27017/test";
    conf.options = conf.options || {};
    console.log(JSON.stringify(conf));

    var self = this;
    // Connect to the db
    MongoClient.connect(conf.uri, conf.options, function(err, db) {
      if(!err) {
        console.log("Connected to " + conf.uri);
        self.db = db;
      }
    });

    var crud = {};
    crud.findById = function(req, res) {
        var col = req.params.col;
        var id = req.params.id;
        console.log('Retrieving ' + col + ': ' + id);
        self.db.collection(col, function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
                res.send(item);
            });
        });
    };

    crud.findAll = function(req, res) {
        var col = req.params.col;
        self.db.collection(col, function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.send(items);
            });
        });
    };

    crud.addData = function(req, res) {
        var col = req.params.col;
        var data = req.body;
        console.log('Adding ' + col + ': ' + JSON.stringify(data));
        self.db.collection(col, function(err, collection) {
            collection.insert(data, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        });
    }

    crud.updateData = function(req, res) {
        var col = req.params.col;
        var id = req.params.id;
        var data = req.body;
        console.log('Updating ' + col + ': ' + id);
        console.log(JSON.stringify(data));
        self.db.collection(col, function(err, collection) {
            collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error updating data: ' + err);
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    res.send(data);
                }
            });
        });
    }

    crud.deleteData = function(req, res) {
        var col = req.params.col;
        var id = req.params.id;
        console.log('Deleting ' + col + ': ' + id);
        self.db.collection('datas', function(err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred - ' + err});
                } else {
                    console.log('' + result + ' document(s) deleted');
                    res.send(req.body);
                }
            });
        });
    }

    return crud;

}
