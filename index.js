const express = require('express');
const app = express();
const bodyParsr = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')
const helment = require('helmet')
const xss = require('xss-clean')
const rout = require('./router/router');

app.use(bodyParsr.json());
app.use(bodyParsr.urlencoded({ extended: true }));
const responseHandler = require('./middleware/responseHandler');
app.use(responseHandler())

app.use(morgan('tiny'));

// adding Helmet to enhance your API's security
app.use(helment());

// sanitize request data
app.use(xss());


app.use(cors())

const DB_URL = "mongodb+srv://007arunkarthi2002:k2slRWN5cwKaJw4p@cluster0.xcxjoed.mongodb.net"

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to DB', DB_URL);
    })
    .catch((error) => {
        console.log('Error connecting to DB=================');
        console.log(error);
        process.exit(1);
    });


app.use('/', rout)



app.listen(7011, () => { console.log('port successfully running on 7011') })

