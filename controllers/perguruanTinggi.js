const axios = require('./axios');

exports.getPerguruanTinggi = (req, res, next) => {
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputPerguruanTinggi(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputPerguruanTinggi(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputPerguruanTinggi(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputPerguruanTinggi = (username, token, page, res, req) => {
  const resGetPerguruanTinggi = axios.getAllPerguruanTinggi(username, token, page);  
  resGetPerguruanTinggi.then(dataPerguruanTinggi => {
    let arr = [];
    Object.entries(dataPerguruanTinggi.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataPerguruanTinggi.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/perguruan-tinggi/index', {
      title: 'Setup PMB - Perguruan Tinggi',
      dataPerguruanTinggi: arr,
      data: [],
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}


exports.addPerguruanTinggi = (req, res, next) => {
  const data = [];
  data['PerguruanTinggiID'] = req.body.PerguruanTinggiID;
  data['Nama'] = req.body.Nama;
  data['SingkatanNama'] = req.body.SingkatanNama;
  data['Alamat1'] = req.body.Alamat1;
  data['Alamat2'] = req.body.Alamat2;
  data['Kota'] = req.body.Kota;
  data['KodePos'] = req.body.KodePos;
  data['JenisPerguruanTinggiID'] = req.body.JenisPerguruanTinggiID;
  data['Grup'] = req.body.Grup;
  data['Telephone'] = req.body.Telephone;
  data['Fax'] = req.body.Fax;
  data['Website'] = req.body.Website;
  data['Email'] = req.body.Email;
  data['Kontak'] = req.body.Kontak;
  data['JabatanKontak'] = req.body.JabatanKontak;
  data['HandphoneKontak'] = req.body.HandphoneKontak;
  data['EmailKontak'] = req.body.EmailKontak;
  data['NA']  = req.body.NA;
  const resPostForm = axios.addPerguruanTinggi(req.session.username, req.session.token, data);
  console.log(req.session.username);
  console.log(req.body.Y);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/perguruan-tinggi');
  }).catch(err => console.log(err))
};

exports.editPerguruanTinggi = (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  const data = [];
  data['Nama'] = req.body.Nama;
  data['SingkatanNama'] = req.body.SingkatanNama;
  data['Alamat1'] = req.body.Alamat1;
  data['Alamat2'] = req.body.Alamat2;
  data['Kota'] = req.body.Kota;
  data['KodePos'] = req.body.KodePos;
  data['JenisPerguruanTinggiID'] = req.body.JenisPerguruanTinggiID;
  data['Grup'] = req.body.Grup;
  data['Telephone'] = req.body.Telephone;
  data['Fax'] = req.body.Fax;
  data['Website'] = req.body.Website;
  data['Email'] = req.body.Email;
  data['Kontak'] = req.body.Kontak;
  data['JabatanKontak'] = req.body.JabatanKontak;
  data['HandphoneKontak'] = req.body.HandphoneKontak;
  data['EmailKontak'] = req.body.EmailKontak;
  data['NA']  = req.body.NA;
  const resPostForm = axios.editPerguruanTinggi(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/perguruan-tinggi');
  }).catch(err => console.log(err))
};

exports.deletePerguruanTinggi = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deletePerguruanTinggi(req.session.username, req.session.token, id);

  resDeleteForm.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/perguruan-tinggi');
  }).catch(err => console.log(err))
};


exports.addJenisSekolah = (req, res, next) => {
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
  const resPostForm = axios.addPerguruanTinggi(req.session.username, req.session.token, data);
  console.log(req.session.username);
  console.log(req.body.Y);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/jenis-sekolah');
  }).catch(err => console.log(err))
};

exports.editJenisSekolah = (req, res, next) => {
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
  const resPostForm = axios.editPerguruanTinggi(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/jenis-sekolah');
  }).catch(err => console.log(err))
};

exports.deleteJenisSekolah = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deletePerguruanTinggi(req.session.username, req.session.token, id);

  resDeleteForm.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/jenis-sekolah');
  }).catch(err => console.log(err))
};

// exports.getAddComment = (req, res, next) => {
//   res.render('comment/add-comment', {
//     pageTitle: 'Add Comment'
//   });
// };

// exports.postAddComment = (req, res, next) => {
//   const today = getCurrentDate();
//   const content = req.body.content;
//   const comment = new Comment({
//     date: today,
//     content,
//     userId: req.user._id
//   });
//   comment
//     .save()
//     .then(result => {
//       console.log(today, `Comment created. Date: ${today}. Content: ${content}`);
//       res.redirect('/display-comments');
//     })
//     .catch(err => handleError(err));
// };



// exports.getEditComment = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const commentId = req.params.commentId;
//   Comment.findById(commentId)
//     .then(comment => {
//       if (!comment) {
//         return res.redirect('/');
//       }
//       res.render('comment/edit-comment', {
//         pageTitle: 'Edit Comment',
//         editing: editMode,
//         comment
//       });
//     })
//     .catch(err => handleError(err));
// };

// exports.postEditComment = (req, res, next) => {
//   const today = getCurrentDate();
//   const commentId = req.body.commentId;
//   const updatedContent = req.body.content;
//   Comment.findById(commentId)
//     .then(comment => {
//       if (comment.userId.toString() !== req.user._id.toString()) {
//         return res.redirect('/');
//       }
//       comment.content = updatedContent;
//       comment.editDate = today;
//       return comment.save()
//         .then(result => {
//           console.log(today, `Comment edited. Edit Date: ${today}. Content: ${updatedContent}`);
//           res.redirect('/display-comments');
//         })
//         .catch(err => handleError(err));
//     })
//     .catch(err => handleError(err));
// };


// exports.postDeleteComment = (req, res, next) => {
//   const commentId = req.body.commentId;
//   Comment.deleteOne({
//       _id: commentId,
//       userId: req.user._id
//     })
//     .then(() => {
//       console.log(`Comment with id ${commentId} has been deleted.`);
//       res.redirect('/display-comments');      
//     })
//     .catch(err => handleError(err));
// };