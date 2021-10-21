const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller register
exports.register = function(req, res){
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                let query = "INSERT INTO ?? SET ?";
                let table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok('Berhasil menambahkan data user baru', res);
                    }
                });
            }else{
                response.ok('Email sudah terdaftar!', res);
            }
        }
    })
}

// controller login
exports.login = function(req, res){
    let post = {
        email: req.body.email,
        password: req.body.password,
    }
    
    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user","password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                let token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 2400000 // dalam ms
                });
                id_user = rows[0].id_user;

                let data = {
                    id_user: id_user,
                    akses_token: token,
                    ip_address: ip.address()
                }

                let query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            succes: true,
                            message: 'Token JWT tergenerate!',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }else{
                res.json({
                     "Error": true,
                     "Message": "Email atau Password Salah",
                });
            }
        }
    })
}