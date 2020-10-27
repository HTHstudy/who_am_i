(function () {
  let randomArr = [];
  let checkArr = [];
  let mineCount = 10;
  const setRow = 9;
  const setColumn = 9;
  // 초급: 9*9, 지뢰 10개
  // 중급: 16*16, 지뢰 40개
  // 고급: 30* 16, 지뢰 99개
  // 난이도 선택 추가 예정
  const $mineCounter = document.getElementById("score");
  const $resetBtn = document.getElementById("restart");
  const $ruleBtn = document.querySelector(".rule-button");

  $ruleBtn.addEventListener("click", () => {
    const $rulePage = document.querySelector(".rule");
    if ($rulePage.classList.contains("hidden")) {
      $rulePage.classList.add("view");
      $rulePage.classList.remove("hidden");
    } else {
      $rulePage.classList.add("hidden");
      $rulePage.classList.remove("view");
    }
  });

  $mineCounter.innerHTML = mineCount;
  randomNumber();
  createBoard();
  openBlock();

  $resetBtn.addEventListener("click", function () {
    GameRestart();
  });

  function GameRestart() {
    resetGame();
    randomArr = [];
    checkArr = [];
    mineCount = 10;
    $mineCounter.innerHTML = mineCount;
    randomNumber();
    createBoard();
    openBlock();
  }

  function resetGame() {
    const $block = document.querySelectorAll(".block");
    const $gameContainer = document.querySelector(".game-container");
    const $gameResult = document.querySelector(".game-result");

    $block.forEach((block) => {
      block.parentNode.removeChild(block);
    });
    $gameContainer.classList.remove("result-bg");
    if ($gameResult) $gameResult.parentNode.removeChild($gameResult);
  }

  function gameOver(result) {
    const $block = document.querySelectorAll(".block");
    const $body = document.querySelector("body");
    const $gameContainer = document.querySelector(".game-container");
    const $gameResult = document.createElement("div");
    const $pTag = document.createElement("p");

    $block.forEach((block) => {
      block.style.pointerEvents = "none"; // 게임이 종료되면 블록 클릭 금지
    });
    $gameContainer.classList.add("result-bg");
    $gameResult.classList.add("game-result");
    if (result) {
      $gameResult.style.backgroundColor = "blue";
      $pTag.innerHTML = "승리 하셨습니다.";
    } else {
      $gameResult.style.backgroundColor = "red";
      $pTag.innerHTML = "패배 하셨습니다.";
    }

    $gameResult.appendChild($pTag);
    $body.appendChild($gameResult);
  }

  function gameResult(mineCount) {
    let winGame = true;
    const $block = document.querySelectorAll(".block");
    if (mineCount === 0) {
      $block.forEach((block) => {
        const id = block.id;
        const row = id.substr(0, 1);
        const column = id.substr(2, 1);
        const checkValue = randomArr[row][column];
        if (block.getAttribute("isminecheck") === "true") {
          checkArr.push(checkValue);
        }
      });
      for (let i = 0; i < checkArr.length; i++) {
        if (checkArr[i] !== "m") {
          winGame = false;
        }
      }
      gameOver(winGame);
    }
  }

  function openBlock() {
    const $block = document.querySelectorAll(".block");
    $block.forEach((block) => {
      // 좌클릭 이벤트
      block.addEventListener("click", function () {
        const id = block.id;
        const idArr = id.split("-");

        const row = idArr[0]; //id.substr(0, 1);
        const column = idArr[1]; //id.substr(2, 1);
        if (randomArr[row][column] === "m") {
          block.classList.add("ismine");
          mineCount--;
          $mineCounter.innerHTML = mineCount;

          gameOver(false);
        }

        viewBlock(row, column);
      });
    });
    $block.forEach((block) => {
      // 우클릭 이벤트
      const id = block.id;
      // const row = id.substr(0, 1);
      // const column = id.substr(2, 1);
      block.addEventListener("contextmenu", function () {
        if (block.getAttribute("isclicked") === "false") {
          block.classList.add("flag");
          block.setAttribute("isminecheck", true);
          block.setAttribute("isclicked", true);
          mineCount--;
        } else {
          if (block.getAttribute("isminecheck") === "true") {
            block.classList.remove("flag");
            block.setAttribute("isminecheck", false);
            block.setAttribute("isclicked", false);
            mineCount++;
          }
        }
        $mineCounter.innerHTML = mineCount;

        gameResult(mineCount);
      });
    });
  }
  function viewBlock(row, column) {
    const aroundMine = randomArr[row][column];
    const isClicked = document
      .getElementById(`${row}-${column}`)
      .getAttribute("isclicked");
    const isMineCheck = document
      .getElementById(`${row}-${column}`)
      .getAttribute("isminecheck");

    if (isMineCheck !== "true") {
      if (aroundMine !== 0) {
        if (isClicked === "false") {
          if (aroundMine !== "m") {
            document.getElementById(`${row}-${column}`).innerHTML =
              randomArr[row][column];
            document
              .getElementById(`${row}-${column}`)
              .setAttribute("isclicked", true);
          }
        }
        return;
      } else {
        // 주변 지뢰 0일때
        document
          .getElementById(`${row}-${column}`)
          .setAttribute("isclicked", true);
        document
          .getElementById(`${row}-${column}`)
          .classList.add("zeroclicked");

        for (let i = row - 1; i < row + 2; i++) {
          for (let j = column - 1; j < column + 2; j++) {
            if (
              i < 0 ||
              j < 0 ||
              i >= setRow ||
              j >= setColumn ||
              (i === row && j === column) ||
              isClicked === "true"
            ) {
              continue;
            }
            viewBlock(i, j);
          }
        }
      }
    }
  }

  function checkMine(chkRow, chekColumn) {
    for (let i = chkRow - 1; i < chkRow + 2; i++) {
      for (let j = chekColumn - 1; j < chekColumn + 2; j++) {
        if (
          i < 0 ||
          j < 0 ||
          i >= setRow ||
          j >= setColumn ||
          (i === chkRow && j === chekColumn)
        ) {
          continue;
        }
        randomArr[i][j] += randomArr[i][j] !== "m" ? 1 : "";
      }
    }
  }

  function randomNumber() {
    const mineCount = 10;

    for (let i = 0; i < setRow; i++) {
      // 2차원 배열 만들어주기.
      randomArr.push([]);
      for (let j = 0; j < setColumn; j++) {
        randomArr[i].push(0);
      }
    }

    for (let i = 0; i < mineCount; i++) {
      let randomRow = Math.floor(Math.random() * setRow);
      let randomcolumn = Math.floor(Math.random() * setColumn);

      if (randomArr[randomRow][randomcolumn] === "m") {
        i--;
      } else {
        randomArr[randomRow][randomcolumn] = "m";
        checkMine(randomRow, randomcolumn, randomArr);
      }
    }
  }

  function createBoard() {
    const $app = document.getElementById("app");
    $app.style.height = `${setRow * 30}px`;
    $app.style.width = `${setColumn * 30}px`;

    for (let i = 0; i < setRow; i++) {
      for (let j = 0; j < setColumn; j++) {
        const $block = document.createElement("div");
        $block.classList.add("block");
        $block.id = `${i}-${j}`;
        $block.setAttribute("isclicked", false);
        $block.setAttribute("isminecheck", false);
        $app.appendChild($block);
      }
    }
  }
})();
