const initialBlogs = [
  {
    'title': 'muijii lahdes',
    'author': 'gheto masa 2',
    'url': 'google.fi',
    'likes': 5
  },
  {
    'title': 'muijii perus',
    'author': 'gheto masa 4',
    'url': 'demi.fi',
    'likes': 10
  },
  {
    'title': 'pusiness',
    'author': 'serious wraiter',
    'url': 'oficialvepsite.fi',
    'likes': 3
  },
]
  
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}
  
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}