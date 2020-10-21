init();
// 초급 9*9
// 중급 16*16
// 고급 30*16
function init() {
  let randomArr = [];
  const lowRow = 9;
  const lowColumn = 9;

  tagCreate();
  randomNumber();
  viewStatus();

  function viewStatus() {
    for (let i = 0; i < lowRow; i++) {
      for (let j = 0; j < lowColumn; j++) {
        document.getElementById(`${i}-${j}`).textContent = randomArr[i][j];
      }
    }
  }

  function installMine(chkRow, chekColumn) {
    for (let i = chkRow - 1; i < chkRow + 2; i++) {
      for (let j = chekColumn - 1; j < chekColumn + 2; j++) {
        if (
          i < 0 ||
          j < 0 ||
          i === lowRow ||
          j === lowColumn ||
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
        installMine(randomRow, randomcolumn, randomArr);
      }
    }
    console.log(randomArr);
  }

  function tagCreate() {
    const $gameBoard = document.querySelector(".game-board");

    for (let i = 0; i < lowRow; i++) {
      for (let j = 0; j < lowColumn; j++) {
        const $block = document.createElement("div");
        $block.classList.add("block");
        $block.id = `${i}-${j}`;
        $block.style.height = `${720 / lowColumn}px`;
        $block.style.width = `${720 / lowRow}px`;
        $gameBoard.appendChild($block);
      }
    }
  }
}
