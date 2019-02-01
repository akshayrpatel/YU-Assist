const request = require('request')
const config = require('../config.js')
const zlib = require('zlib');
const unzip = zlib.createGunzip();

exports.getTestPage = function() {
    var options = {
        method: 'GET',
        url: config.url.grades,
        headers: config.initial_headers,
        strictSSL: false,
        jar: true,
        gzip: true
    }
    return new Promise(function(resolve, reject){
        request(options, function(error, response, body){            
            if(error)
                reject(new Error('Request to get page failed!'))
            resolve(body)
        })
    })
}