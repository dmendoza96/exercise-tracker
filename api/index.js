const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db/dbConfig')
const userRoutes = require('./routes/userRoutes')

db.sync().then(() => console.log('db is ready'))

app.use(cors())
app.use(express.static('public'))

app.use(express.urlencoded({extended: true,}))

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: 'views'})
});

app.use('/api/users', userRoutes)

app.get('*', (req, res)=>{
  res.sendFile('404.html', {root: 'views'})
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
