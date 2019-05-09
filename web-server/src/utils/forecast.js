const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/fa18cceb8f3e085d2e729d1182357f52/' + lat + ',' + long + '?units=si'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        } else if(body.error ) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })  
}

module.exports = forecast