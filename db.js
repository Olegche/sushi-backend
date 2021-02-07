const mongoose=require('mongoose')
mongoose.set('useFindAndModify', false);
const {mongoURI} =require('./config')
mongoose.connect(mongoURI,{ useNewUrlParser: true.valueOf,useUnifiedTopology: true  })

mongoose.connection.on('connected',()=>{
    console.log('Database connected')
})
mongoose.connection.on('disconnected',()=>{
    console.log('Database disconnected')
})
mongoose.connection.on('error',(err)=>{
    console.log('Error:',err)
})
//mongodb+srv://Oleg:NVdFs1Hh02WrzF8S@cluster0.kiv5u.mongodb.net/sushidb?retryWrites=true&w=majority

//"mongodb://localhost:27017/"