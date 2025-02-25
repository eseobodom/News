const loadModal = document.getElementById('loadModal');
window.addEventListener('load', () => {
  loadModal.style.display = 'block';
});
document.getElementById('closeBtn').addEventListener('click', () => {
  loadModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if(!loadModal.contains(e.target)){
  loadModal.style.display = 'none';
  }
});
document.getElementById('signUp').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  if(email.trim() === ''){
    alert('Please fill out the email field');
  } else if(!email.includes('@') || !email.includes('.')){
    alert('Invalid Email');
  }else {
  alert(`You will now receive notifications about our news update with ${email}`);
  }
});

const year = new Date().getFullYear();
document.getElementById('year').textContent = year;

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    
}


darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = darkModeToggle.textContent === 'Light Mode' ? 'Dark Mode' : 'Light Mode';
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});


const articles = [
    { title: 'Breaking News: Major Event', description: 'This is a short description of the news article...', image: 'homepol.png', link: 'pol.html' },
    {title: 'The Health Sector', description: 'An analysis in health and wellbeing of individuals in Akwa Ibom State', image: 'health.jpg', link: 'health.html'},
    { title: 'Tech News: New Smartphone Launch', description: 'Details about the latest smartphone...', image: 'iphone.jpg', link: 'tech.html' },
    { title: 'Sports Update: Soccer Championship', description: 'The latest results from the soccer championship...', image: 'sport.jpg', link: 'sport.html' },
    { title: 'Entertainment: New Movie Release', description: 'A popular movie is being released this week...', image: 'movie.jpg', link: 'enter.html' },
    { title: 'Global Economy: Market Analysis', description: 'An analysis of the current economic state...', image: 'market.jpg', link: 'business.html' },
    
    {title: 'More News coming in', description: 'Stay tuned for lastest info and posts...', image: 'logo.jpg', link: '#titleScroll'}
   
];


function renderArticles(filteredArticles) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = ''; 

  
    filteredArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        articleElement.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <div class="content">
                <h3>${article.title}</h3>
                <p>${article.description}</p><br>
                <button style ="background: #0073e6" onclick="window.location.href='${article.link}'">Read More</button><br>
            </div>
        `;
        newsList.appendChild(articleElement);
    });
}


renderArticles(articles);


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

   
    const filteredArticles = articles.filter(article => {
      const newsDiv = document.querySelector('.news-div');
        return article.title.toLowerCase().includes(searchTerm) || article.description.toLowerCase().includes(searchTerm);
          
    });

   
    renderArticles(filteredArticles);
});



const apiKey = '$2a$10$oo/LK9/lQoT1O6vWn.kJjOBkldI40cSgnngqyKEeO.AL7jhjQBKxS'; 
const binId = '66ece8dcacd3cb34a887c5eb';
const jsonBinUrl = `https://api.jsonbin.io/v3/b/${binId}`;
const postsContainer = document.getElementById('postsContainer');
const postModal = document.getElementById('postModal');
const modalMessage = document.getElementById('modalMessage');
const modalFooter = document.getElementById('modalFooter');
const spinnerOverlay = document.getElementById('spinnerOverlay');
const spinner = document.getElementById('spinner');

const correctPin = '1938';
let isAdmin = false;


if (localStorage.getItem('adminPin') === correctPin) {
    isAdmin = true;
}

document.getElementById('closeNews').addEventListener('click', () => {
  postModal.style.display = 'none';
});

function showSpinner() {
    spinnerOverlay.style.display = 'block';
    spinner.style.display = 'block';
}


function hideSpinner() {
    spinnerOverlay.style.display = 'none';
    spinner.style.display = 'none';
}

document.getElementById('submitPostButton').addEventListener('click', () => {
    postModal.style.display = 'flex';
    modalMessage.textContent = ''; 
    modalFooter.textContent = ''; 
});


document.getElementById('submitPost').addEventListener('click', () => {
    const adminName = document.getElementById('adminName').value;
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
    

    if (postContent.trim() === '' || adminName.trim() === '' || postTitle.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    let inputPin = correctPin;

    if (!isAdmin) {
        inputPin = prompt("Enter your PIN:");
        if (inputPin !== correctPin) {
            modalMessage.textContent = 'Incorrect PIN';
            return;
        }

       
        localStorage.setItem('adminPin', inputPin);
        isAdmin = true;
    }

    const newPost = {
        title: postTitle,
        text: postContent,
        name: adminName,
        timestamp: new Date().toISOString()
    };

 
    showSpinner();
    fetch(jsonBinUrl, {
        method: 'GET',
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const posts = data.record.posts || [];
        posts.push(newPost);

       
        return fetch(jsonBinUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey
            },
            body: JSON.stringify({ posts })
        });
    })
    .then(() => {
        document.getElementById('postContent').value = '';
        loadPosts();
        modalFooter.textContent = `Posted by ${adminName} at ${new Date().toLocaleTimeString()}`;
        postModal.style.display = 'none'; 
    })
    .finally(() => hideSpinner())
    .catch(error => console.error('Error posting:', error));
});


