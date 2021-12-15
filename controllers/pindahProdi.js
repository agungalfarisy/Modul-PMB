const axios = require('./axios');

exports.getPindahProdi = (req, res, next) => {
    if (typeof req.session.username === 'undefined') {
      const resClient = axios.postClientAPI();
      resClient.then(dataClient => {
        const token = dataClient.data.client.token;
        const resUser = axios.postLoginUser(token);
        req.session.token = token;
        resUser.then(dataUser => {
          const username = Object.values(dataUser)[2];
          req.session.username = username;
          inputPendaftaranForm(username, token, '1', res, req)
        })
      }).catch(err => console.log(err))
    } else {  
      if (req.params.page) {
        inputPindahProdi(req.session.username, req.session.token, req.params.page, res, req)
      } else {
        inputPindahProdi(req.session.username, req.session.token, '1', res, req)
      }
    }
    
};

inputPindahProdi = (username, token, page, res, req) => {
    res.render('pindah-prodi/index', {
      title: 'Pindah Program Studi',
      session: req.session,
      message: req.flash('message'),
      layout: '../views/layouts/templates'
    });
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