if(process.env.NODE_ENV === 'production'){
    require('dotenv').config();
}

const express = require('express');
const multer = require('multer');
const morgan =require('morgan');
const path = require('path');
const cors = require('cors');


// Initialization
const app = express();
require('./database')

// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename(req,file,cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors())

// Routes
app.use('/api/tasks', require('./routes/tasks'))

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

