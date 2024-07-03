const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/E-commerceDatabase')
.then(() =>
     {console.log('DB Connected Succesfully...')

     }
)
.catch((err) =>
     {console.log("Error in db connection")}
)