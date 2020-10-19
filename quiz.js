init();

function init() {
  const data = [
    {
      question: "저는 몇살 일까요?",
      anwser: "1993년에 태어난 28살입니다.",
    },
    {
      question: "저의 혈액형은 무엇일까요?",
      anwser: "O형 입니다.",
    },
    {
      question: "저는 어디에 살까요?",
      anwser: "강남구 대치동에 거주하고 있습니다.",
    },
    {
      question: "저의 고향은 어디일까요?",
      anwser: "부산입니다.",
    },
    {
      question: "저의 MBTI 유형은 무엇일까요?",
      anwser: "ENTJ 입니다.",
    },
    {
      question: "저의 취미는 무엇일까요?",
      anwser:
        "요즘은 JS관련 구글링..? ^^.",
    },
  ];

  const $quizBoard = document.querySelector(".quiz-board");

  for (let i = 0; i < data.length; i++) {
    const $quizCard = document.createElement("div");
    $quizCard.classList.add("quiz-card");
    $quizCard.id = i;
    $quizCard.innerText = data[i].question;
    $quizBoard.appendChild($quizCard);
  }

  const $quizCard = document.querySelectorAll(".quiz-card");

  for (let i = 0; i < $quizCard.length; i++) {
    $quizCard[i].addEventListener("click", () => {
      if ($quizCard[i].classList.contains("answer")) {
        $quizCard[i].classList.remove("answer");
        $quizCard[i].textContent = data[i].question;
        $quizCard[i].classList.add("click");
      } else {
        $quizCard[i].classList.add("answer");
        $quizCard[i].textContent = data[i].anwser;
        $quizCard[i].classList.remove("click");
      }
    });
  }
}
