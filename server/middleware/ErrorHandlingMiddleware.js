const ApiError = require('../errors/ApiError')

module.exports = function(err, req, resp, next){
    if(err instanceof ApiError){
        return resp.status(err.status).json({message: err.message})
    }

    return resp.status(500).json({message: "Непредвиденная ошибка!!!"})
}