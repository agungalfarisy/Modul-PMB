const axios = require('./axios');

exports.getUsmUmum = (req, res, next) => {
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputUsmUmum(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputUsmUmum(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputUsmUmum(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputUsmUmum = (username, token, page, res, req) => {
  const resGetForm = axios.getUsmUmum(username, token, page);  
  resGetForm.then(dataForm => {
    let arr = [];
    Object.entries(dataForm.result.data).forEach(([key, value]) => {
      arr[key] = value;
    }) 
    let links = [];
    Object.entries(dataForm.result.links).forEach(([key, value]) => {
      if (value != "pagination.next" || value != "pagination.previous") {
        links[key] = value;
      }
    })
    res.render('setup-pmb/usm-umum/index', {
      title: 'Setup PMB - USM Umum',
      dataForm: arr,
      data: [],
      session: req.session,
      links: links,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
  })
}

exports.addUsmUmum = (req, res, next) => {
  const data = [];
  data['ID'] = req.body.usmID;
  data['nama'] = req.body.namaUSM;
  data['Ruang'] = req.body.Ruang;
  data['NA'] = req.body.NA;
  const resPostForm = axios.addUsmUmum(req.session.username, req.session.token, data);
  console.log(req.session.username);
  console.log(req.body.Y);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/usm-umum');
  }).catch(err => console.log(err))
};

exports.editUsmUmum = (req, res, next) => {
  const id = req.params.id;
  const data = [];
  data['nama'] = req.body.namaUSM;
  data['Ruang'] = req.body.Ruang;
  data['NA'] = req.body.NA;
  const resPostForm = axios.editUsmUmum(req.session.username, req.session.token, data, id);

  resPostForm.then(dataForm => {
    req.flash('message', Object.values(dataForm)[1]);
    res.redirect('/setup-pmb/usm-umum');
  }).catch(err => console.log(err))
};

exports.deleteUsmUmum = (req, res, next) => {
  const id = req.params.id;
  const resDeleteForm = axios.deleteUsmUmum(req.session.username, req.session.token, id);

  resDeleteForm.then(data => {
    req.flash('message', Object.values(data)[1]);
    res.redirect('/setup-pmb/usm-umum');
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