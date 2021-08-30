const pg = require('../helpers/connection/connection');
const fromResponse = require('../helpers/formResponse/formResponse');

const commentModel = {
    getAllComment: (req) => {
        const {limit=10, page=1} = req.query
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * from comments LIMIT ${limit} OFFSET ${(page-1) * limit}`, (err, result) => {
                if (result.rows.length < 0) {
                    reject(fromResponse("Comment not found", 400))
                }
                if (!err) {
                    resolve(fromResponse("Get all Comments success", 200, result.rows));
                } else {
                    reject(fromResponse("Get all Comments failed", 500));
                }
            }
            );
        });
    },

    addNewComment: (request) => {
        return new Promise((resolve, reject) => {
            const { sender_id, receiver_id, comment, article_id } = request.body;
            pg.query(`INSERT INTO comments(sender_id,receiver_id,comment,article_id,created_at)
                      VALUES(${sender_id},${receiver_id},'${comment}',${article_id},'now()') RETURNING*`, (err, result) => {
                if (!err) {
                    pg.query(`SELECT username FROM users WHERE id=${sender_id}`, (err1, res) => {
                        if(!err1){
                            let username = res.rows[0].username ? res.rows[0].username : 'anonim';
                            let iss_comment = true
                            pg.query(`INSERT INTO notification_list(user_id,is_comment,comment_from,created_at,notif)
                                    VALUES(${receiver_id},${iss_comment},${sender_id},'now()','${username} sent you a comment')`, (error) => {
                                if (!error) {
                                    resolve(fromResponse("Add comment success", 200, result.rows[0]));
                                } else {
                                    reject(fromResponse("Add comment Failed", 500));
                                }
                            });
                        }else{
                            reject(fromResponse("Add comment Failed", 500));
                        }
                    })
                } else {
                    reject(fromResponse("Add comment failed", 500));
                }
            });
        }
        );
    },

    getCommentById: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM comments WHERE id=${request}`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Comment not found", 400));
                    } else {
                        resolve(fromResponse("Get comment success", 200, result.rows[0]));
                    }
                } else {
                    reject(fromResponse("Get comment failed", 500));
                }
            });
        });
    },

    getCommentListByUserId: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT c.receiver_id, c.sender_id, u.name, u.username, u.photo_profile, c.article_id, c.comment, c.created_at 
            FROM comments as c JOIN users as u ON c.sender_id = u.id WHERE c.receiver_id = ${request} ORDER BY created_at DESC`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Comment list by user id not found", 400));
                    } else {
                        resolve(fromResponse("Get comment list by user id success", 200, result.rows));
                    }
                } else {
                    reject(fromResponse("Get comment list by user id failed", 500));
                }
            });
        });
    },

    getCommentListByArticleId: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT c.article_id, a.article_title, a.author_id, c.receiver_id, c.sender_id, u.name, u.username, u.photo_profile,
                    c.comment, c.created_at FROM comments as c JOIN users as u ON c.sender_id = u.id JOIN articles as a ON c.article_id = a.id 
                    WHERE c.article_id = ${request} ORDER BY created_at DESC`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Comment list by article id not found", 400));
                    } else {
                        resolve(fromResponse("Get comment list by article id success", 200, result.rows));
                    }
                } else {
                    reject(fromResponse("Get comment list by article id failed", 500));
                }
            });
        });
    },

    deleteCommentById: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM comments WHERE id=${request}`, (error, res) => {
                if (!error) {
                    if (res.rows.length < 1) {
                        reject(fromResponse("Comment not found", 400));
                    } else {
                        pg.query(`DELETE FROM comments WHERE id=${request} RETURNING *`, (err, result) => {
                            if (!err) {
                                resolve(fromResponse('Delete comment success', 200, result.rows[0]));
                            } else {
                                reject(fromResponse('Delete comment failed', 500));
                            }
                        });
                    }
                } else {
                    reject(fromResponse('Delete comment failed', 500));
                }
            });
        })
    },

    // updateCategory: (req, res) => {
    //     return new Promise((resolve, reject) => {
    //         pg.query(`SELECT * FROM categories WHERE id = '${req.params.id}'`, (error, result) => {
    //             if (result.rows == '' || result.rows.length < 1) {
    //                 reject(fromResponse("category id not found", 400));
    //             }
    //             if (!error) {
    //                 const file = req.file?.filename ? `/upload/category_cover/${req.file.filename}` : result.rows[0].category_cover
    //                 const {
    //                     category_name = result.rows[0]?.category_name,
    //                 } = req.body
    //                 const { id } = req.params;
    //                 let newBody = { ...req.body, category_cover: file }
    //                 if (newBody.category_cover != result.rows[0].category_cover) {
    //                     fs.unlink(`./public${result.rows[0].category_cover}`, (err1) => {
    //                         if (!err1) {
    //                             console.log('successfully deleted local image')
    //                         } else {
    //                             console.log(`failed to deleted local image ${err1}`)
    //                         }
    //                     });
    //                     pg.query("UPDATE categories SET category_name=$1, category_cover=$2, updated_at=$3 WHERE id=$4 RETURNING *", [category_name, newBody.category_cover, 'NOW()', id], (err, response) => {
    //                         if (!err) {
    //                             resolve(fromResponse(`update category id ${id} success`, 200, response.rows[0]));
    //                         } else {
    //                             reject(fromResponse("update data failed", 500));
    //                         }
    //                     })
    //                 } else {
    //                     pg.query("UPDATE categories SET category_name=$1, category_cover=$2, updated_at=$3 WHERE id=$4 RETURNING *", [category_name, newBody.category_cover, 'NOW()', id], (err, response) => {
    //                         if (!err) {
    //                             resolve(fromResponse(`update category id ${id} success`, 200, response.rows[0]));
    //                         } else {
    //                             reject(fromResponse("update data failed", 500));
    //                         }
    //                     })
    //                 }
    //             } else {
    //                 reject(fromResponse("update data failed", 500));
    //             }
    //         })
    //     })
    // },
};
module.exports = commentModel;