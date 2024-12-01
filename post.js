    window.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('title');
        const content = urlParams.get('content');
        const imageUrl = urlParams.get('imageUrl');

        if (title && content) {
            document.getElementById('postTitle').textContent = title;
            document.getElementById('postContent').textContent = content;

            if (imageUrl) {
                document.getElementById('postImage').src = imageUrl;
            }
        }
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
    });