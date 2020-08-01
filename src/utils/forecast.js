const request = require("request")

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b51c0ae689ddbfcc3755e283b163edab&query=' + latitude + ',' + longitude 
    request({url,json:true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to service...',undefined)
        } else if (body.error) {
            callback(body.error.info,undefined)
        } else {
            callback(undefined, {
                weather: body.current.weather_descriptions[0],
                tempurature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}


module.exports = forecast