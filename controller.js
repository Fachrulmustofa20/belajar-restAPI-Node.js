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
            console.log(error);
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
                console.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    )
}

// menambahkan data mahasiswa
exports.addMahasiswa = function(req, res){
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?,?,?)', [nim, nama, jurusan], 
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok('Data mahasiswa berhasil ditambahkan', res);
            }
        });
}