const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("Connecting to database")
mongoose.connect(url)
.then(() =>{
    console.log("connection established to database succesfully")
})
.catch(error=>{
    console.log("Error occured while connecting to database: ", error.message)
})


const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', contactSchema)

