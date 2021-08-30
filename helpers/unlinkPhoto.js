const fs = require('fs');

const unlinkPhoto = (filename) => {
    fs.unlink(`./public/${filename}`, (errUnlink) => {
        if (errUnlink) return console.log(`failed to deleted local image ${errUnlink}`)
        return console.log('successfully deleted local image')
    });
}
  
module.exports = unlinkPhoto;