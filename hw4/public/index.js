/*
 * Add the contents of your index.js file from Assignment 3 here to see the
 * interactions you implemented.  This is not required for your grade on this
 * assignment, but it'll allow you to have the full experience of the site
 * as we've implemented it so far.
 */

alert('JS successfully loaded.');

allPosts = [];
for (var i = 0; i < document.getElementById('posts').children.length; i++) {
  allPosts.push(document.getElementById('posts').children[i]);
}

function clearInput() {
  document.getElementById('modal-backdrop').style.display = 'none'
  document.getElementById('sell-something-modal').style.display = 'none'
  document.getElementById('post-text-input').value = ''
  document.getElementById('post-photo-input').value = ''
  document.getElementById('post-price-input').value = ''
  document.getElementById('post-city-input').value = ''
  document.getElementById('post-condition-new').checked = true
}

var button = document.getElementById('sell-something-button')
button.addEventListener('click', function() {
  console.log('Button was clicked')
  document.getElementById('modal-backdrop').style.display = 'inherit'
  document.getElementById('sell-something-modal').style.display = 'inherit'
})

var cancel = document.getElementById('modal-cancel')
cancel.addEventListener('click', function() {
  console.log('Cancel button was clicked')
  clearInput()
})

var close = document.getElementById('modal-close')
close.addEventListener('click', function() {
  console.log('Close button was clicked')
  clearInput()
})

var accept = document.getElementById('modal-accept')
accept.addEventListener('click', function() {
  console.log("Accept button was clicked")

  var description = document.getElementById('post-text-input')
  var url = document.getElementById('post-photo-input')
  var price = document.getElementById('post-price-input')
  var city = document.getElementById('post-city-input')

  if (description.value == '' || url.value == '' || price.value == '' || city.value == '') {
    window.alert("You must fill in all of the fields!")
  }
  else {
    createPost(description.value, url.value, '$' + price.value, '(' + city.value + ')')
  }
})

function getCondition() {
  if (document.getElementById('post-condition-new').checked) {
    return 'new'
  }
  else if (document.getElementById('post-condition-excellent').checked) {
    return 'excellent'
  }
  else if (document.getElementById('post-condition-good').checked) {
    return 'good'
  }
  else if (document.getElementById('post-condition-fair').checked) {
    return 'fair'
  }
  else if (document.getElementById('post-condition-poor').checked) {
    return 'poor'
  }
}

function createPost(description, url, price, city) {
  var p = document.getElementById('posts')
  var postItem = document.createElement('div')
  postItem.classList.add('post')
  
  postItem.setAttribute('data-price', price)
  postItem.setAttribute('data-city', city)
  postItem.setAttribute('data-condition', getCondition())

  var postContents = document.createElement('div')
  postContents.classList.add('post-contents')
  postItem.appendChild(postContents)

  var postImageContainer = document.createElement('div')
  postImageContainer.classList.add('post-image-container')
  postContents.appendChild(postImageContainer)

  var postImage = document.createElement('img')
  postImage.src = url
  postImage.alt = description
  postImageContainer.appendChild(postImage)

  var postInfoContainer = document.createElement('div')
  postInfoContainer.classList.add('post-info-container')
  postContents.appendChild(postInfoContainer)

  var postLink = document.createElement('a')
  var postDescription = document.createTextNode(description)
  postLink.appendChild(postDescription)
  postInfoContainer.appendChild(postLink)
  postLink.href = '#'
  
  var postPrice = document.createElement('span')
  postPrice.classList.add('post-price')
  var itemPrice = document.createTextNode(price)
  postPrice.appendChild(itemPrice)
  postInfoContainer.appendChild(postPrice)

  var postCity = document.createElement('span')
  postCity.classList.add('post-city')
  var itemCity = document.createTextNode(city)
  postCity.appendChild(itemCity)
  postInfoContainer.appendChild(postCity)

  p.appendChild(postItem)
  clearInput()
  allPosts.push(postItem)
}

function filterPostByText(post) {
  if (document.getElementById('filter-text').value === '' || document.getElementById('filter-text').value == null) {
    return true
  }
  else if (post.firstElementChild.children[1].firstElementChild.textContent.toLowerCase().includes(document.getElementById('filter-text').value.toLowerCase())) {
    return true
  }
  return false
    console.log('The text has been filtered.')
}

function filterPostByPrice(post) {
  var min = document.getElementById('filter-min-price').value
  var minVal = parseInt(document.getElementById('filter-min-price').value)
  var max = document.getElementById('filter-max-price').value
  var maxVal = parseInt(document.getElementById('filter-max-price').value)

  if ((min === '' || min == null) && (max === '' || max == null)) {
    return true
  }

  if (!(min === '' || min == null) && !(max === '' || max == null)) {
    if (minVal <= parseInt(post.dataset.price) && maxVal >= parseInt(post.dataset.price)) {
      return true
    }
    return false
  }

  if (!(min === '' || min == null)) {
    if (minVal <= parseInt(post.dataset.price)) {
      return true
    }
    return false
  }

  if (maxVal >= parseInt(post.dataset.price)) {
    return true
  }
  return false
}

function filterPostByCity(post) {
  if (document.getElementById('filter-city').value === '' || document.getElementById('filter-city').value === post.dataset.city) {
    return true
  }
  return false
  console.log('The city has been filtered.')
}

function filterPostByCondition(post) {
  if (document.getElementById('filter-condition-new').checked == false && document.getElementById('filter-condition-excellent').checked == false && document.getElementById('filter-condition-good').checked == false && document.getElementById('filter-condition-fair').checked == false && document.getElementById('filter-condition-poor').checked == false) {
    return true;
  }
  if (document.getElementById('filter-condition-new').checked && 'new' === post.dataset.condition) {
    return true
  }
  if (document.getElementById('filter-condition-excellent').checked && 'excellent' === post.dataset.condition) {
    return true
  }
  if (document.getElementById('filter-condition-good').checked && 'good' === post.dataset.condition) {
    return true
  }
  if (document.getElementById('filter-condition-fair').checked && 'fair' === post.dataset.condition) {
    return true
  }
  if (document.getElementById('filter-condition-poor').checked && 'poor' === post.dataset.condition) {
    return true
  }

  return false
  console.log('The condition has been filtered.')
}

var update = document.getElementById('filter-update-button')
update.addEventListener('click', function() {
  console.log('Update bouton was clicked')
  filterPosts()
})

function removePosts() {
  var numPosts = document.getElementById('posts').children.length
  for (var i = 0; i < numPosts; i++) {
    document.getElementById('posts').removeChild(document.getElementById('posts').children[0]);
  }
}

function filterPosts() {
  removePosts()

  for (var i = 0; i < allPosts.length; i++) {
    if (filterPostByText(allPosts[i]) && filterPostByPrice(allPosts[i]) && filterPostByCity(allPosts[i]) && filterPostByCondition(allPosts[i])) {
        document.getElementById('posts').append(allPosts[i])
    }
  }
}