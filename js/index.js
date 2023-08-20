// ======================current day================================

let cityname=document.getElementById("cityname")
let temp =document.getElementById("temp")
let windspeed=document.getElementById("windspeed")
let humidity=document.getElementById("humidity")
let winddir=document.getElementById("winddir")
let condition=document.getElementById("condition")
let iconimg=document.getElementById("iconimg")
let dayshow=document.getElementById("dayshow")
let monthshow=document.getElementById("monthshow")

// ======================next variable================================
let nextdayshow=document.getElementById("nextdayshow")
let nexticonimg=document.getElementById("nexticonimg")
let nexttemp=document.getElementById("nexttemp")
let nextcondition=document.getElementById("nextcondition")


// ======================next next variable================================
let nnextdayshow=document.getElementById("nnextdayshow")
let nnexticonimg=document.getElementById("nnexticonimg")
let nnexttemp=document.getElementById("nnexttemp")
let nnextcondition=document.getElementById("nnextcondition")

// ======================find city================================
let find=document.getElementById("find")
let search=document.getElementById("search")
// ======================find city================================
let latitude
let longitude



( async function getlocation(){
   navigator.geolocation.getCurrentPosition(pos => {
        latitude=pos.coords.latitude;
        longitude=pos.coords.longitude;


        (async function getData1(){
            let response1= await fetch(`https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_8329659c3253490cbea834af20e7a5da`)
            let finalresponse1 =await response1.json();
            console.log( finalresponse1)
            getData(finalresponse1.city)
        
        })()


        console.log(latitude)
        console.log(longitude)
        }, error => { })

})()





    // (async function df(){
    //      getlocation()
    //      await getData1()
        
    //      })()
        






    // (async function(){
    
    //     await getData1();
    // })()



async function getData(city="london"){
    let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f952b8a8652e4e47a1a180019231808&q=${city}&days=3`)
    let finalresponse =await response.json();
    console.log(finalresponse)
    cityname.innerHTML=finalresponse.location.name
    temp.innerHTML=`${finalresponse.current.temp_c}&degc`
    windspeed.innerHTML=`${finalresponse.current.wind_kph}km/h`
    humidity.innerHTML=`${finalresponse.current.humidity}%`
    winddir.innerHTML=`${finalresponse.current.wind_dir}`
    condition.innerHTML=`${finalresponse.current.condition.text}`
    iconimg.setAttribute("src",`http://${finalresponse.current.condition.icon}`)
    let data=new Date(finalresponse.location.localtime)
    dayshow.innerHTML=data.toLocaleDateString("en-us",{weekday:"long"})
    monthshow.innerHTML=data.getDate()+data.toLocaleDateString("en-us",{month:"long"})
    // =============================================================
    let datanext=new Date(finalresponse.forecast.forecastday[1].date)
    nextdayshow.innerHTML=datanext.toLocaleDateString("en-us",{weekday:"long"})
    nexticonimg.setAttribute("src",`http://${finalresponse.forecast.forecastday[1].day.condition.icon}`)
    nexttemp.innerHTML=`${finalresponse.forecast.forecastday[1].day.avgtemp_c}&degc`
    nextcondition.innerHTML=`${finalresponse.forecast.forecastday[1].day.condition.text}`
// =============================================================
let datannext=new Date(finalresponse.forecast.forecastday[2].date)
nnextdayshow.innerHTML=datannext.toLocaleDateString("en-us",{weekday:"long"})
nnexticonimg.setAttribute("src",`http://${finalresponse.forecast.forecastday[2].day.condition.icon}`)
nnexttemp.innerHTML=`${finalresponse.forecast.forecastday[2].day.avgtemp_c}&degc`
nnextcondition.innerHTML=`${finalresponse.forecast.forecastday[2].day.condition.text}`
}




(async function(){
    
    await getData("london");
})()



find.addEventListener("click",function(){
    getData(search.value)
    search.value=""
})

search.addEventListener("input",function(){
    getData(search.value)
})








