const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const res = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comment', {})
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

blogRouter.put('/:id', async(request, response) => {
  const body = request.body
  console.log(body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      console.log(updatedNote, '!')
      response.json(updatedNote)
    })
})

blogRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blog = await Blog.findById(id)
  console.log(blog)

  let comment = new Comment({
    comment: body.comment,
    blog: blog._id
  })

  const savedComment = await comment.save()
  console.log(savedComment)
  blog.comment = blog.comment.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})


module.exports = blogRouter