import React from 'react'
import {FaArrowUp, FaArrowDown, FaWind} from "react-icons/fa"
import {BiHappy} from "react-icons/bi"
import {MdCompress, MdOutlineWaterDrop} from "react-icons/md"
import "./descriptions.css"

const Descriptions = ({weather, units}) => {

  const tempUnit = units === 'metric' ? '°C' : '°F'
  const windUnit = units === 'metric' ? 'm/s' : 'm/h'

  const cards = [
    {icon: <FaArrowDown />, title: 'min', data: `${weather.temp_min.toFixed()} ${tempUnit}`},
    {icon: <FaArrowUp />, title: 'max', data: `${weather.temp_max.toFixed()} ${tempUnit}`},
    {icon: <BiHappy />, title: 'feels_like', data: `${weather.feels_like.toFixed()} ${tempUnit}`},
    {icon: <MdCompress />, title: 'pressure', data: `${weather.pressure} hPa`},
    {icon: <MdOutlineWaterDrop />, title: 'humidity', data: `${weather.humidity} %`},
    {icon: <FaWind />, title: 'wind speed', data: `${weather.speed.toFixed()} ${windUnit}`}
  ];

  return (
    <div className='section section__descriptions'>
        {cards.map(({icon, title, data}, index) => (
            <div key={index} className='card'>
                <div className='description__card-icon'>
                    {icon}
                    <small>{title}</small>
                </div>
                <h2>{data}</h2>
            </div>      
        ))}
    </div>
  )
}

export default Descriptions
