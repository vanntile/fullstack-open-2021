const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.map((e) => e.likes).reduce((a, b) => a + b, 0)

const favoriteBlog = (blogs) => blogs.reduce((a, b) => (a?.likes >= b?.likes ? a : b), undefined)

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const pairs = Array.from(
    blogs.reduce((m, { author }) => m.set(author, m.has(author) ? m.get(author) + 1 : 1), new Map()).entries(),
  )

  const maxBlogs = Math.max(...pairs.map(([_, x]) => x))

  return pairs.map(([author, blogs]) => ({ author, blogs })).find((e) => e.blogs === maxBlogs)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const pairs = Array.from(
    blogs
      .reduce((m, { author, likes }) => m.set(author, m.has(author) ? m.get(author) + likes : likes), new Map())
      .entries(),
  )

  const maxLikes = Math.max(...pairs.map(([_, x]) => x))

  return pairs.map(([author, likes]) => ({ author, likes })).find((e) => e.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
