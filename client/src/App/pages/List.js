import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: [],
      location: '',
      term: '',
      showList: false,
      blist: [],
      ilist: [],
      id:[],
    }
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTerm(event) {
    this.setState({term: event.target.value});
  }
  handleChangeLocation(event) {
    this.setState({location: event.target.value});
  }

  handleSubmit(event) {
    // here is the call to get the list of buisinesses
    let here = this
    // alert('A name was submitted: ' + this.state.term + this.state.location);
    axios.get('/api/search'+'/'+this.state.term+'/'+this.state.location)
    .then(
      function(response) {
        // console.log(response);
        // console.log('PJ')
        let data = response.data
        let templist=[];
        let tempilist = [];
        let tempId = [];
        for (var i = 0; i < data.businesses.length; i++) {
          // console.log('pj3')
          templist[i] = data.businesses[i].name
          tempilist[i] = <img src={data.businesses[i].image_url} width="100" height="100" />
          tempId[i] = data.businesses[i].id;
        }
        // console.log(templist)
        //console.log(this)
        here.setState({blist:templist});
        here.setState({ilist:tempilist});
        here.setState({showList:true});
        here.setState({id:tempId})
      });
    event.preventDefault();
  }

  render() {
    const { list } = this.state;
    let that = this;

    return (
      <div className="App">
        <h1>Search Yelp for Restaurants</h1>

      <form onSubmit={this.handleSubmit}>
        <label>
          Search Term:
          <input type="text" value={this.state.term} onChange={this.handleChangeTerm} />
          Location:
          <input type="text" value={this.state.location} onChange={this.handleChangeLocation} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {this.state.showList ?         
         <ul>
          {that.state.blist.map(function(listValue,index){
            return <Link to={{pathname:'./buisiness/'+that.state.id[index]}} > <li key={index}>{listValue} <br></br>{that.state.ilist[index]} </li> </Link>;
          })}
        </ul>
      : this.state.blist}
      </div>
      </div>
    );
  }
}

export default List;