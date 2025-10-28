document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const quizSection = document.getElementById("quiz");
  const result = document.getElementById("result");
  const submitBtn = document.getElementById("submitBtn");
  let timeLeft = 50;
  let timerId;

  // ✅ Start button
  startBtn.addEventListener("click", () => {
    document.querySelector(".card").style.display = "none"; // hide welcome card
    quizSection.style.display = "block"; // show quiz
    timeLeft = 50;
    startTimer();
    showDate();
  });

  // ✅ Timer
  function startTimer() {
    const timerElement = document.getElementById("timer");
    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft--;
      timerElement.textContent = "Time Left: " + timeLeft + "s";
      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerElement.textContent = "⏰ Time’s up!";
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    alert("Game Over! Time’s up!");
  }

  // ✅ Show current date
  function showDate() {
    let now = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let fullDate = `${day}, ${date} ${month} ${year}`;

    const dateDiv = document.createElement("h4");
    dateDiv.id = "dateTime";
    dateDiv.textContent = "📅 " + fullDate;
    quizSection.prepend(dateDiv);
  }

  // ✅ Check quiz answers
  submitBtn.addEventListener("click", checkQuiz);

  function checkQuiz() {
    const answers = {
      q1: "All of the above",
      q2: "object",
      q3: "=",
      q4: "// This is a comment",
      q5: "object",
      q6: "pop()",
      q7: "Netscape",
      q8: "Float",
      q9: "Not a Number",
      q10: "Undefined",
    };

    let score = 0;
    let total = Object.keys(answers).length;

    // remove old highlights
    document.querySelectorAll(".hover-question").forEach(div => {
      div.classList.remove("correct", "incorrect");
    });

    for (let q in answers) {
      const selected = document.querySelector(`input[name="${q}"]:checked`);
      const questionDiv = document.querySelector(`input[name="${q}"]`).closest(".hover-question");

      if (selected) {
        if (selected.value === answers[q]) {
          score++;
          questionDiv.classList.add("correct");
        } else {
          questionDiv.classList.add("incorrect");
        }
      } else {
        questionDiv.classList.add("incorrect");
      }
    }

    // ✅ Show result
    result.innerHTML = `You scored <b>${score}</b> out of <b>${total}</b>`;
    result.classList.add("show");

    // ✅ Confetti effects
    if (score === total) {
      result.style.color = "blue";
      result.innerHTML += "<br>🎉 Excellent!";
      if (typeof confetti === "function") {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    } else if (score >= total / 2) {
      result.style.color = "orange";
      result.innerHTML += "<br>🙂 Good effort!";
      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      result.style.color = "red";
      result.innerHTML += "<br>😟 Try again!";
    }
  }
});