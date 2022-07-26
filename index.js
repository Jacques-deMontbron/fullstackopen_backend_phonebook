const express = require("express")
const app = express()

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