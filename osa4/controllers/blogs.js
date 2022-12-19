const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const res = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(res)
})
  
blogRouter.post('/',middleware.userExtractor, async (request, response) => {
  const user = request.user

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
  
  const res = await blog.save()
  user.blogs = user.blogs.concat(res._id)
  await user.save()
  response.status(201).json(res)
})

blogRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)

  if ( blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(id)
    response.status(203).end()
  }
  else{
    response.status(400).end()
  }


})

blogRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      console.log(updatedNote, '!')
      console.log(blog)
      response.json(updatedNote)
    })
})

module.exports = blogRouter