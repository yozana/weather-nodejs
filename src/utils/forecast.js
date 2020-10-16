const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5a6247162f963b38df7f2867c0c24638&query=' + lat + "," + long

    request({url: url, json: true}, (error, response) => {    
        if (error){
            callback("An error occured")        
        } else {
            callback(error, response)
        }
    })
}

module.exports = forecast

