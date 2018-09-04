import React,{ Component } from 'react'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'


const api_keyLocation = '3273e78caa3c6b71b5eba09772f186be'
const api_keyWeather = 'ca923c3a8f29d631385661f25a43663a'

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			latitude:'',
			longitude:'',
			country:'',
			city:'',
			weather:'',
			weatherDetail:'',
			src:'',
			loading:false
		}
	}

	componentDidMount(){
		this.getLocation();
	}

	getWeather = () => {
		let res;
		axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${api_keyWeather}`)
		.then(response => {
			res = response.data;
			console.log(res)
			this.setState({weather:res.weather[0].main, weatherDetail:res.weather[0].description})
			
			if (this.state.weather === "clear sky") {
		     		 this.setState({ src: 'http://i1361.photobucket.com/albums/r662/bonham000/Current%20Weather%20App/sun_zps5alfhawb.png' });
		   }
		  	else if (this.state.weather === "few clouds" || this.state.weather === "scattered clouds" || this.state.weather === "broken clouds"){
		     		this.setState({ src: 'http://i1361.photobucket.com/albums/r662/bonham000/Current%20Weather%20App/clouds_zpsimfgky1h.png' });
		  	}
		    else if (this.state.weather === "shower rain" || this.state.weather === "rain") {
		      	this.setState({ src: 'http://i1361.photobucket.com/albums/r662/bonham000/Current%20Weather%20App/rain_zpsd8iqh9we.png' });
		    }
		    else if (this.state.weather === "thunderstorm") {
		      	this.setState({ src: 'http://i1361.photobucket.com/albums/r662/bonham000/Current%20Weather%20App/storm_zpsapxffwwd.png' });
		    } 
		    else {
		      	this.setState({ src: 'http://i1361.photobucket.com/albums/r662/bonham000/Current%20Weather%20App/clouds_zpsimfgky1h.png' });
		    }

		}).catch(error => {
			console.log(error)
		})
	}

	getLocation = () => {
		let res;
		axios.get(`http://ip-api.com/json`)
		.then(response => {
			res = response.data;
			this.setState({latitude:parseFloat(res.lat).toFixed(2), longitude:parseFloat(res.lon).toFixed(2),
								city:res.city, country:res.country})
			console.log(this.state)
			this.getWeather();
			this.setState({loading:true})
		})
		.catch(error => {
			console.log(error)
		})
	}


	render(){
		return(
			<div>
				<h1 className="title">React weather App</h1>
				<div className="container">
					<CurrentWeather 
						weather={this.state.weather}
						weatherDetail={this.state.weatherDetail}
						city={this.state.city}
						country={this.state.country}
						latitude={this.state.latitude}
						longitude={this.state.longitude}
						src={this.state.src}
						loading = {this.state.loading}
						/>
					</div>
			</div>
		)
	}
}

export default App