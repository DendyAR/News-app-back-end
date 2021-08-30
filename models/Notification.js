const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/formResponse');

const notifModel = {
    getAllNotif: (req) => {
        const { limit = 10, page = 1 } = req.query
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * from notification_list LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, result) => {
                if (result.rows.length < 0) {
                    reject(fromResponse("notification not found", 400))
                }
                if (!err) {
                    resolve(fromResponse("Get all notification success", 200, result.rows));
                } else {
                    reject(fromResponse("Get all notification failed", 500));
                }
            }
            );
        });
    },

    getNotifById: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM notification_list WHERE id=${request}`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Notification not found", 400));
                    } else {
                        resolve(fromResponse("Get notification success", 200, result.rows[0]));
                    }
                } else {
                    reject(fromResponse("Get notification failed", 500));
                }
            });
        });
    },

    getNotifListByUserId: (request) => {
        return new Promise((resolve, reject) => {
            pg.query(`SELECT n.user_id, u.photo_profile, n.id, n.is_published, n.is_comment, n.is_liked, n.comment_from, n.created_at, n.notif FROM 
            notification_list as n JOIN users as u ON n.user_id = u.id WHERE n.user_id = ${request} 
            ORDER BY n.created_at DESC`, (err, result) => {
                if (!err) {
                    if (result.rows.length < 1) {
                        reject(fromResponse("Notification list by user id not found", 400));
                    } else {

                        resolve(fromResponse("Get Notification list by user id success", 200, result.rows));
                    }
                } else {
                    reject(fromResponse("Get Notification list by user id failed", 500));
                }
            });
        });
    },

    // getNotifListByUserId: (request) => {
    //     return new Promise((resolve, reject) => {
    //         pg.query(`SELECT n.user_id, n.id, n.is_published, n.is_comment, n.is_liked, n.comment_from, n.created_at, n.notif FROM 
    //         notification_list as n JOIN users as u ON n.user_id = u.id WHERE n.user_id = ${request} AND n.comment_from IS NULL
    //         ORDER BY n.created_at DESC`, (err, result) => {
    //             if (!err) {
    //                 pg.query(`SELECT n.user_id, n.id, n.is_published, n.is_comment, n.is_liked, n.comment_from, n.created_at, n.notif, s.name, s.photo_profile FROM 
    //                     notification_list as n JOIN users as u ON n.user_id = u.id JOIN users as s ON n.comment_from = s.id WHERE n.user_id = ${request} 
    //                     ORDER BY n.created_at DESC`, (error, res) => {
    //                     if (!error) {
    //                         if (res.rows.length < 1 && result.rows.length < 1) {
    //                             reject(fromResponse("Notification list by user id not found", 400));
    //                         } else {
    //                             const newData = {
    //                                 published: result.rows
    //                             }
    //                             const data = [...res.rows, newData]
    //                             resolve(fromResponse("Get Notification list by user id success", 200, data));
    //                         }
    //                     } else {
    //                         reject(fromResponse("Get Notification list by user id failed", 500));
    //                     }
    //                 });
    //             } else {
    //                 reject(fromResponse("Get Notification list by user id failed", 500));
    //             }
    //         });
    //     });
    // },

    deleteNotifById: (request) => {
        // console.log(typeof request.query.id)
        return new Promise((resolve, reject) => {
            pg.query(`SELECT * FROM notification_list WHERE id=${request.query.id}`, (error, res) => {
                if (!error) {
                    if (res.rows.length < 1) {
                        reject(fromResponse("Notification not found", 400));
                    } else {
                        pg.query(`DELETE FROM notification_list WHERE id=${request.query.id} RETURNING *`, (err, result) => {
                            if (!err) {
                                resolve(fromResponse('Delete Notification success', 200, result.rows[0]));
                            } else {
                                reject(fromResponse('Delete Notification failed', 500));
                            }
                        });
                    }
                } else {
                    reject(fromResponse('Delete Notification failed', 500));
                }
            });
            // }
            // else if(req.length > 1){
            //     let req2 = req.join(', ')
            //     pg.query(`SELECT * FROM notification_list WHERE id IN (${req2})`, (error, res) => {
            //         if (!error) {
            //             if (res.rows.length < 1) {
            //                 reject(fromResponse("Notification not found", 400));
            //             } else {
            //                 pg.query(`DELETE FROM notification_list WHERE id IN (${req2}) RETURNING *`, (err, result) => {
            //                     if (!err) {
            //                         resolve(fromResponse('Delete Notification success', 200, result.rows));
            //                     } else {
            //                         reject(fromResponse('Delete Notification failed', 500));
            //                     }
            //                 });
            //             }
            //         } else {
            //             reject(fromResponse('Delete Notification failed', 500));
            //         }
            //     });
            // }
        })
    },

};
module.exports = notifModel;