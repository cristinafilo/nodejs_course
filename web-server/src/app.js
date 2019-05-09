const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for EXPRESS
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HBS engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cristina Filo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You have come the right way for help',
        title: 'help page',
        name: 'Cristina Filo'
    })
})


app.get('/etc', (req, res) => {
    res.send([
        {
            name:'Andrew'
        },{
            name: 'Cristina'
        }
    ])
})

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'about me',
       name: 'Cristina Filo' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMsg: 'Article not found',
        name: 'Cristina Filo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMsg: 'Page not found',
        name: 'Cristina Filo'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})