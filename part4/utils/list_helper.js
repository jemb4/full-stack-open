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
    // ejercicios 4.6 y 4.7 dejados para el final.
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}