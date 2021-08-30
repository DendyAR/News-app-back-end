const pg = require("../helpers/connection/connection");
const fromResponse = require("../helpers/formResponse/formResponse");
const fs = require("fs");

const articleModel = {
  getAllArticle: (req) => {
      return new Promise((resolve, reject) => {
        pg.query(`SELECT * from articles`, (err, result) => {
          if (result.rows.length < 0) {
            reject(fromResponse("Articles not found", 400));
          }
          if (!err) {
            resolve(fromResponse("Get all Articles success", 200, result.rows));
          } else {
            reject(fromResponse("Get all Articles failed", 500));
          }
        });
      });
  },

  addNewArticle: (request) => {
    return new Promise((resolve, reject) => {
        const { category_id, author_id, article_title, article_content, } = request.body;
        const photos = request.file.filename;
        pg.query(`SELECT * FROM articles WHERE LOWER(article_title)='${article_title.toLowerCase()}'`, (error, result) => {
          console.log(error,'model')  
          if (!error) {
                if (result.rows.length < 1) {
                    // let content = article_content
                    pg.query(`INSERT INTO articles(category_id,author_id,article_cover,article_title,article_content,status,created_at)
                                VALUES(,${category_id}, ${author_id}, '/upload/article_cover/${photos}', '${article_title}', '${article_content}', 'pending','now()') RETURNING *`, (err) => {
                        if (!err) {
                            resolve(fromResponse("Add article success", 200, result.rows[0]));
                        } else {
                            console.log(err,'bawah')
                            reject(fromResponse("Add article Failed", 500, result.rows[0]));
                        }
                    }
                    );
                } else {
                    reject(fromResponse("Article exist", 400));
                }
            } else {
                reject(fromResponse("Add article failed", 500));
            }
        }
        );
    });
  },

  getLatestArticle: (request) => {
    const { limit = 9, page = 1 } = request.query;
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE publish_date IS NOT NULL ORDER BY publish_date DESC LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        (err, result) => {
          if (!err) {
            if (result.rows.length < 1) {
              reject(fromResponse("Article not found", 400));
            } else {
              resolve(
                fromResponse("Get latest article success", 200, result.rows)
              );
            }
          } else {
            reject(fromResponse("Get latest article failed", 500));
          }
        }
      );
    });
  },

  getArticleSortByNameAsc: (request) => {
    const { limit = 20, page = 1 } = request.query;
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE publish_date IS NOT NULL ORDER BY article_title ASC LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        (err, result) => {
          if (!err) {
            if (result.rows.length < 1) {
              reject(fromResponse("Article not found", 400));
            } else {
              resolve(
                fromResponse(
                  "Get article sort by title asc success",
                  200,
                  result.rows
                )
              );
            }
          } else {
            reject(fromResponse("Get article sort by title asc failed", 500));
          }
        }
      );
    });
  },

  getArticleSortByNameDesc: (request) => {
    const { limit = 20, page = 1 } = request.query;
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE publish_date IS NOT NULL ORDER BY article_title DESC LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        (err, result) => {
          if (!err) {
            if (result.rows.length < 1) {
              reject(fromResponse("Article not found", 400));
            } else {
              resolve(
                fromResponse(
                  "Get article sort by title desc success",
                  200,
                  result.rows
                )
              );
            }
          } else {
            reject(fromResponse("Get article sort by title desc failed", 500));
          }
        }
      );
    });
  },

  getArticleSortByLastAdd: (request) => {
    const { limit = 1 } = request.query;
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE publish_date IS NOT NULL ORDER BY publish_date DESC LIMIT ${limit}`,
        (err, result) => {
          if (!err) {
            if (result.rows.length < 1) {
              reject(fromResponse("Article not found", 400));
            } else {
              resolve(
                fromResponse(
                  "Get article sort by last added success",
                  200,
                  result.rows
                )
              );
            }
          } else {
            reject(fromResponse("Get article sort by last added failed", 500));
          }
        }
      );
    });
  },

  getArticleSortBylastModif: (request) => {
    const { limit = 1 } = request.query;
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE publish_date IS NOT NULL ORDER BY updated_at DESC LIMIT ${limit}`,
        (err, result) => {
          if (!err) {
            if (result.rows.length < 1) {
              reject(fromResponse("Article not found", 400));
            } else {
              resolve(
                fromResponse(
                  "Get article sort by last modified success",
                  200,
                  result.rows
                )
              );
            }
          } else {
            reject(
              fromResponse("Get article sort by last modified failed", 500)
            );
          }
        }
      );
    });
  },

  deleteArticleById: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT * FROM articles WHERE id=${request}`, (error, res) => {
        if (!error) {
          if (res.rows.length < 1) {
            reject(fromResponse("Article not found", 400));
          } else {
            pg.query(
              `DELETE FROM articles WHERE id=${request} RETURNING *`,
              (err, result) => {
                if (!err) {
                  resolve(
                    fromResponse("Delete article success", 200, result.rows[0])
                  );
                } else {
                  reject(fromResponse("Delete article failed", 500));
                }
              }
            );
          }
        } else {
          reject(fromResponse("Delete article failed", 500));
        }
      });
    });
  },

  updateArticle: (req, res) => {
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE id = '${req.params.id}'`,
        (error, result) => {
          if (result.rows == "" || result.rows.length < 1) {
            reject(fromResponse("article id not found", 400));
          }
          if (!error) {
            const file = req.file.filename
              ? `/upload/article_cover/${req.file.filename}`
              : result.rows[0].article_cover;
            const {
              category_id = result.rows[0].category_id,
              author_id = result.rows[0].author_id,
              article_title = result.rows[0].article_title,
              article_content = result.rows[0].article_content,
              status = result.rows[0].status,
              // publish_date = result.rows[0]?.publish_date,
            } = req.body;
            const { id } = req.params;
            let newBody = {
              ...req.body,
              publish_date: result.rows[0].publish_date
                ? result.rows[0].publish_date
                : status == "accepted"
                ? "now()"
                : null,
              article_cover: file,
            };
            if (newBody.article_cover != result.rows[0].article_cover) {
              fs.unlink(`./public${result.rows[0].article_cover}`, (err1) => {
                if (!err1) {
                  console.log("successfully deleted local image");
                } else {
                  console.log(`failed to deleted local image ${err1}`);
                }
              });
              pg.query(
                "UPDATE articles SET category_id=$1, author_id=$2, article_cover=$3, article_title=$4, article_content=$5, status=$6, publish_date=$7, updated_at=$8 WHERE id=$9 RETURNING *",
                [
                  category_id,
                  author_id,
                  newBody.article_cover,
                  article_title,
                  article_content,
                  status,
                  newBody.publish_date,
                  "NOW()",
                  id,
                ],
                (err, response) => {
                  if (!err) {
                    if (
                      newBody.publish_date != result.rows[0].publish_date ||
                      newBody.publish_date != null
                    ) {
                      let iss_published = true;
                      pg.query(
                        `INSERT INTO notification_list(user_id,is_published,created_at,notif) VALUES(${author_id}, ${iss_published}, 'now()', 'Your article has been published')`,
                        (error1) => {
                          if (!error1) {
                            resolve(
                              fromResponse(
                                `update article id ${id} success`,
                                200,
                                response.rows[0]
                              )
                            );
                          } else {
                            reject(fromResponse("update data failed", 500));
                          }
                        }
                      );
                    } else {
                      resolve(
                        fromResponse(
                          `update article id ${id} success`,
                          200,
                          response.rows[0]
                        )
                      );
                    }
                  } else {
                    reject(fromResponse("update data failed", 500));
                  }
                }
              );
            } else {
              pg.query(
                "UPDATE articles SET category_id=$1, author_id=$2, article_cover=$3, article_title=$4, article_content=$5, status=$6, publish_date=$7, updated_at=$8 WHERE id=$9 RETURNING *",
                [
                  category_id,
                  author_id,
                  newBody.article_cover,
                  article_title,
                  article_content,
                  status,
                  newBody.publish_date,
                  "NOW()",
                  id,
                ],
                (err, response) => {
                  if (!err) {
                    if (
                      newBody.publish_date != result.rows[0].publish_date ||
                      newBody.publish_date != null
                    ) {
                      let iss_published = true;
                      pg.query(
                        `INSERT INTO notification_list(user_id,is_published,created_at,notif) VALUES(${author_id}, ${iss_published}, 'now()', 'Your article has been published')`,
                        (error1) => {
                          if (!error1) {
                            resolve(
                              fromResponse(
                                `update article id ${id} success`,
                                200,
                                response.rows[0]
                              )
                            );
                          } else {
                            reject(fromResponse("update data failed", 500));
                          }
                        }
                      );
                    } else {
                      resolve(
                        fromResponse(
                          `update article id ${id} success`,
                          200,
                          response.rows[0]
                        )
                      );
                    }
                  } else {
                    reject(fromResponse("update data failed", 500));
                  }
                }
              );
            }
          } else {
            reject(fromResponse("update data failed", 500));
          }
        }
      );
    });
  },

  searchArticleByTitle: (request) => {
    const { title, limit = 10, page = 1 } = request;
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM articles WHERE LOWER(article_title) LIKE '%${title.toLowerCase()}%' ORDER BY article_title ASC LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        (err, result) => {
          if (result.rows.length < 1) {
            reject(fromResponse("articles not found", 400));
          }
          if (!err) {
            resolve(
              fromResponse("Succses search articles by title", 200, result.rows)
            );
          } else {
            reject(fromResponse("Error occrous when searching articles", 500));
          }
        }
      );
    });
  },
};
module.exports = articleModel;
