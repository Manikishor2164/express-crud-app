import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

let teaData = []
let nextid = 1

// Add new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    if (!name || !price) {
        return res.status(400).send("Missing name or price")
    }
    const newTea = { id: nextid++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// Get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// Get a tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Not found")
    }
    res.status(200).send(tea)
})

// Update tea by ID
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// Delete tea by ID
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Tea not found")
    }
    teaData.splice(index, 1)
    return res.status(204).send("Deleted")
})

// Start server
app.listen(port, () => {
    console.log(`Server is listening at port: ${port}...`)
})
