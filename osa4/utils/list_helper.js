const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const arr = blogs.map(x => x.likes)
  console.log(arr)
  return arr.reduce((partialSum, a) => partialSum + a, 0)
}

const favoriteBlog = (blogs) =>{
  const biggestBlog = blogs.sort((a, b) => b.likes - a.likes)[0]
  return {
    title: biggestBlog.title,
    author: biggestBlog.author,
    likes: biggestBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')

  const authorWithMostBlogs = _.maxBy(
    _.keys(groupedBlogs),
    (author) => groupedBlogs[author].length
  )

  return {
    author: authorWithMostBlogs,
    blogs: groupedBlogs[authorWithMostBlogs].length,
  }
}

const mostLikes = (blogs) => {
  // Group the blogs by author using the _.groupBy function
  const groupedBlogs = _.groupBy(blogs, 'author')

  // Use the _.maxBy function to get the author with the most likes
  const authorWithMostLikes = _.maxBy(
    _.keys(groupedBlogs),
    (author) =>
      _.sumBy(groupedBlogs[author], (blog) => blog.likes)
  )
  
  // Return the author and the total number of likes
  return {
    author: authorWithMostLikes,
    likes: _.sumBy(groupedBlogs[authorWithMostLikes], (blog) => blog.likes),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}