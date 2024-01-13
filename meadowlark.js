const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

//configura o view engine handlebars
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
  }))

app.set('view engine', 'handlebars')

const port = process.env.port || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ]

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune()})
})

//pagina 404 personalizada
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.render('404')
})

// página 500 personalizada
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};`
+ `press Ctrl-C to terminate.`))