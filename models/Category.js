const pg = require('../helpers/connection/connection');
const fromResponse = require('../helpers/formResponse/formResponse');
const fs = require('fs');

const categoryModel = {
    getAllCategory: (req) => {
        const { limit = 10, page = 1 } = req.query
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * from categories LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, result) => {
                if (result.rows.length < 0) {
                    reject(fromResponse("Category not found", 404))
                }
                if (!err) {
                    resolve(fromResponse("Get all Categories success", 200, result.rows));
                } else {
                    reject(fromResponse("Get all Categories failed", 500));
                }
            }
            );
        });
    },

    addNewCategory: (request) => {
        return new Promise((resolve, reject) => {
            const { category_name } = request.body;
            const photos = request.file.filename;
            pg.query(`SELECT * FROM categories WHERE LOWER(category_name)='${category_name.toLowerCase()}'`, (error, result) => {
                if (!error) {
                    if (result.rows.length < 1) {
                        pg.query(`INSERT INTO categories(category_name,category_cover,created_at)
                                    VALUES('${category_name}', '/upload/category_cover/${photos}','now()') RETURNING *`, (err) => {
                            if (!err) {
                                resolve(fromResponse("Add category success", 200, result.rows[0]));
                            } else {
                                reject(fromResponse("Add category Failed", 500));
                            }
                        }
                        );
                    } else {
                        reject(fromResponse("Category exist", 400));
                    }
                } else {
                    reject(fromResponse("Add category failed", 500));
                }
            }
            );
        });
    },

    getCategoryById: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM categories WHERE id=${request}`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Category not found", 404));
                    } else {
                        resolve(fromResponse("Get category success", 200, result.rows[0]));
                    }
                } else {
                    reject(fromResponse("Get category failed", 500));
                }
            });
        });
    },

    getArticlesByCategoryId: (request) => {
        const { limit = 6, page = 1 } = request.query
        return new Promise((resolve, reject) => {
            pg.query(`SELECT category_name FROM categories WHERE id=${request.params.id}`, (error, res) => {
                if (!error) {
                    pg.query(`SELECT a.id, a.category_id, c.category_name, a.author_id, u.name, a.article_cover, a.article_title, a.article_cover, a.article_content, a.publish_date, a.created_at, a.updated_at
                      FROM articles as a JOIN users as u ON a.author_id = u.id JOIN categories as c 
                      ON a.category_id = c.id WHERE a.category_id = ${request.params.id} AND a.publish_date IS NOT NULL ORDER BY a.publish_date DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, result) => {
                        if (!err) {
                            if (result.rows.length < 1) {
                                reject(fromResponse("Article list not found", 404));
                            } else {
                                const category = { 
                                    name: res.rows[0].category_name
                                }
                                const data = {article: [...result.rows], category}
                                resolve(fromResponse("Get article list by category success", 200, data ));
                            }
                        } else {
                            reject(fromResponse("Get article list failed", 500));
                        }
                    });
                } else {
                    console.log(error)
                    reject(fromResponse("Get article list Failed", 500));
                }
            });
        });
    },

    getRecommendedArticlesByCategoryId: (request) => {
        const { limit = 1 } = request.query
        return new Promise((resolve, reject) => {
            pg.query(`SELECT a.id, a.category_id, c.category_name, a.author_id, u.name, a.article_cover, a.article_title, a.article_cover, a.article_content, a.publish_date, a.created_at, a.updated_at
                      FROM articles as a JOIN users as u ON a.author_id = u.id JOIN categories as c 
                      ON a.category_id = c.id WHERE a.category_id = ${request.params.id} AND a.publish_date IS NOT NULL ORDER BY a.publish_date DESC LIMIT ${limit}`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Recommended article not found", 404));
                    } else {
                        resolve(fromResponse("Get article recommended by category success", 200, result.rows));
                    }
                } else {
                    reject(fromResponse("Get article recommended failed", 500));
                }
            });
        });
    },

    deleteCategoryById: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM categories WHERE id=${request}`, (error, res) => {
                if (!error) {
                    if (res.rows.length < 1) {
                        reject(fromResponse("Category not found", 400));
                    } else {
                        pg.query(`DELETE FROM categories WHERE id=${request} RETURNING *`, (err, result) => {
                            if (!err) {
                                resolve(fromResponse('Delete category success', 200, result.rows[0]));
                            } else {
                                reject(fromResponse('Delete category failed', 500));
                            }
                        });
                    }
                } else {
                    reject(fromResponse('Delete category failed', 500));
                }
            });
        })
    },

    updateCategory: (req, res) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM categories WHERE id = '${req.params.id}'`, (error, result) => {
                if (result.rows == '' || result.rows.length < 1) {
                    reject(fromResponse("category id not found", 400));
                }
                if (!error) {
                    const file = req.file.filename ? `/upload/category_cover/${req.file.filename}` : result.rows[0].category_cover
                    const {
                        category_name = result.rows[0].category_name,
                    } = req.body
                    const { id } = req.params;
                    let newBody = { ...req.body, category_cover: file }
                    if (newBody.category_cover != result.rows[0].category_cover) {
                        fs.unlink(`./public${result.rows[0].category_cover}`, (err1) => {
                            if (!err1) {
                                console.log('successfully deleted local image')
                            } else {
                                console.log(`failed to deleted local image ${err1}`)
                            }
                        });
                        pg.query("UPDATE categories SET category_name=$1, category_cover=$2, updated_at=$3 WHERE id=$4 RETURNING *", [category_name, newBody.category_cover, 'NOW()', id], (err, response) => {
                            if (!err) {
                                resolve(fromResponse(`update category id ${id} success`, 200, response.rows[0]));
                            } else {
                                reject(fromResponse("update data failed", 500));
                            }
                        })
                    } else {
                        pg.query("UPDATE categories SET category_name=$1, category_cover=$2, updated_at=$3 WHERE id=$4 RETURNING *", [category_name, newBody.category_cover, 'NOW()', id], (err, response) => {
                            if (!err) {
                                resolve(fromResponse(`update category id ${id} success`, 200, response.rows[0]));
                            } else {
                                reject(fromResponse("update data failed", 500));
                            }
                        })
                    }
                } else {
                    reject(fromResponse("update data failed", 500));
                }
            })
        })
    },
};
module.exports = categoryModel;