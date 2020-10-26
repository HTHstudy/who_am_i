(function () {
  let randomArr = [];
  let checkArr = [];
  let mineCount = 10;
  const lowRow = 9;
  const lowColumn = 9;
  const $mineCounter = document.getElementById("score");

  $mineCounter.innerHTML = mineCount;
  randomNumber();
  createTag();
  openBlock();

  function gameOver(mineCount) {
    let winGame = true;
    if (mineCount === 0) {
      const $block = document.querySelectorAll(".block");
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
      console.log(winGame);
    }
  }

  function openBlock() {
    const $block = document.querySelectorAll(".block");
    $block.forEach((block) => {
      // 좌클릭 이벤트
      block.addEventListener("click", function () {
        const id = block.id;
        const row = id.substr(0, 1);
        const column = id.substr(2, 1);
        if (randomArr[row][column] === "m") {
          block.classList.add("ismine");
          alert("game over");
          mineCount--;
          $mineCounter.innerHTML = mineCount;
        }

        viewBlock(row, column);
      });
    });
    $block.forEach((block) => {
      // 우클릭 이벤트
      const id = block.id;
      const row = id.substr(0, 1);
      const column = id.substr(2, 1);
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

        gameOver(mineCount);
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
        document.getElementById(`${row}-${column}`).style.backgroundColor =
          "#505050";
        for (let i = row - 1; i < row + 2; i++) {
          for (let j = column - 1; j < column + 2; j++) {
            if (
              i < 0 ||
              j < 0 ||
              i >= lowRow ||
              j >= lowColumn ||
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
          i >= lowRow ||
          j >= lowColumn ||
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
    const $block = document.querySelectorAll(".block");

    for (let i = 0; i < lowRow; i++) {
      // 2차원 배열 만들어주기.
      randomArr.push([]);
      for (let j = 0; j < lowColumn; j++) {
        randomArr[i].push(0);
      }
    }

    for (let i = 0; i < mineCount; i++) {
      let randomRow = Math.floor(Math.random() * lowRow);
      let randomcolumn = Math.floor(Math.random() * lowColumn);

      if (randomArr[randomRow][randomcolumn] === "m") {
        i--;
      } else {
        randomArr[randomRow][randomcolumn] = "m";
        checkMine(randomRow, randomcolumn, randomArr);
      }
    }
    console.log(randomArr);
  }

  function createTag() {
    const $app = document.querySelector("#app");

    for (let i = 0; i < lowRow; i++) {
      for (let j = 0; j < lowColumn; j++) {
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
