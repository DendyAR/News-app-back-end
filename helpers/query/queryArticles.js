const queryArticles = {
    getAllarticles:(req)=>{
        const {limit = 10, page = 1} =req
        const query = `SELECT * FROM PUBLIC.articles LIMIT '${limit}' OFFSET '${
            (page - 1) * limit}'`

        return query
    },
    
    addNewarticles:(request)=>{
        const {articles_title} =request
        const query =`SELECT * FROM articles WHERE articles_title='${articles_title}'`

        return query
    },
}
module.exports=queryArticles