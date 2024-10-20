
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
writeText('Politics (TSN)');

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
      .last-section{
        display: flex;
        align-items: center;
        margin-top: 20px;
      }
      .section-image{
        margin-right: 20px;
      }
      .section-text{
        font-weight: bolder;
      }
      @media screen and (min-width: 768px){
        .last-section{
          display: none;
        }
      }
      .section-image{
        width: 35%;
        height: 65%;
      }
      .prev{
        border: none;
        background: #333;
        color: white;
        padding: 10px;
      }
      .next{
        border: none;
        background: green;
        color: white;
        padding: 10px;
        float: right;
      }
      .nxt-prev{
        display: none;
      }
      @media screen and (min-width: 768px){
        .nxt-prev{
          display: block;
        }
      }
      a{
        color: #333;
      }
`;
document.head.appendChild(style);
