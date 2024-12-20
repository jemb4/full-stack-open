const bcrypt = require('bcrypt')
const usersRouter =  require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || !username) {
    return response.status(400).json({ 
      error: 'password and username must be given'
    })
  } else if (password.length < 3 || username.length < 3){
    return response.status(400).json({
      error: 'pasword and username must be at least 3 characters long'
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id)
    .populate('blogs', { title: 1, url: 1, likes: 1 })

  if (user) {
    response.json(user)
  } else{
    response.status(404).end()
  }
})

module.exports = usersRouter