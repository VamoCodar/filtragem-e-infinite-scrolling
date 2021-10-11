function blog() {
  const postsContainer = document.querySelector('#posts-container')
  const loaderContainer = document.querySelector('.loader')
  const filterInput = document.querySelector('#filter')

  let page = 1

  const getPosts = async () => {
    const response = await
      fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
    return response.json()
  }

  const generatePostsTemplate = posts => {
    return posts.map(({ id, title, body }) => `
  <div class="post">
    <div class="number">${id}</div>
      <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
  </div>`
    ).join('')
  }


  const addPostsIntoDom = async () => {
    const posts = await getPosts()
    const postTemplate = generatePostsTemplate(posts)

    postsContainer.innerHTML += postTemplate
  }
  addPostsIntoDom()

  const getNextPosts = () => {
    setTimeout(() => {
      page++
      addPostsIntoDom()
    }, 300)
  }

  const removeLoader = () => {
    setTimeout(() => {
      loaderContainer.classList.remove('show')
      getNextPosts()
    }, 300)
  }

  const showLoader = () => {
    loaderContainer.classList.add('show')
    getNextPosts()
    removeLoader()
  }

  const handleScrollToPageBottom = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const ispageBottom = scrollTop + clientHeight
      >= scrollHeight - 10
    if (ispageBottom) {
      showLoader()
    }

  }


  const showPostIfMatchInputValue = inputvalue => (post) => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const postContainsInputValue = postTitle.includes(inputvalue)
      || postBody.includes(inputvalue)

    if (postContainsInputValue) {
      post.style.display = 'flex'
      return
    }
    post.style.display = 'none'

  }


  const handleInputValue = (event) => {
    const inputValue = event.currentTarget.value.toLowerCase()
    const posts = document.querySelectorAll('.post')
    posts.forEach(showPostIfMatchInputValue(inputValue))

  }

  filterInput.addEventListener('input', handleInputValue)
  window.addEventListener('scroll', handleScrollToPageBottom)
}
blog()