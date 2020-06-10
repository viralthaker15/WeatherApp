const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const locButton = document.querySelector('#locButton')
const imgplace = document.querySelector("#left-box")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //which does not let html refresh the page

            const location = search.value
            messageOne.textContent = 'Loading .....'
            messageTwo.textContent = ''
            messageThree.textContent = ''
            messageFour.textContent = ''
 
            fetch('/weather?address=' + location).then((response) => {
                response.json().then((data) => {
                    if(data.error)
                    {
                        messageOne.textContent = data.error
                        messageTwo.textContent = ':('
                        messageThree.textContent = ':('
                        messageFour.textContent = ':('
                    }
                    else
                    {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecastData.currently.temperature+'°'
                        messageThree.textContent = parseInt(data.forecastData.currently.humidity*100)+'%'
                        messageFour.textContent = parseInt(data.forecastData.currently.precipProbability*100)+'%'
    
            
                    //add image to div tag
    
                        if(parseInt(data.forecastData.currently.precipProbability*100)>=50)                          // rain
                            imgplace.innerHTML = "<img src='/img/rainy.png' width='300' height='300'>"
        
    
                        else if(data.forecastData.currently.cloudCover >= 0.4)                                      // cloudy
                            imgplace.innerHTML = "<img src='/img/cloudy.png' width='300' height='300'>"
            
    
                        else                                                                                         // sunny
                            imgplace.innerHTML = "<img src='/img/sunny.png' width='300' height='300'>"
            
                    }
                }) 
            })
})

locButton.addEventListener('click' , (e) => {
    messageOne.textContent = 'Loading .....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    if(!navigator.geolocation)
        return alert('Geolocation is not available')

    navigator.geolocation.getCurrentPosition( (position) => {
        const data = {
            latitude : position.coords.latitude ,
            longitude : position.coords.longitude
        }

        fetch('/weatherLoc?lati='+data.latitude+'&longi='+data.longitude).then( (response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ':('
                    messageThree.textContent = ':('
                    messageFour.textContent = ':('
                }
                else
                {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecastData.currently.temperature+'°'
                    messageThree.textContent = parseInt(data.forecastData.currently.humidity*100)+'%'
                    messageFour.textContent = parseInt(data.forecastData.currently.precipProbability*100)+'%'
    
            
                //add image to div tag
    
                    if(parseInt(data.forecastData.currently.precipProbability*100)>=50)                          // rain
                        imgplace.innerHTML = "<img src='/img/rainy.png' width='300' height='300'>"
        
    
                    else if(data.forecastData.currently.cloudCover >= 0.4)                                      // cloudy
                        imgplace.innerHTML = "<img src='/img/cloudy.png' width='300' height='300'>"
            
    
                    else                                                                                         // sunny
                        imgplace.innerHTML = "<img src='/img/sunny.png' width='300' height='300'>"     
                }
            }) 
        })
    })
})



