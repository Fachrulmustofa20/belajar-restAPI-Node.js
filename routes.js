'use strict';

module.exports = function(app) {
    let json = require('./controller');

    app.route('/').get(json.index);

    app.route('/mahasiswa').get(json.getAllMahasiswa);
}