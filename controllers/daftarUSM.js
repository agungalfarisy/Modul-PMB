const axios = require('./axios');

exports.getDaftarUSM = (req, res, next) => {
    console.log(req.session.username);
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputDaftarUSMData(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputDaftarUSMData(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputDaftarUSMData(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputDaftarUSMData = (username, token, page, res, req) => {
  const resUSM = axios.getAllDaftarUSM(username, token, page);  
  resUSM.then(dataUSM => {
    let arr = [];
    Object.entries(dataUSM.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataUSM.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('daftar-usm/index', {
      title: 'Daftar Hadir USM',
      dataUSM: arr,
      session: req.session,
      links: links,
      messageUSM: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

exports.addDaftarUSM = (req, res, next) => {
  const data = [];
  data['npsn'] = req.body.npsn;
  data['nama_sekolah'] = req.body.nama_sekolah;
  data['alamat_sekolah'] = req.body.alamat_sekolah;
  data['desa_kel'] = req.body.desa_kel;
  data['kec'] = req.body.kec;
  data['kab_kota'] = req.body.kab_kota;
  data['provinsi'] = req.body.provinsi;
  data['email'] = req.body.email;
  data['no_telepon'] = req.body.no_telepon;
  data['status'] = req.body.status;
  const resPostForm = axios.addAsalSekolah(req.session.username, req.session.token, data);
  console.log(req.session.username);
  console.log(req.body.Y);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/daftar-usm');
  }).catch(err => console.log(err))
};

exports.editDaftarUSM = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['nama_sekolah'] = req.body.nama_sekolah;
  data['alamat_sekolah'] = req.body.alamat_sekolah;
  data['desa_kel'] = req.body.desa_kel;
  data['kec'] = req.body.kec;
  data['kab_kota'] = req.body.kab_kota;
  data['provinsi'] = req.body.provinsi;
  data['email'] = req.body.email;
  data['no_telepon'] = req.body.no_telepon;
  data['status'] = req.body.status;
  const resPostForm = axios.editAsalSekolah(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/daftar-usm');
  }).catch(err => console.log(err))
};

exports.deleteDaftarUSM = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deleteAsalSekolah(req.session.username, req.session.token, id);

  resDeleteForm.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/daftar-usm');
  }).catch(err => console.log(err))
};