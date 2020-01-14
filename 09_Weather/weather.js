const apiKey='a3922b175b8e68284bc508e2b1b63495';
const apiURI='http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=';

var request = require('request');
var weatherURI=apiURI + apiKey;
request(weatherURI,function(error,response,data){
    if(error){
        throw error;
    }
    //console.log(response);
    //console.log(data);
    //console.log(typeof data);
    var result = JSON.parse(data);
    //console.log(result);
    /* for(var item in result){
        console.log(item.toString(),result[item]);
    } */
    let summary = `도시명 : ${result.name} 기온 : ${result.main.temp} &deg; 체감온도 : ${result.main.feels_like}`;
    let icon=`<img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" height="50" width="50">`;
    console.log(summary);
    console.log(icon);
    
});