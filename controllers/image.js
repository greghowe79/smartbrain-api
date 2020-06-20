const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c4c6e52d9f9f4b6691d3981cb57d9cf7'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('impossibile lavorare con le API'))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))  
}

module.exports = {
	handleImage,
	handleApiCall
}