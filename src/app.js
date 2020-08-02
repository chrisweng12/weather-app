const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Paths for express configuration
const publicDocPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory
app.use(express.static(publicDocPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chris Weng'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chris Weng',
        message: 'Hi, I am Chris. A linguist interested in programming.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Chris Weng',
        message: 'Hi, how can I help you?'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location!'
        })
    }

    geocode(req.query.address, (error,{longitude,latitude,place} = {}) => {
        if (error){
            return res.send({
                error:error
            })
        }

        forecast(longitude,latitude, (error,{weather, tempurature}) => {
            if (error){
                return res.send({
                    error: error
                })
            }

            res.send({
                place: place,
                weather: weather,
                tempurature: tempurature
            })
        })
    })
})


app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    })

})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Weng',
        errorMessage: 'Help info not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Weng',
        errorMessage: 'Page not found.'
    })
})


app.listen('3000', () => {
    console.log('Server is ready on port 3000.')
})
