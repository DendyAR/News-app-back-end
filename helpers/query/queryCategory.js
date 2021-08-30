const queryCategory={
    getAll: (req)=>{
        const {limit = 10, page = 1} =req
        const query = `SELECT * FROM PUBLIC.category ORDER BY 'created_at' LIMIT '${limit}' OFFSET '${
            (page - 1) * limit}'`

        return query
    },
}

module.exports=queryCategory