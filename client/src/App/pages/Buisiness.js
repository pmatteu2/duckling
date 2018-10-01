import React, { Component } from 'react';
import axios from 'axios';

class Buisiness extends Component {
	constructor(props){
    super(props);
    this.state = {
    	days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    	start:[],
    	end:[],
    	phone: '',
    	img: '',
    	address: '',
    	price: '',
    	rating: 0,
    	name: '',
		};
    console.log(this.props.match.params.bid)
  }
  componentWillMount() {
  	let here = this;
  	axios.get('/api/searchb'+'/'+this.props.match.params.bid)
    .then(
    	function(response) {

    		let data = response.data;
    		let tempStart = [];
    		let tempEnd = [];
    		let tempRating = '';
    		let tempAddress = data.location.display_address[0]+'. '+data.location.display_address[1]
    		console.log(data.hours[0].open[0].start)
    		for (var i = 0 ; i < data.hours[0].open.length ; i++) {
    			tempStart[i] = data.hours[0].open[i].start.slice(0,2)+':'+data.hours[0].open[i].start.slice(2);
    			tempEnd[i] = data.hours[0].open[i].end.slice(0,2)+':'+data.hours[0].open[i].end.slice(2);
    		}
    		for (var i = 0 ; i < data.rating; i++) {
    			tempRating = tempRating + '$';
    		}
    		here.setState({start:tempStart})
    		here.setState({end:tempEnd})
    		here.setState({
    										phone: data.phone,
    										price: data.price,
    										rating: tempRating,
    										img: data.image_url,
    										address: tempAddress,
    										name: data.name,
    									})

    		console.log(response)
    		console.log(here)
    	});
  }



	render() {
		let that = this;
		console.log('pj')
		return (
			<div className='App'>
				<h1>{that.state.name}</h1>
				<img src={that.state.img} width='300' height='200'/>
				<h3>{that.state.phone}</h3>
				<h3>{that.state.address}</h3>
				<h3>Rating: {that.state.rating}</h3>
				<h3>Price: {that.state.price}</h3>
				<h3>Hours</h3>
				<table width="100%">
					<tr>
						{that.state.days.map(function(x){
							return <th>{x}</th>
						})}
					</tr>
					<tr>
						{that.state.start.map(function(x){
							return <td>{x}</td>
						})}
					</tr>
					<tr>
						{that.state.end.map(function(x){
							return <td>{x}</td>
						})}
					</tr>
				</table>
			</div>
			);
	}
}

export default Buisiness;