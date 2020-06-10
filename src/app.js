const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const Weather = require('./utils/weather')


const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
77

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Viral Thaker'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Viral Thaker'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help !',
        name: 'Viral Thaker'
    })

})

app.get('/weatherLoc' ,(req,res) => {

    const lattitude = req.query.lati
    const longitude = req.query.longi

    Weather(lattitude,longitude,(error,forecastData)=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({forecastData})
    })
})

app.get('/weather',(req,res) =>{

    const address = req.query.address
    if(!address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(address,(error,{lattitude, longitude , location} = {} )=>{
 
        if(error)
        {
            return res.send({error})
        }
    
        Weather(lattitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({location , forecastData})
        })
    
    })
})

app.get('/help/*' , (req, res) => {
    res.render('404error',{
        error:'Help article not found',
        name:'Viral Thaker',
        title:'ERROR 404 !'
    })
})

app.get('*',(req, res) =>{
    res.render('404error',{
        error:'Page not found',
        name:'Viral Thaker',
        title:'ERROR 404 !'
    })
})

app.listen(port,()=>{
    console.log('THE SERVER IS UP AND RUNNING ON PORT '+port)
})

