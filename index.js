document.getElementById("submitBtn").addEventListener("click", checkQuiz);

function checkQuiz() {
  // Correct answers
  let answers = {
    q1: "All of the above",
    q2: "object",
    q3: "=",
    q4: "// This is a comment",
    q5: "object",
    q6: "pop()",
    q7:"Netscape",
    q8:"Float",
    q9:"Not a Number",
    q10:"Undefined",
  };

  let score = 0;
  let total = Object.keys(answers).length;

  // Reset styles
  document.querySelectorAll(".hover-question").forEach(div => {
    div.classList.remove("correct", "incorrect");
  });

  // Check answers
  for (let q in answers) {
    let selected = document.querySelector(`input[name="${q}"]:checked`);
    let questionDiv = document.querySelector(`input[name="${q}"]`).closest(".hover-question");

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

  // Show result
  let result = document.getElementById("result");
  result.innerHTML = `You scored <b>${score}</b> out of <b>${total}</b>`;



  // /////////////////////


if (score === total) {
  result.style.color = "blue";
  result.innerHTML += "<br>🎉 Excellent!";

  // Confetti animation
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
} else if (score >= total / 2) {
  result.style.color = "orange";
  result.innerHTML += "<br>🙂 Good effort!";

  // Light confetti for encouragement
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
} else {
  result.style.color = "red";
  result.innerHTML += "<br>😟 Try again!";
}
}
// document.getElementById("startBtn").addEventListener("click", () => {
//   document.getElementById("quiz").style.display = "block";
//   document.getElementById("startBtn").style.display = "none"; // button hide
// });

