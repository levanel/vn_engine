const express = require ('express')
const cors = require('cors'); // 👈 import cors
const app = express()
let notes = [
  {
  "id":0,
  "name":"chapter 0",
  "details":"This is here for just to serve as an example how you are supposed to lay your stuff"
  },
  {
  "id": 1,
  "name": "chapter 1",
  "details": "garden"
  },
  {
  "id": 2,
  "name": "chapter 2",
  "details": "qwertew"
  },
  {
  "id": 3,
  "name": "chapter 3",
  "details": "wefewfewfew"
  },
  {
  "id": 4,
  "name": "final_chapter",
  "details": "hello everyone"
  },
  {
  "id": 5,
  "name": "final_chapewter",
  "details": "hello evedryone"
  }
  ]
let state = [
  {
  "id": 1,
  "background": "bg_school",
  "character_1_emotions": "happy_face"
  },
  {
  "id": 2,
  "background": "bg_school",
  "character_2_emotions": "sad_face"
  }
]

  app.use(cors()); 
     app.get('/', (request, response) => {
       response.send('<h1>Hello World!</h1>')
     })
     
     app.get('/notes', (request, response) => {
       response.json(notes)
   })
     app.get('/state', (request, response)=>{
      response.json(state)
     })
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
