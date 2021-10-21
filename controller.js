'use strict';

const response = require('./res');
const connection = require('./koneksi');
const e = require('express');

exports.index = function(req, res){
    response.ok('Apps REST API running', res);
}

// menampilkan semua data mahasiswa
exports.getAllMahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
}

// menampilkan data mhs berdasarkan id
exports.getMahasiswaId = function(req, res){
    let id = req.params.id
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields){
            if(error){
                connection.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    )
}