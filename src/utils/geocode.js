const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2VuZ3dlaWNoZW5nIiwiYSI6ImNrYzV2eHhlaTBsdXkyeW1zYjlheWlwMXoifQ.rQ7xWXa12jPDSGx3rp1TiA&limit=1'
    request({url, json: true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to the service... ', undefined)
        } else if (body.features[0] === undefined){
            callback('Please enter the proper place name... ', undefined)
        } else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}    

module.exports = geocode