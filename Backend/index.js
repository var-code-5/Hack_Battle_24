import express from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import axios from 'axios';
import auth from './routes.js'

env.config();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/auth", auth);

var whitelist = [
  'http://localhost:5173/',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};


const port = process.env.PORT || 3000;

  app.post('/places',(req,res)=>{
    console.log(req.body);
    const place_name = req.body.place_name;
    console.log(place_name);
    const locationQuery = `tourist places in ${place_name}`;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(locationQuery)}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    axios.get(url)
    .then(response => {
      console.log(response.data);
      res.send(response.data);  
    })
    .catch(error => {
      console.error(`Error fetching places: ${error.message}`);
      res.status(500).send({message:"Failed to fetch"});
    });
  });

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});