const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 5000

//Paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine Express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static directory pages
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yaniv',
        creditLink: 'https://connvisor.com',
        creditName: 'Connvisor Digital'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help',
        name: 'Yaniv',
        creditLink: 'https://connvisor.com',
        creditName: 'Connvisor Digital'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Yaniv',
        creditLink: 'https://connvisor.com',
        creditName: 'Connvisor Digital'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({
            statusCode: 400,
            errorMessage: "Address must be provided!"
        })
    }

    geocode(req.query.address, (error, response)=> {     
        if (error) return res.send({
            errorMessage: "Failed to get geocode. Details:",
            error
        })
        
        forecast(response.lat, response.long, (error, forecastResponse)=> {
                if (error) {
                    return res.send({
                        errorMessage: "Failed to get forecase",
                        error
                    })
                }
                
                res.send({
                    data: forecastResponse.body
                })
                
        })
        
    })

   
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        errorMessage: "Oh no! this help article is not found"
    })
})


app.get('*', (req, res) => {
    res.render('page404', {
        errorMessage: "Oh no! this article is not found"
    })

})

app.listen(port, () => {
    console.log("Server is up and running")
})