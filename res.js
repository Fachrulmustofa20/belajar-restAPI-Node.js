'use strict';

exports.ok = function(values, res){
    let data = {
        'status': 200,
        'values': values
    };
    res.json(data);
    res.end();
}

// response untuk nested matakuliah
exports.nested = function(value, res){
    // lakukan akumulasi
    const result = value.reduce((akumulasikan, item)=> {
        // lakukan key group
        if(akumulasikan[item.nama]){
            // buat variabel grup nama mhs
            const group = akumulasikan[item.nama];
            // cek array adalah matkul
            if(Array.isArray(group.matakuliah)){
                // tambahkan value ke dalam group matkul
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        }else{
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    let data = {
        'status': 200,
        'values': result
    };
     res.json(data);
     res.end();
}