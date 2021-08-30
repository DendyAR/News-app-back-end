const hash = require('../helpers/hashPassword')

const getNewBodyfromUser = (req, result) => {
    const {
        email = result.rows[0].email,
        phone_number = result.rows[0].phone_number,
        about = result.rows[0].about,
        name = result.rows[0].name,
        username = result.rows[0].username,
        job = result.rows[0].job,
        is_author = result.rows[0].is_author,
        role = result.rows[0].role
    } = req.body

    const file = req.file.filename
        ? `/upload/photo_profile/${req.file.filename}`
        : result.rows[0].photo_profile

    if (req.body.password) {
        hash(req.body.password).then((value) => {
            let newBody = { ...req.body, password: value, photo_profile: file, id: req.params.id }
            const { password, photo_profile, id } = newBody
            return { email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id }
        })
    }
    let newBody = { ...req.body, password: result.rows[0].password, photo_profile: file, id: req.params.id }
    const { password, photo_profile, id } = newBody
    return { email, phone_number, about, name, username, job, is_author, role, password, photo_profile, id }
}

module.exports = getNewBodyfromUser;