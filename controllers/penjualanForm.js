const axios = require('./axios');

// Form Terjual
exports.getPenjualanForm = (req, res, next) => {
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputPenjualanForm(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputPenjualanForm(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputPenjualanForm(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputPenjualanForm = (username, token, page, res, req) => {
  const resGetPenjualanForm = axios.getAllFormulir(username, token, page); 
  resGetPenjualanForm.then(dataPenjualanForm => {
    let arr = [];
    Object.entries(dataPenjualanForm.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataPenjualanForm.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('penjualan-form/index', {
      title: 'Penjualan Form',
      dataPenjualanForm: arr,
      keyword: req.body.keyword,
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

// Jual Form
exports.getJualForm = (req, res, next) => {
  if (typeof req.session.username === 'undefined') {
    const resClient = axios.postClientAPI();
    resClient.then(dataClient => {
      const token = dataClient.data.client.token;
      const resUser = axios.postLoginUser(token);
      req.session.token = token;
      resUser.then(dataUser => {
        const username = Object.values(dataUser)[2];
        req.session.username = username;
        inputJualForm(username, token, '1', res, req)
      })
    }).catch(err => console.log(err))
  } else {  
    if (req.params.page) {
      inputJualForm(req.session.username, req.session.token, req.params.page, res, req)
    } else {
      inputJualForm(req.session.username, req.session.token, '1', res, req)
    }
  }
  
};

inputJualForm = (username, token, page, res, req) => {
  const resGetPenjualanForm = axios.getAllFormulir(username, token, page); 
  resGetPenjualanForm.then(dataPenjualanForm => {
    let arr = [];
    Object.entries(dataPenjualanForm.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataPenjualanForm.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('penjualan-form/jualform', {
      title: 'Penjualan Form',
      dataPenjualanForm: arr,
      keyword: req.body.keyword,
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

// Daftar Form
exports.getDaftarForm = (req, res, next) => {
  if (typeof req.session.username === 'undefined') {
    const resClient = axios.postClientAPI();
    resClient.then(dataClient => {
      const token = dataClient.data.client.token;
      const resUser = axios.postLoginUser(token);
      req.session.token = token;
      resUser.then(dataUser => {
        const username = Object.values(dataUser)[2];
        req.session.username = username;
        inputDaftarForm(username, token, '1', res, req)
      })
    }).catch(err => console.log(err))
  } else {  
    if (req.params.page) {
      inputDaftarForm(req.session.username, req.session.token, req.params.page, res, req)
    } else {
      inputDaftarForm(req.session.username, req.session.token, '1', res, req)
    }
  }
  
};

inputDaftarForm = (username, token, page, res, req) => {
  const resGetPenjualanForm = axios.getAllFormulir(username, token, page); 
  resGetPenjualanForm.then(dataPenjualanForm => {
    let arr = [];
    Object.entries(dataPenjualanForm.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataPenjualanForm.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('penjualan-form/daftarform', {
      title: 'Daftar Formulir',
      dataPenjualanForm: arr,
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

// edit Kwitansi
exports.getEditKwitansi = (req, res, next) => {
  if (typeof req.session.username === 'undefined') {
    const resClient = axios.postClientAPI();
    resClient.then(dataClient => {
      const token = dataClient.data.client.token;
      const resUser = axios.postLoginUser(token);
      req.session.token = token;
      resUser.then(dataUser => {
        const username = '000' + Object.values(dataUser)[2];
        req.session.username = username;
        inputEditKwitansi(username, token, '1', res, req)
      })
    }).catch(err => console.log(err))
  } else {  
    if (req.params.page) {
      inputEditKwitansi(req.session.username, req.session.token, req.params.page, res, req)
    } else {
      inputEditKwitansi(req.session.username, req.session.token, '1', res, req)
    }
  }
  
};

inputEditKwitansi = (username, token, page, res, req) => {
  const resGetPenjualanForm = axios.getAllFormulir(username, token, page); 
  resGetPenjualanForm.then(dataPenjualanForm => {
    let arr = [];
    Object.entries(dataPenjualanForm.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataPenjualanForm.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('penjualan-form/editkwitansi', {
      title: 'Edit Kwitansi',
      dataPenjualanForm: arr,
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

// inputFormData = (username, token, page, res, req) => {
//   const resGetForm = axios.getAllFormulir(username, token, page);  
//   resGetForm.then(dataForm => {
//     let arr = [];
//     Object.entries(dataForm.result.data).forEach(([key, value]) => {
//       arr[key] = value;
//     }) 
//     return arr;
//   })
// }

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