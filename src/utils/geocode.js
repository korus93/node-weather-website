const request = require('request')
const geocode = (address, callback) => {
    const geoteg = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2dzZmhzZmc0NTI0NSIsImEiOiJjbGUxMnVqaW0wZDBmM25tdms2c2FnYTYyIn0.wqjVtIEx4hxrSrUVvq-c-g'

    request({ url: geoteg, json:true}, (error, {body}) => {
        if (error) {
             callback('No internet connection', undefined)
        } else if(body.features.length === 0) {
             callback('Location not exist', undefined)
        } else { callback(undefined, {
            lon: body.features[0].center[1],
            lat: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
})
}

module.exports = geocode