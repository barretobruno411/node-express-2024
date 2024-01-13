const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')

const app = express()

//configura o view engine handlebars
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
  }))

app.set('view engine', 'handlebars')

const port = process.env.port || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ]

app.get('/about', handlers.about)

//pagina 404 personalizada
app.use((req, res) => handlers.notFound)

// página 500 personalizada
app.use((err, req, res, next) => handlers.serverError)

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};`
+ `press Ctrl-C to terminate.`))