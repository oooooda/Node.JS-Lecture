module.exports={
    apiKey :'a3922b175b8e68284bc508e2b1b63495',
    apiURI :'http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=',

    getWeather : function(callback){
        var request = require('request');
        var weatherURI= this.apiURI + this.apiKey;
    request(weatherURI,function(error,response,data){
        if(error){
            throw error;
        }
        var result = JSON.parse(data);
        let weatherInfo = `도시명 : ${result.name} 기온 : ${result.main.temp.toFixed()} &deg; 체감온도 : ${result.main.feels_like}`;
        weatherInfo=`<img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" height="50" width="50">`;
        callback(weatherInfo);
        
    });
    }
}