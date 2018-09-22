const request = require('request')

exports.getPage = function(options) {
    return new Promise(function(resolve, reject){
        request(options, function(error, response, body){            
            if(error)
                reject(new Error('Request to get page failed!'))
            resolve(body)
        })
    })
}

