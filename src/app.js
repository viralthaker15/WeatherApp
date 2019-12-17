const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const Weather = require('./utils/weather')
const app = express()

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
        message: 'this is some helpful text',
        title: 'Help !',
        name: 'Viral Thaker'
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
            res.send({
                forecast:forecastData,
                location,
                address
            })
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

app.listen(3000,()=>{
    console.log('THE SERVER IS UP AND RUNNING ON PORT 3000')
})

