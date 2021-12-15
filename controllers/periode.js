const axios = require('./axios');

exports.getPeriode = (req, res, next) => {
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
          inputPeriodeData(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputPeriodeData(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputPeriodeData(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputPeriodeData = (username, token, page, res, req) => {
  const resGetPeriode = axios.getAllPeriode(username, token, page);  
  resGetPeriode.then(dataPeriode => {
    let arr = [];
    Object.entries(dataPeriode.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataPeriode.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/periode/index', {
      title: 'Setup PMB - Periode',
      dataPeriode: arr,
      data: [],
      session: req.session,
      links: links,
      messagePeriode: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

exports.addPeriode = (req, res, next) => {
  const data = [];
  data['kodeP'] = req.body.kodeP;
  data['namaP'] = req.body.namaP;
  data['nap'] = req.body.NAP;
  data['tglMulai'] = req.body.tglMulai;
  data['tglSelesai'] = req.body.tglSelesai;
  data['waktuSelesaiOnline'] = req.body.tglSelesai;
  data['ujianMulai'] = req.body.ujianMulai;
  data['ujianSelesai'] = req.body.ujianSelesai;
  data['jamUjianMulai'] = '07:00:00';
  data['jamUjianSelesai'] = '08:00:00';
  data['pMulai'] = req.body.pMulai;
  data['pSelesai'] = req.body.pSelesai;
  data['bayarMulai'] = req.body.bayarMulai;
  data['bayarSelesai'] = req.body.bayarSelesai;
  data['tBayarProdi'] = req.body.tBayarProdi;
  data['noP'] = req.body.noP;
  data['noSuket'] = req.body.noSuket;
  console.log(req.session.username)
  const resPostPeriode = axios.addPeriode(req.session.username, req.session.token, data);
  console.log(req.body.NAP);

  resPostPeriode.then(dataPeriode => {
    req.flash('message', Object.values(dataPeriode)[1]);
    res.redirect('/setup-pmb/periode');
  }).catch(err => console.log(err))
};

exports.editPeriode = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['namaP'] = req.body.namaP;
  data['nap'] = req.body.NAP;
  data['tglMulai'] = req.body.tglMulai;
  data['tglSelesai'] = req.body.tglSelesai;
  data['waktuSelesaiOnline'] = req.body.tglSelesai;
  data['ujianMulai'] = req.body.ujianMulai;
  data['ujianSelesai'] = req.body.ujianSelesai;
  data['jamUjianMulai'] = '07:00:00';
  data['jamUjianSelesai'] = '08:00:00';
  data['pMulai'] = req.body.pMulai;
  data['pSelesai'] = req.body.pSelesai;
  data['bayarMulai'] = req.body.bayarMulai;
  data['bayarSelesai'] = req.body.bayarSelesai;
  data['tBayarProdi'] = req.body.tBayarProdi;
  data['noP'] = req.body.noP;
  data['noSuket'] = req.body.noSuket;
  const resPostForm = axios.editPeriode(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/periode');
  }).catch(err => console.log(err))
};

exports.deletePeriode = (req, res, next) => {
  const id = req.params.id;
  const resDeletePeriode = axios.deletePeriode(req.session.username, req.session.token, id);

  resDeletePeriode.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/periode');
  }).catch(err => console.log(err))
};