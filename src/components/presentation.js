import * as React from 'react';

// MATERIAL UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

// REACT ICONS
import { TiWeatherCloudy } from 'react-icons/ti';
import { WiHumidity } from 'react-icons/wi';
import { TiWeatherWindy } from 'react-icons/ti';
import { MdOutlineVisibility } from 'react-icons/md';
import { FaTemperatureHigh } from 'react-icons/fa';

//CUSTOMIZED CSS
import '../CSS/App.css';

import { Time } from './time'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Content() {
    return (
        <>
            <MainComponent />
        </>
    )
}

function MainComponent() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a5c50542ee4d6c00c61d71f38a0e7746`

    const searchLocation = () => {
        // eslint-disable-next-line no-restricted-globals
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('');
        }
    };

    useEffect(() => {
        document.title = "Weather Forecasting App";
    })

    return (
        <div className='app'>
            <ThisAppBar />
            <div className='search'>
                <input
                    type="text"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                />
            </div>
            <div className='container'>
                <div className='top'>
                    <div className='time'>
                        <p>{data.main ? <Time /> : <Time />}</p>
                    </div>
                    <div className='location'>
                        <p>{data.name}</p>
                    </div>
                    <div className='temp'>
                        <h1>{data.main ? ((data.main.temp - 32) * 5 / 9).toFixed(1) + "°C" : null}</h1>
                    </div>
                    <div className='desc'>
                        <p>{data.weather ? data.weather[0].main : null}</p>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='feels'>
                        <p className='bold'>{data.main ? ((data.main.feels_like - 32) * 5 / 9).toFixed(1) + "°C" : null} {data.main ? <FaTemperatureHigh /> : null}</p>
                        <p>Feels Like</p>
                    </div>
                    <div className='humidity'>
                        <p className='bold'>{data.main ? data.main.humidity + "%" : null} {data.main ? <WiHumidity /> : null}</p>
                        <p>Humidity</p>
                    </div>
                    <div className='wind'>
                        <p className='bold'>{data.wind ? (data.wind.speed) + " KPH" : null} {data.main ? <TiWeatherWindy /> : null}</p>
                        <p>Wind Speed</p>
                    </div>
                    <div className='visibility'>
                        <p className='bold'>{data.visibility ? data.visibility / 1000 + " KM" : null} {data.main ? <MdOutlineVisibility /> : null} </p>
                        <p>Visibility</p>
                    </div>
                </div>
            </div>
        </ div >
    )
}

function ThisAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: 'rgba(0, 0, 0, .6)' }}>
                <Toolbar>
                    <TiWeatherCloudy
                        style={{ fontWeight: 600, fontSize: 20 }}
                    >
                    </TiWeatherCloudy>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Weather App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box >
    )
}