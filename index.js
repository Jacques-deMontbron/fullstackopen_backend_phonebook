const express = require("express")
var bodyParser = require('body-parser')
const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

const MAX_VALUE = 100000000

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons/", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const requestId = Number(request.params.id)
    const person = persons.find(person => person.id === requestId)

    if (!person) {
        response.status(404).end()
    }
    else {
        response.json(person)
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const requestId = Number(request.params.id)
    persons = persons.filter(person => person.id !== requestId)

    response.status(204).end()
})

app.post("/api/persons", jsonParser, (request, response) => {
    const body = request.body
    if (!body?.name) {
        return response.status(400).json({
            error: "Name is missing"
        })
    }
    else if (!body?.number) {
        return response.status(400).json({
            error: "Number is missing"
        })
    }
    if (persons.find((person) => person.name === body.name)) {
        return response.status(409).json({
            error: "Given name already exists in phonebook. Name must be unique."
        })
    }


    const person = {
        id: Math.floor(Math.random() * MAX_VALUE),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get("/info/", (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    )
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})