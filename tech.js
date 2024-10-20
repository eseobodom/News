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
writeText('Tech News (TSN)');

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

const style = document.createElement('style');
style.innerHTML = `
  main.dark-mode{
        color: white;
        background: black;
      }
      .soccer{
        width: 100%;
        height: 100%;
        margin-top: 2em;
        margin-bottom: 2em;
      }
      h2{
        margin-top: 1em;
      }
`;
document.head.appendChild(style);
