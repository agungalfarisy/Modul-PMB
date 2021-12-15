const axios = require('./axios');


// USM Prodi
exports.getUSMProdi = (req, res, next) => {
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
        inputUSMProdiData(username, token, '1', res, req)
      })
    }).catch(err => console.log(err))
  } else {  
    if (req.params.page) {
      inputUSMProdiData(req.session.username, req.session.token, req.params.page, res, req)
    } else {
      inputUSMProdiData(req.session.username, req.session.token, '1', res, req)
    }
  }
  
};

inputUSMProdiData = (username, token, page, res, req) => {
const resGetUsmProdi = axios.getUsmProdi(username, token, page);  
// console.log(resGetUsmProdi);
resGetUsmProdi.then(dataUSMProdi => {
  let arr = [];
  Object.entries(dataUSMProdi.result.data).forEach(([key, value]) => {
    arr[key] = value;
  }) 
  let links = [];
  Object.entries(dataUSMProdi.result.links).forEach(([key, value]) => {
    if (value != "pagination.next" || value != "pagination.previous") {
      links[key] = value;
    }
  })
  // console.log(dataUSMProdi.result.data);
  res.render('setup-pmb/usm-prodi/index', {
    title: 'Setup PMB - USM Prodi',
    dataUSMProdi: arr,
    data: [],
    session: req.session,
    links: links,
    messageUsmProdi: req.flash('message'),
    layout: '../views/layouts/templates'
  });
})
}

exports.addUSMProdi = (req, res, next) => {
const data = [];
data['ProdiUSMID'] = req.body.ProdiUSMID;
data['PMBUSMID'] = req.body.PMBUSMID;
data['PMBPeriodID'] = req.body.PMBPeriodID;
data['ProdiID'] = req.body.ProdiID;
data['TanggalUjian'] = req.body.TanggalUjian;
data['Urutan'] = req.body.Urutan;
data['RuangID'] = req.body.RuangID;
data['JumlahSoal'] = req.body.JumlahSoal;
const resPostForm = axios.addUsmProdi(req.session.username, req.session.token, data);
console.log(req.session.username);
console.log(req.body.Y);

resPostForm.then(dataForm => {
  req.flash('message', Object.values(dataForm)[1]);
  res.redirect('/setup-pmb/usm-prodi');
}).catch(err => console.log(err))
};

exports.editUSMProdi = (req, res, next) => {
const id = req.params.id;
const data = [];
data['PMBUSMID'] = req.body.PMBUSMID;
data['PMBPeriodID'] = req.body.PMBPeriodID;
data['ProdiID'] = req.body.ProdiID;
data['TanggalUjian'] = req.body.TanggalUjian;
data['Urutan'] = req.body.Urutan;
data['RuangID'] = req.body.RuangID;
data['JumlahSoal'] = req.body.JumlahSoal;
const resPostForm = axios.editUsmProdi(req.session.username, req.session.token, data, id);

resPostForm.then(dataForm => {
  req.flash('message', Object.values(dataForm)[1]);
  res.redirect('/setup-pmb/usm-prodi');
}).catch(err => console.log(err))
};

exports.deleteUSMProdi = (req, res, next) => {
const id = req.params.id;
const resDeleteUsmProdi = axios.deleteUsmProdi(req.session.username, req.session.token, id);

resDeleteUsmProdi.then(data => {
  req.flash('message', Object.values(data)[1]);
  res.redirect('/setup-pmb/usm-prodi');
}).catch(err => console.log(err))
};