const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogRouter.post('/', (request, response) => {
  let blog = {}
  if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')){
    return response.status(400).json({answer: "url and title required"})
  }

  if (!request.body.hasOwnProperty('likes')) {
    blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0
    })
  }
  else{blog = new Blog(request.body)}
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter