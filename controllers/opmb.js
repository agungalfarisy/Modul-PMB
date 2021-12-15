const axios = require('./axios');

exports.getOpmb = (req, res, next) => {
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
          inputOpmbData(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputOpmbData(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputOpmbData(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputOpmbData = (username, token, page, res, req) => {
  const resGetOpmb = axios.getAllOpmb(username, token, page);  
  resGetOpmb.then(dataOpmb => {
    let arr = [];
    Object.entries(dataOpmb.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataOpmb.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/opmb/index', {
      title: 'Setup PMB - OPMB',
      dataOpmb: arr,
      data: [],
      session: req.session,
      links: links,
      messageOpmb: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

exports.addOpmb = (req, res, next) => {
  const data = [];
  data['Tahun'] = req.body.Tahun;
  data['KodeID'] = 'demo';
  data['Nama'] = req.body.Nama;
  data['Tempat'] = req.body.Tempat;
  data['PerKelompok'] = req.body.PerKelompok;
  data['Kelompok'] = req.body.Kelompok;
  data['WaktuMulai'] = req.body.WaktuMulai;
  data['WaktuSelesai'] = req.body.WaktuSelesai;
  data['NA'] = req.body.NA;
  const resPostPeriode = axios.addOpmb(req.session.username, req.session.token, data);
  console.log(req.body.NA);

  resPostPeriode.then(dataPeriode => {
    req.flash('message', Object.values(dataPeriode)[1]);
    res.redirect('/setup-pmb/opmb');
  }).catch(err => console.log(err))
};

exports.editOpmb = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['Tahun'] = req.body.Tahun;
  data['KodeID'] = 'demo';
  data['Nama'] = req.body.Nama;
  data['Tempat'] = req.body.Tempat;
  data['PerKelompok'] = req.body.PerKelompok;
  data['Kelompok'] = req.body.Kelompok;
  data['WaktuMulai'] = req.body.WaktuMulai;
  data['WaktuSelesai'] = req.body.WaktuSelesai;
  data['NA'] = req.body.NA;
  const resPostForm = axios.editOpmb(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/opmb');
  }).catch(err => console.log(err))
};

exports.deleteOpmb = (req, res, next) => {
  const id = req.params.id;
  const resDeleteOpmb = axios.deleteOpmb(req.session.username, req.session.token, id);

  resDeleteOpmb.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/opmb');
  }).catch(err => console.log(err))
};