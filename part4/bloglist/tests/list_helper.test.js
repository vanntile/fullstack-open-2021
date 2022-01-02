const listHelper = require('../src/utils/list_helper')

const blogTemplate = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  likes: 5,
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blog = {
    ...blogTemplate,
    _id: '5a422aa71b54a676234d17f8',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0,
  }

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blog])
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes([
      { ...blog, likes: 1 },
      { ...blog, likes: 3 },
      { ...blog, likes: 5 },
    ])
    expect(result).toBe(9)
  })
})

describe('favourite blog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog([{ ...blogTemplate }])
    expect(result).toEqual(blogTemplate)
  })

  test('of a bigger list has the right response', () => {
    const result = listHelper.favoriteBlog([
      { ...blogTemplate, likes: 3 },
      { ...blogTemplate, likes: 0 },
      { ...blogTemplate },
    ])
    expect(result).toEqual(blogTemplate)
  })
})

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.mostBlogs([{ ...blogTemplate }])
    expect(result).toEqual({ author: blogTemplate.author, blogs: 1 })
  })

  test('of a bigger list has the right response', () => {
    const blogList = [
      { author: 'A' },
      { author: 'B' },
      { author: 'C' },
      { author: 'A' },
      { author: 'B' },
      { author: 'A' },
    ]

    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual({ author: 'A', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.mostLikes([{ ...blogTemplate }])
    expect(result).toEqual({ author: blogTemplate.author, likes: blogTemplate.likes })
  })

  test('of a bigger list has the right response', () => {
    const blogList = [
      { author: 'A', likes: 3 },
      { author: 'B', likes: 3 },
      { author: 'C', likes: 3 },
      { author: 'A', likes: 3 },
      { author: 'B', likes: 3 },
      { author: 'A', likes: 3 },
    ]

    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual({ author: 'A', likes: 9 })
  })
})
