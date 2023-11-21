const express =  require('express');
const router = require('./routes');
const path = require('path');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('PORT', process.env.PORT || 3100);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.use(router);
app.use(express.static(path.join(__dirname, "/public")));

app.listen(app.get('PORT'), () =>{
    console.log('Por puerto 3000')
})
