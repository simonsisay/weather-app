import React, { Component } from 'react'

class CurrentWeather extends Component {
	constructor(props){
		super(props);
	}
	render(){
		if(this.props.loading == false){
			return(
				<h1 className="loading">Getting weather data, Please wait ... </h1>
			)
		}
		else {
			return(
				<div className="weather-data">
					<p>You are in {this.props.city}, {this.props.country} and the weather is</p>
					<h3>{this.props.weather}, {this.props.weatherDetail}</h3>
					<img src={this.props.src} />
					<p className="lat">Your lattitude and longitude coordinates are : {this.props.latitude}, {this.props.longitude}</p>
				</div>
			)
		}
	}
}

export default CurrentWeather 