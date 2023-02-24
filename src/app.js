const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

//define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'created by Ruslan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'created by Ruslan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'created by Ruslan',
        title: 'Help page'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'plese enter address word'
        })
    }
    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lat, lon, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({ 
                address: location,
                forecastData
            })
        })
    })
    
    
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404'
    })
})
app.listen(3000, () => {
    console.log('Server running...')
})