const { request, response } = require("express")

const express = require("express")
const morgan = require("morgan")
const app = express()

morgan.token("content", (req => JSON.stringify(req.body)))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))

const persons = [
{ name: 'Arto Hellas', number: '040-123456', id:1 },
{ name: 'Ada Lovelace', number: '39-44-5323523', id:2},
{ name: 'Dan Abramov', number: '12-43-234345', id:3 },
{ name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }]

app.get("/api/persons", (request, response)=>{
    response.json(persons)

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
    if(isalreadyinlist(body.name)){
        return response.status(400).json({"error": "given name must be unique"})
    }
    else if (!body.name || !body.number){
       return response.status(400).json({ "error": "Invalid parameters. Request must contain json with name(str) and number(str)"})
        }
    const newperson = {
        name : body.name,
        number: body.number,
        id: generateId()
        }
        persons.concat(newperson)
        response.json(newperson)
})

const isalreadyinlist = (name) => {
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
}

const generateId=()=>{
    return Math.floor(Math.random()* 1000000)

}

app.get("/info",(request, response)=>{
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>
    ${new Date().toString()}
    </div>`)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server started succesfully on port ${PORT}`)