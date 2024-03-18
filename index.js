// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

let responseObject = {}

//Este get funcionará para los casos en los que se pase un parámetro después del api
app.get("/api/:date", (req, res) => {
  //tomo el parametro date pasado en la ruta y lo guardo como String
  let date = req.params.date;

  // Verificar si el parámetro es un número (posible UNIX timestamp)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  // Crear una nueva fecha y verificar si es válida
  let newDate = new Date(date);
  if (isNaN(newDate.getTime())) {
    res.json({error: "Invalid Date"});
    return;
  }

  // Construir el objeto de respuesta
  responseObject['unix'] = newDate.getTime();
  responseObject['utc'] = newDate.toUTCString();

  // Enviar respuesta
  res.json(responseObject);
});

//Este get funcionará para los casos en los que no se pase ningún parámetro después del api //test7 and test8
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(), //retorna el tiempo actual en milisegundos
    utc: new Date().toUTCString() //retorna la fecha actual convertida en string en formato UTC
  });
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
