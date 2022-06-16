const dummy = () => 1

module.exports = {
  dummy
}

const totalLikes = blogs => (
  blogs.reduce((sum, blog) => sum + blog.likes, 0)
)

module.exports = {
  dummy,
  totalLikes
}