require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

const Person = require("./models/person")
const person = require('./models/person')

morgan.token("content", (req => JSON.stringify(req.body)))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))
app.use(cors())
app.use(express.static("dist"))



app.get("/api/persons", (request, response, next)=>{
    Person.find({}).then( persons =>{
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id", (request, response)=>{

    const id = request.params.id
    Person.findById(id)
    .then(person =>{
        response.json(person)

    if (person === undefined || person === null){
        response.status(404).end()
    }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request,response, next)=>{
    Person.findByIdAndDelete(request.params.id)
    .then(result =>{
        response.status(204).end()
    })
    .catch(error => next(error))
  })

app.post("/api/persons",(request, response, next)=>{
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
    
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body
  
    Person.findByIdAndUpdate(
        request.params.id,
        {name, number},
        //performs validation for update method parameters. Currently not needed, might be handy in future?
        {new: true, runValidators: true, context: "query"})
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.get("/info",(request, response, next)=>{
    Person.find({})
    .then(persons =>{
        response.send(`<div>Phonebook has info for ${persons.length} people</div>
        <div>
        ${new Date().toString()}
        </div>`)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next)=>{
console.log(error.message)

if (error.name === "ValidationError"){
    response.status(400).json({error: error.message})
}

next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server started succesfully on port ${PORT}`)