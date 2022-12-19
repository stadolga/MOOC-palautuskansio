const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const res = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 })
  response.json(res)
})
  
blogRouter.post('/', async (request, response) => {
  console.log(request.token, "!!!")
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')){
    return response.status(400).json({answer: "url and title required"})
  }

  let blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: 0,
    user: user._id
  })

  if (request.body.hasOwnProperty('likes')) {
    blog.likes = request.body.likes
  }
  
  const res = await blog.save();
  user.blogs = user.blogs.concat(res._id)
  await user.save()
  response.status(201).json(res)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(203).end()
})

blogRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  .then(updatedNote => {
    console.log(updatedNote, '!')
    console.log(blog)
    response.json(updatedNote)
  })
})

module.exports = blogRouter