function loadPosts() {
    showSpinner();
    fetch(jsonBinUrl, {
        method: 'GET',
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const posts = data.record.posts || [];
        postsContainer.innerHTML = '<h2>Comments 📌📌</h2>';

        if (posts.length === 0) {
            postsContainer.innerHTML += '<p>No comment yet. Be the first to comment.</p>';
        } else {
            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.id = "postsCreated";
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.text}</p><br>
                    <small class="postName">Posted by ${post.name}<br> ${timeAgo(post.timestamp)}</small>
                `;
                
               
                if (isAdmin) {
                    const buttons = document.createElement('div');
                    buttons.className = 'edit-delete-buttons';
                    buttons.innerHTML = `
                        <button class="edit" onclick="editPost(${index})">Edit</button>
                        <button class="delete" onclick="deleteComment(${index})">Delete</button>
                    `;
                    postElement.appendChild(buttons);
                }

                postsContainer.appendChild(postElement);
            });
        }
    })
    .finally(() => hideSpinner())
    .catch(error => console.error('Error fetching posts:', error));
}


function timeAgo(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const seconds = Math.floor((now - postTime) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const unit in intervals) {
        const interval = intervals[unit];
        if (seconds >= interval) {
            const count = Math.floor(seconds / interval);
            return `${count} ${unit}${count !== 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

function editPost(index) {
    const postToEdit = prompt("Enter your edited content:");
    if (postToEdit) {
        fetch(jsonBinUrl, {
            method: 'GET',
            headers: {
                'X-Master-Key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const posts = data.record.posts || [];
            posts[index].text = postToEdit;

            return fetch(jsonBinUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify({ posts })
            });
        })
        .then(() => loadPosts())
        .catch(error => console.error('Error editing post:', error));
    }
}
function deleteComment(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        fetch(jsonBinUrl, {
            method: 'GET',
            headers: {
                'X-Master-Key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const posts = data.record.posts || [];
            posts.splice(index, 1); 

            return fetch(jsonBinUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify({ posts })
            });
        })
        .then(() => loadPosts())
        .catch(error => console.error('Error deleting post:', error));
    }
}


window.onload = loadPosts;


function writeText(text) {
  let index = 0;

  function writeNextLetter() {
    if (index < text.length) {
      document.querySelector('.title').innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }
  let interval = setInterval(writeNextLetter, 100);
}
writeText('The spokesman Newspaper');
document.getElementById('video1').innerHTML = `
<h2>Featured Video</h2>
            <video controls muted autoplay>
              <source src="video1.mp4" type="video/mp4">
            </video>
`;

document.getElementById('postedNews').innerHTML = `
<h2>Fashion World</h2>
            <video controls muted autoplay>
              <source src="video2.mp4" type="video/mp4">
            </video>
`;









const form = document.getElementById('newsForm');
const newsFeed = document.getElementById('newsFeed');
const uploading = document.getElementById('uploading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await handleSubmit();
});

async function handleSubmit() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];

  if (!title || !content) {
    alert('Please fill out all fields.');
    return;
  }

  let storedPin = localStorage.getItem('userPin');

  if (!storedPin) {
    const userPin = prompt("Enter PIN to post:");

    if (userPin !== "1938") {
      alert("Incorrect PIN. You are not authorized to post.");
      return;
    }

    localStorage.setItem('userPin', "1938");
  }

  let imageUrl = '';
  uploading.classList.remove('hidden');

  if (imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=8a595acc7c58729776430cb919c321d3', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error(`ImgBB upload failed: ${response.statusText}`);

      const data = await response.json();
      imageUrl = data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Failed to upload image. Try again.");
      uploading.classList.add('hidden');
      return;
    }
  }
 




  const newsItem = { title, content, imageUrl };

  try {
    const fetchResponse = await fetch('https://api.jsonbin.io/v3/b/66ece8dcacd3cb34a887c5eb', {
      headers: {
        'X-Master-Key': '$2a$10$oo/LK9/lQoT1O6vWn.kJjOBkldI40cSgnngqyKEeO.AL7jhjQBKxS'
      }
    });

    if (!fetchResponse.ok) {
      const errorResponse = await fetchResponse.json();
      console.error('Error response from JSONBin:', errorResponse);
      throw new Error(`JSONBin GET failed: ${fetchResponse.statusText}`);
    }

    const result = await fetchResponse.json();

    
    let currentPosts = Array.isArray(result.record) ? result.record : [];

    const isDuplicate = currentPosts.some(post => post.title === title && post.content === content);
    if (isDuplicate) {
      alert("This post already exists.");
      uploading.classList.add('hidden');
      return;
    }

    currentPosts.push(newsItem);

    const saveResponse = await fetch('https://api.jsonbin.io/v3/b/66ece8dcacd3cb34a887c5eb', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$oo/LK9/lQoT1O6vWn.kJjOBkldI40cSgnngqyKEeO.AL7jhjQBKxS'
      },
      body: JSON.stringify(currentPosts)
    });

    if (!saveResponse.ok) throw new Error(`JSONBin PUT failed: ${saveResponse.statusText}`);

    form.reset();
    displayNews(newsItem);
  } catch (error) {
    console.error('Error saving news:', error);
    alert("Failed to save news. Try again.");
  } finally {
    uploading.classList.add('hidden');
  }
}



