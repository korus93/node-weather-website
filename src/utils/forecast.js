const request = require('request')

const forecast = (longtitude, latitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=f37b515af901e3f1dae8e36896972785&query=${longtitude},${latitude}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Connection error', undefined)
        } else if (body.error) {
            callback('Error in coordinates', undefined)
            callback(body.error)
        } else {callback(undefined, {
                coord: body.request.query,
                metrics: body.request.unit,
                location: body.location.name,
            })
        } 
    })
}

module.exports = forecast