'use strict';

module.exports = function(app) {
    let json = require('./controller');

    app.route('/').get(json.index);

    app.route('/mahasiswa').get(json.getAllMahasiswa);

    app.route('/mahasiswa/:id').get(json.getMahasiswaId);

    app.route('/mahasiswa').post(json.addMahasiswa);
}

