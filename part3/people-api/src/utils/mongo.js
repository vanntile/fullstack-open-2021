const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> [<name> <number>]')
  process.exit(1)
} else if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Please provide the password as an argument: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.arnuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const newPerson = new Person({ name, number })

  newPerson.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)

    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    result.forEach((p) => {
      const person = `${p.name} ${p.number}`
      console.log(person)
    })

    mongoose.connection.close()
  })
}
