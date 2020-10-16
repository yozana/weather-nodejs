const request = require('postman-request')

const geocode = (address, callback) => {

    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieW96YW5hIiwiYSI6ImNrZzhlNnhoaTBjczgycmxzZHFycm1zMGEifQ.eZ8ljnanaSBlCFf-S_j7Eg&language=he-IL&limit=1'
    request({url: mapboxUrl, json: true}, (error, response, body) => {            
        if (error) callback(error)
        else if (response.body.features.length === 0) callback("No data found!")
        else {
            callback(error,  {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0]
            } )
        }
        
    })
}

module.exports = geocode