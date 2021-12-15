const axios = require('./axios');

exports.getAsalSekolah = (req, res, next) => {
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputAsalSekolah(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputAsalSekolah(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputAsalSekolah(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputAsalSekolah = (username, token, page, res, req) => {
  const resGetAsalSekolah = axios.getAsalSekolah(username, token, page);  
  resGetAsalSekolah.then(dataAsalSekolah => {
    let arr = [];
    Object.entries(dataAsalSekolah.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataAsalSekolah.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/asal-sekolah/index', {
      title: 'Setup PMB - Asal Sekolah',
      dataSekolah: arr,
      data: [],
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

exports.getJenisSekolah = (req, res, next) => {
  if (typeof req.session.username === 'undefined') {
    const resClient = axios.postClientAPI();
    resClient.then(dataClient => {
      const token = dataClient.data.client.token;
      const resUser = axios.postLoginUser(token);
      req.session.token = token;
      resUser.then(dataUser => {
        const username = Object.values(dataUser)[2];
        req.session.username = username;
        inputJenisSekolah(username, token, '1', res, req)
      })
    }).catch(err => console.log(err))
  } else {  
    if (req.params.page) {
      inputJenisSekolah(req.session.username, req.session.token, req.params.page, res, req)
    } else {
      inputJenisSekolah(req.session.username, req.session.token, '1', res, req)
    }
  }
  
};

inputJenisSekolah = (username, token, page, res, req) => {
const resGetJenisSekolah = axios.getJenisSekolah(username, token, page);  
resGetJenisSekolah.then(dataJenisSekolah => {
  let arr = [];
  Object.entries(dataJenisSekolah.result.data).forEach(([key, value]) => {
    arr[key] = value;
  }) 
  let links = [];
  Object.entries(dataJenisSekolah.result.links).forEach(([key, value]) => {
    if (value != "pagination.next" || value != "pagination.previous") {
      links[key] = value;
    }
  })
  res.render('setup-pmb/jenis-sekolah/index', {
    title: 'Setup PMB - Jenis Sekolah',
    dataSekolah: arr,
    data: [],
    session: req.session,
    links: links,
    message: req.flash('message'),
    layout: '../views/layouts/templates'
  });
})
}

exports.addAsalSekolah = (req, res, next) => {
  const data = [];
  data['npsn'] = req.body.npsn;
  data['nama_sekolah'] = req.body.nama_sekolah;
  data['alamat_sekolah'] = req.body.alamat_sekolah;
  data['kode_pos'] = req.body.kode_pos;
  data['js'] = req.body.js;
  data['kab_kota'] = req.body.kab_kota;
  data['fax'] = req.body.fax;
  data['email'] = req.body.email;
  data['no_telepon'] = req.body.no_telepon;
  data['status'] = req.body.status;
  data['web'] = req.body.web;
  data['kontak'] = req.body.kontak;
  data['jabatan_kontak'] = req.body.jabatan_kontak;
  data['hp_kontak'] = req.body.hp_kontak;
  data['email_kontak'] = req.body.email_kontak;
  const resPostForm = axios.addAsalSekolah(req.session.username, req.session.token, data);
  console.log(req.session.username);
  console.log(req.body.Y);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/asal-sekolah');
  }).catch(err => console.log(err))
};

exports.editAsalSekolah = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['nama_sekolah'] = req.body.nama_sekolah;
  data['alamat_sekolah'] = req.body.alamat_sekolah;
  data['kode_pos'] = req.body.kode_pos;
  data['js'] = req.body.js;
  data['kab_kota'] = req.body.kab_kota;
  data['fax'] = req.body.fax;
  data['email'] = req.body.email;
  data['no_telepon'] = req.body.no_telepon;
  data['status'] = req.body.status;
  data['web'] = req.body.web;
  data['kontak'] = req.body.kontak;
  data['jabatan_kontak'] = req.body.jabatan_kontak;
  data['hp_kontak'] = req.body.hp_kontak;
  data['email_kontak'] = req.body.email_kontak;
  const resPostForm = axios.editAsalSekolah(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/asal-sekolah');
  }).catch(err => console.log(err))
};

exports.deleteAsalSekolah = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deleteAsalSekolah(req.session.username, req.session.token, id);

  resDeleteForm.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/asal-sekolah');
  }).catch(err => console.log(err))
};


exports.addJenisSekolah = (req, res, next) => {
  const data = [];
  data['id'] = req.body.id;
  data['nama'] = req.body.nama;
  data['sg'] = req.body.sg;
  data['status'] = req.body.status;
  data['temp'] = req.body.temp;

  const resPostForm = axios.addJenisSekolah(req.session.username, req.session.token, data);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/jenis-sekolah');
  }).catch(err => console.log(err))
};

exports.editJenisSekolah = (req, res, next) => {
  const id = req.params.id;
  const data = [];

  data['nama'] = req.body.nama;
  data['sg'] = req.body.sg;
  data['status'] = req.body.status;
  data['temp'] = req.body.temp;
  const resPostForm = axios.editJenisSekolah(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/jenis-sekolah');
  }).catch(err => console.log(err))
};

exports.deleteJenisSekolah = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deleteJenisSekolah(req.session.username, req.session.token, id);

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