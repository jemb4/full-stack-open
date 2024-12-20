const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (publications) => {
    return publications.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((max, current) => 
      current.likes > max.likes ? current : max
      , blogs[0])

    if(!favorite) return "there are no blogs"

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blogs => blogs.author)

    const countByAuthor = _.countBy(authors)
    const mode = _.maxBy(_.keys(countByAuthor), author => countByAuthor[author])

    return{
        author: mode,
        blogs: countByAuthor[mode],
    }
}

const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author')
    const authorsWithLikes = _.map(groupedBlogs, (blogsByAuthor) => ({
        author: blogsByAuthor[0].author,
        likes: _.sumBy(blogsByAuthor, 'likes'),
    }))

    const maxLikesAuthor = _.maxBy(authorsWithLikes, 'likes')

    return maxLikesAuthor || { author: null, likes: 0 }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}