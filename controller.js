'use strict';

const response = require('./res');
const connecttion = require('./koneksi');

exports.index = function(req, res){
    response.ok('Apps REST API running');
}