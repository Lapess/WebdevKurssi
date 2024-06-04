require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

const Person = require("./models/person")

morgan.token("content", (req => JSON.stringify(req.body)))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))
app.use(cors())
app.use(express.static("dist"))



app.get("/api/persons", (request, response)=>{
    Person.find({}).then( persons =>{
        console.log(persons, "hit")
        response.json(persons)
    })

})

app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request,response)=>{

    response.status(204).end()
  })

app.post("/api/persons",(request, response)=>{
    const body = request.body

    if (body.name === "" || body.number === ""){
       return response.status(400).json({ "error": "Invalid parameters. Request must contain json with name(str) and number(str)"})
        }

    const person = new Person ({
        name : body.name,
        number: body.number
        })
        person.save().then(savedperson =>{
            response.json(savedperson)
        })
})

app.get("/info",(request, response)=>{
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>
    ${new Date().toString()}
    </div>`)
})



const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server started succesfully on port ${PORT}`)