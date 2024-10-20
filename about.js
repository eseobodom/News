const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.querySelector('main');

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

function writeText(text){
  let index = 0;
  function writeNextLetter(){
    if (index < text.length) {
      document.querySelector('.title').innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }
  let interval = setInterval(writeNextLetter, 100);
}
writeText('About The Spokesman News');

const style = document.createElement('style');
style.innerHTML = `
main.dark-mode{
        color: white;
        background: black;
      }
`; 

document.head.appendChild(style);
