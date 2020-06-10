const request = require('request')

const weather = (lat , longi , callback)=>{

    const url = 'https://api.darksky.net/forecast/e96a1e9b7700e4bd9b30743ee5b4fd08/'+lat+','+longi+'?units=si'

    request({url, json:true},(error,{body})=>{

        if(error)
        {
            callback('Unable To Connect Weather Services',undefined)
        }
        else if(body.error==0)
        {
            callback('Unable To Find Location',undefined)
        }

        else
        {
            callback(undefined,body)
            //body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. This high today is ' + body.daily.data[0].temperatureHigh +' with a low of '+ body.daily.data[0].temperatureLow +'. There is a '+body.currently.precipProbability*100+' % chance of rain'
        }

    })
}
    module.exports= weather