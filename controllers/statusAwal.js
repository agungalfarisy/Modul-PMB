const axios = require('./axios');

exports.getStatusAwal = (req, res, next) => {
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputStatusAwal(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputStatusAwal(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputStatusAwal(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputStatusAwal = (username, token, page, res, req) => {
  const resGetStatusAwal = axios.getStatusAwal(username, token, page);  
  resGetStatusAwal.then(dataStatusAwal => {
    let arr = [];
    Object.entries(dataStatusAwal.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataStatusAwal.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/status-awal/index', {
      title: 'Setup PMB - Status Awal',
      dataStatusAwal: arr,
      session: req.session,
      links: links,
      messageStatusAwal: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}


exports.addStatusAwal = (req, res, next) => {
  const data = [];
  data['id'] = req.body.id;
  data['nama'] = req.body.nama;
  data['beli_formulir'] = req.body.beli_formulir;
  data['jalur_khusus'] = req.body.jalur_khusus;
  data['tanpa_test'] = req.body.tanpa_test;
  data['catatan'] = req.body.catatan;
  data['NA'] = req.body.NA;
  const resPostForm = axios.addStatusAwal(req.session.username, req.session.token, data);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/status-awal');
  }).catch(err => console.log(err))
};

exports.editStatusAwal = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['nama'] = req.body.nama;
  data['beli_formulir'] = req.body.beli_formulir;
  data['jalur_khusus'] = req.body.jalur_khusus;
  data['tanpa_test'] = req.body.tanpa_test;
  data['catatan'] = req.body.ket;
  data['NA'] = req.body.NA;
  const resPostForm = axios.editStatusAwal(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/status-awal');
  }).catch(err => console.log(err))
};

exports.deleteStatusAwal = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deleteStatusAwal(req.session.username, req.session.token, id);

  resDeleteForm.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/status-awal');
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