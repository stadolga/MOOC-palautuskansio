const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_helpers')



beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})


//4.8 test
test('3 blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('testing if id is defined properly', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

test('testing that posting to db works', async () => {
  const testInput = {
    title: 'kuinka rikkaaksi',
    author: 'mcDylan',
    url: 'google.com',
    likes: 2
  }
  await new Blog(testInput).save()
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length+1)
})

test('testing that likes is 0 as default', async () => {
  const testInput = {
    title: 'testing zero',
    author: 'mcDylan',
    url: 'google.com'
  }
  
  await api
    .post('/api/blogs')
    .set('Content-Type', 'application/json')
    .send(testInput)

  const res = await api.get('/api/blogs')
  const foundBlog = res.body.filter(x => x.title === 'testing zero')
  expect(foundBlog[0].likes).toBe(0)
})

test('testing that title and url are needed to add data', async () => {
  const testInput = {
    author: 'mcDylan',
    likes: 10000000
  }
  
  await api
    .post('/api/blogs')
    .set('Content-Type', 'application/json')
    .send(testInput)
    .expect(400)
})

test('testing that deleting works', async () => {

  const res = await api.get('/api/blogs')
  const beforeDeletion = res.body.length

  const foundBlog = res.body.filter(x => x.author === 'serious wraiter')
  await console.log(foundBlog)

  await api
    .delete(`/api/blogs/${foundBlog[0].id}`)
    .expect(203)

  const res2 = await api.get('/api/blogs')
  const afterDeletion = res2.body.length

  expect(beforeDeletion!==afterDeletion).toBe(true)
})

test('testing put functionality', async () => {
  const testInput = {
    title: 'testing zero',
    author: 'mcDylan',
    url: 'google.com',
    likes: 200
  }
  let res = await api.get('/api/blogs')
  let foundBlog = res.body.filter(x => x.author === 'serious wraiter')

  await api
    .put(`/api/blogs/${foundBlog[0].id}`)
    .set('Content-Type', 'application/json')
    .send(testInput)
    .expect(200)

  res = await api.get('/api/blogs')
  foundBlog = res.body.filter(x => x.author === 'serious wraiter')

  expect(foundBlog.length).toBe(0)

})
  

afterAll(() => {
  mongoose.connection.close()
})