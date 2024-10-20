function writeText(text){
  let index = 0;
  function writeNextLetter(){
    if (index < text.length) {
      document.getElementById('head').innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }
  let interval = setInterval(writeNextLetter, 100);
}
writeText('Message Us');

function write(txt){
  let start = 0;
  function writeOne(){
    if (start < txt.length) {
      document.getElementById('title').innerHTML += txt.charAt(start);
      start++;
    } else {
      clearInterval(int);
    }
  }
  let int = setInterval(writeOne, 100);
}
write('The Spokesman');


const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const progress = document.getElementById("progress");

const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const form = document.querySelector("form"); 

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx <= formStepsNum) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

 
  document.getElementById('spinner-overlay').style.display = 'flex';

  try {
    const response = await fetch("https://formspree.io/f/xleqkzrr", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      alert("Thanks for your response. We would get back to you");
      form.reset();
    } else {
      alert("An error occured. Please try again.");
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  } finally {
   
    document.getElementById('spinner-overlay').style.display = 'none';
  }
});