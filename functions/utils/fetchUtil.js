const request = require('request')

exports.getPage = function(options) {
    return new Promise(function(resolve, reject){
        request(options, function(error, response, body){            
            if(error)
                reject(new Error('Request to get grades page failed!'))
            resolve(body)
        })
    })
}

// exports.getScheduleOptionsPage = function(options) {
//     return new Promise(function(resolve, reject){
//         request(options, function(error, response, body){            
//             if(error)
//                 reject(new Error('Request to get schedule page failed!'))
//             resolve(body)
//         })
//     })
// }

