'use strict';

module.exports = function(app) {
    let json = require('./controller');

    app.route('/').get(json.index);

    app.route('/tampil').get(json.getAllMahasiswa);

    app.route('/tampil/:id').get(json.getMahasiswaId);
}

