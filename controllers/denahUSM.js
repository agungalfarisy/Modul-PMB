const axios = require('./axios');

exports.getDenahUSM = (req, res, next) => {
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
          inputDenahUSMData(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputDenahUSMData(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputDenahUSMData(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputDenahUSMData = (username, token, page, res, req) => {
  const resDenahUSM = axios.getAllDenahUSM(username, token, page);  
  resDenahUSM.then(dataUSM => {
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
    res.render('denah-usm/index', {
      title: 'Denah Tempat Duduk USM',
      dataUSM: arr,
      session: req.session,
      links: links,
      messageUSM: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

// exports.addPeriode = (req, res, next) => {
//   const data = [];
//   data['kodeP'] = req.body.kodeP;
//   data['namaP'] = req.body.namaP;
//   if (req.body.NAP == 'Y') {
//     data['nap'] = 'Y';
//   } else {
//     data['nap'] = 'N';
//   }
//   data['tglMulai'] = req.body.tglMulai;
//   data['tglSelesai'] = req.body.tglSelesai;
//   data['waktuSelesaiOnline'] = req.body.tglSelesai;
//   data['ujianMulai'] = req.body.ujianMulai;
//   data['ujianSelesai'] = req.body.ujianSelesai;
//   data['jamUjianMulai'] = '07:00:00';
//   data['jamUjianSelesai'] = '08:00:00';
//   data['pMulai'] = req.body.pMulai;
//   data['pSelesai'] = req.body.pSelesai;
//   data['bayarMulai'] = req.body.bayarMulai;
//   data['bayarSelesai'] = req.body.bayarSelesai;
//   data['tBayarProdi'] = req.body.tBayarProdi;
//   data['noP'] = req.body.noP;
//   data['noSuket'] = req.body.noSuket;
//   const resPostPeriode = axios.addPeriode(req.session.username, req.session.token, data);
//   console.log(req.body.NAP);

//   resPostPeriode.then(dataPeriode => {
//     req.flash('message', Object.values(dataPeriode)[1]);
//     res.redirect('/setup-pmb/periode');
//   }).catch(err => console.log(err))
// };

// exports.editPmbForm = (req, res, next) => {
//   const id = req.params.id;
//   const data = [];
//   data['nama'] = req.body.nama;
//   data['jmlPilihan'] = req.body.jmlPilihan;
//   data['harga'] = req.body.harga;
//   data['NA'] = req.body.NA;
//   data['ket'] = req.body.ket;
//   data['hanyaProdi1'] = req.body.hanyaProdi1;
//   data['kecualiProdi1'] = req.body.kecualiProdi1;
//   data['hanyaProdi2'] = req.body.hanyaProdi2;
//   data['kecualiProdi2'] = req.body.kecualiProdi2;
//   data['hanyaProdi3'] = req.body.hanyaProdi3;
//   data['kecualiProdi3'] = req.body.kecualiProdi3;
//   const resPostForm = axios.editFormulir(session_store.username, session_store.token, data, id);

//   resPostForm.then(dataForm => {
//     req.flash('message', Object.values(dataForm)[1]);
//     res.redirect('/setup-pmb');
//   }).catch(err => console.log(err))
// };

// exports.deleteKomponenUSM = (req, res, next) => {
//   const id = req.params.id;
//   const resDeleteKomponenUSM = axios.deleteKomponenUSM(req.session.username, req.session.token, id);

//   resDeleteKomponenUSM.then(data => {
//     req.flash('message', Object.values(data)[1]);
//     res.redirect('/setup-pmb/komponen-usm');
//   }).catch(err => console.log(err))
// };