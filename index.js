const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const config = {
  headers: {
    'Authorization': 'Bearer 4hgoLrNLIJi9cFyKDRJ64dXQDhkpHeRUHc-8QQ89W9zaCfr3IufoY7WepA6rSphateXfgusfPC4G-aDJp6pu66J3QrsmWg2VcXK0CjKJTPq7OlSbQBuFijoVrf6rW3Yx',
    'Content-Type': 'application/json',
  }
};
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

app.get('/api/search/:term/:location', (req,res) => {
	console.log(req.params)
	let searchConfig = {
		headers: config.headers,
		params: req.params,
	}
	axios.get('https://api.yelp.com/v3/businesses/search', searchConfig)
	.then(function(response) {
        res.send(response.data)
      });
	//res.send({data:'pj'})
});

app.get('/api/searchb/:id', (req,res) => {
	console.log(req.params)
	let searchConfig = {
		headers: config.headers,
		//params: req.params,
	}
	axios.get('https://api.yelp.com/v3/businesses/'+req.params.id, searchConfig)
	.then(function(response) {
        //console.log(response);
        // console.log('PJ2')
        res.send(response.data)
      });
	//res.send({data:'pj'})
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
