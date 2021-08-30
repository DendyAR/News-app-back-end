# News-app-back-end
This is a ExpressJs-based API for [frontend project](https://github.com/DendyAR/News-app-front-end.git). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/DendyAR/News-app-back-end.git`
* `cd news-app-backend`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js` to start the local server

## Database

Open [database](https://drive.google.com/drive/folders/1ZudpwJK8P7ZcpjNFFodHQkYs13S3GNFa?usp=sharing)


## Folder Structure

    ├── controllers                    
    │   ├── Auth.js              
    │   ├── Articles.js              
    │   ├── Category.js             
    |   └── users.js
    ├── helpers
    │   ├── connection
    │   │   └── connection.js
    │   ├── fromResponse              
    │   │   └── fromResponse.js
    │   ├── formUpload
    │   │   └── fromUpload.js
    │   ├── query
    │   │   ├── queryAuth.js
    │   │   ├── queryArticles.js
    │   │   ├── queryCategory.js
    │   │   └── queryUser.js
    |   └── verifyToken.js
    ├── models
    │   ├── Articles.js              
    │   ├── Auth.js              
    │   ├── Category.js             
    |   └── User.js
    ├── routes
    │   ├── Articles.js              
    │   ├── Auth.js
    │   ├── index.js
    │   ├── Category.js             
    |   └── User.js
    └── app.js
    
## Endpoints
articles endpoint

    GET       /articles
    POST      /articles/add
    PATCH     /articles/update
    DELETE    /articles/delete/:id
    
auth endpoint

    POST     /auth/userRegister
    POST     /auth/userLogin
    
category endpoint

    GET       /category
    GET       /category/1
    POST      /category/add
    DELETE    /category/delete/1
    
user endpoint

    GET      /users
    PATCH    /users/:id
    GET      /users/search
    GET      /users/:id
    DELETE   /users/:id
    
when put under a domain with `prefix`, it would look like:

    https://www.example.com/news-app/api/users
# News-app-back-end
# news-app-back-end
# News-app-back-end