function displayNews({ title, content, imageUrl }) {
  const newsDiv = document.createElement('div');
  newsDiv.classList.add('news-item');

  const newsLink = document.createElement('a');
  newsLink.href = `post.html?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}&imageUrl=${encodeURIComponent(imageUrl)}`;

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    newsLink.appendChild(img);
  }

  const newsTitle = document.createElement('h3');
  newsTitle.textContent = title;
  newsLink.appendChild(newsTitle);

  newsDiv.appendChild(newsLink);

  const storedPin = localStorage.getItem('userPin');

  if (storedPin === "1938") {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deletePost(newsDiv, title, content));
    newsDiv.appendChild(deleteButton);
  }

  const shareButton = document.createElement('button');
  shareButton.classList.add('share-btn');
  shareButton.textContent = 'Share';
  shareButton.addEventListener('click', () => sharePost(title, content, imageUrl));
  newsDiv.appendChild(shareButton);

  newsFeed.prepend(newsDiv);
}

async function deletePost(newsDiv, title, content) {
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    const fetchResponse = await fetch('https://api.jsonbin.io/v3/b/66ece8dcacd3cb34a887c5eb', {
      headers: {
        'X-Master-Key': '$2a$10$oo/LK9/lQoT1O6vWn.kJjOBkldI40cSgnngqyKEeO.AL7jhjQBKxS'
      }
    });

    if (!fetchResponse.ok) throw new Error(`JSONBin GET failed: ${fetchResponse.statusText}`);

    const result = await fetchResponse.json();

    
    let currentPosts = Array.isArray(result.record) ? result.record : [];

    const updatedPosts = currentPosts.filter(post => !(post.title === title && post.content === content));

    const saveResponse = await fetch('https://api.jsonbin.io/v3/b/66ece8dcacd3cb34a887c5eb', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$oo/LK9/lQoT1O6vWn.kJjOBkldI40cSgnngqyKEeO.AL7jhjQBKxS'
      },
      body: JSON.stringify(updatedPosts)
    });

    if (!saveResponse.ok) throw new Error(`JSONBin PUT failed: ${saveResponse.statusText}`);

    newsDiv.remove();
  } catch (error) {
    console.error('Error deleting post:', error);
    alert("Failed to delete post. Try again.");
  }
}


async function sharePost(title, content, imageUrl) {
  const baseUrl = "https://ekohnews.vercel.app/post.html";
  const postUrl = `${baseUrl}?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}&image=${encodeURIComponent(imageUrl || '')}`;
  
 
  const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(postUrl)}`;
  const response = await fetch(tinyUrlApi);
  const shortUrl = await response.text();
  
  
  if (navigator.share) {
    navigator.share({
      title,
      text: `Check out this post: ${title}`,
      url: shortUrl
    }).catch(error => console.error("Error sharing:", error));
  } else {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => alert("Link copied, you can share it to any platform"))
      .catch((err) => console.error("Error copying link: ", err));
  }
}


(async function fetchNews() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/66ece8dcacd3cb34a887c5eb', {
      headers: { 'X-Master-Key': '$2a$10$oo/LK9/lQoT1O6vWn.kJjOBkldI40cSgnngqyKEeO.AL7jhjQBKxS' }
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error response from JSONBin:', errorResponse);
      throw new Error(`JSONBin GET failed: ${response.statusText}`);
    }

    const result = await response.json();

   
    if (!result.record || !Array.isArray(result.record)) {
      console.warn('No valid data found. Initializing with an empty array.');
      result.record = [];
    }

    result.record.forEach(displayNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    alert("Failed to fetch news. Please try again later.");
  }
})();





const closeUpload = document.getElementById('closeUpload');
const formContainer = document.querySelector('.form-container');
closeUpload.addEventListener('click', () => {
  formContainer.style.display = 'none';
});
const formcontainShow = document.getElementById('formcontainShow');
formcontainShow.addEventListener('click', () => {
      formContainer.style.display = 'block';
      window.location.href = '#titleScroll';
})
