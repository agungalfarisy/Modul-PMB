const axios = require('./axios');

exports.getKomponenUSM = (req, res, next) => {
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
          inputKomponenUSMData(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputKomponenUSMData(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputKomponenUSMData(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputKomponenUSMData = (username, token, page, res, req) => {
  const resGetKomponenUSM = axios.getAllKomponenUSM(username, token, page);  
  resGetKomponenUSM.then(dataKomponenUSM => {
    let arr = [];
    Object.entries(dataKomponenUSM.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataKomponenUSM.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/komponen-usm/index', {
      title: 'Setup PMB - KomponenUSM',
      dataKomponenUSM: arr,
      data: [],
      session: req.session,
      links: links,
      messageKomponenUSM: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

exports.addKomponenUSM = (req, res, next) => {
  const data = [];
  data['ID'] = req.body.usmID;
  data['nama'] = req.body.namaUSM;
  data['LMSName'] = req.body.LMSName;
  data['NA'] = req.body.NA;
  data['ket'] = req.body.ket;
  const resPostForm = axios.addKomponenUSM(req.session.username, req.session.token, data);
  console.log(req.session.username);
  console.log(req.body.Y);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/komponen-usm');
  }).catch(err => console.log(err))
};

exports.editKomponenUSM = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['nama'] = req.body.namaUSM;
  data['LMSName'] = req.body.LMSName;
  data['NA'] = req.body.NA;
  data['ket'] = req.body.ket;
  const resPostForm = axios.editKomponenUSM(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/komponen-usm');
  }).catch(err => console.log(err))
};

exports.deleteKomponenUSM = (req, res, next) => {
  const id = req.params.id;
  const resDeleteKomponenUSM = axios.deleteKomponenUSM(req.session.username, req.session.token, id);

  resDeleteKomponenUSM.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/komponen-usm');
  }).catch(err => console.log(err))
};

