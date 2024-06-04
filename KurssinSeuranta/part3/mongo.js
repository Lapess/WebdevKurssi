const mongoose = require("mongoose")

if (process.argv.length<3){
    console.log("Give password as an argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://lassivauhkala:${password}@webdevkurssi1.d5ok24i.mongodb.net/noteApp?retryWrites=true&w=majority&appName=WebdevKurssi1`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)


const note = new Note({
    content: "HTML is easy (This is test)",
    important: true,
})

/*note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
*/

Note.find({important : true}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
})