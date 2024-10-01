import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import '../styles/Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import humidity_icon from '../assets/humidity.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

function Weather() {

    const inputRef = useRef()
    const [weatherData , setWeatherData] = useState(false)
    const [error , setError] = useState('')

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
    }

    const search = async(city)=>{
        
        if(city === ""){
            setError("Enter A City Name");
            return;
        }
        try {
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response =await fetch(url)
            const data = await response.json()


            if(!response.ok){
                setError(data.message)
                return;
            }

            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name , 
                icon: icon
            })
            setError('')

        } catch (error) {
            setError("Error fetching weather data");
            console.log("Error fetching weather Data")
        }
    }

    useEffect(()=>{
        search("Malappuram")
    },[])

   

  return (
    <div className='place-self-center p-3 md:p-8 lg:p-10 rounded-lg flex flex-col items-center weather'>
      <div className='flex items-center gap-3'>
            <input ref={inputRef} className='h-8 lg:h-[50px] border-none outline-none rounded-[40px] pl-4  md:p-5 lg:p-6 
               text-[#626262] bg-[#ebfffc] text-sm md:text-[16px] lg:text-[18px]'   
               type="text" placeholder='Enter A City' />
            <img className='w-[50px] p-[15px] rounded-[50px] bg-[#ebfffc] cursor-pointer' 
            src={search_icon} alt="search-icon" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {error && <p className='text-red-500 text-[16px] mt-2 mb-0'>{error}</p>}
      {weatherData?<>
        <img src={weatherData.icon} alt="weather icon" className='w-[150px] my-[30px]' />
      <p className='text-[50px] md:text-[70px] lg:text-[80px] text-[#fff] leading-none '
      >{weatherData.temperature}°c</p>
      <p className='text-[#fff] text-[20px] md:text-[30px] lg:text-[40px]'>{weatherData.location}</p>
      <div className='w-[100%] mt-10 text-[#fff] flex justify-between'>
        <div className="flex items-start gap-3 text-[16px] md:text-[18px] lg:text-[22px]">
            <img src={humidity_icon} alt="weather_data_icon" className='w-[26px] mt-[10px]'/>
            <div>
                <p>{weatherData.humidity}%</p>
                <span className='block text-[12px] md:text-[14px] lg:text-[16px]'>Humidity</span>
            </div>
        </div>
        <div className="flex items-start gap-3 text-[16px] md:text-[18px] lg:text-[22px]">
            <img src={wind_icon} alt="weather_data_icon" className='w-[26px] mt-[10px]'/>
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span className='block text-[12px] md:text-[14px] lg:text-[16px]'>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
