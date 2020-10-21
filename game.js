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
  // installMine();
  // viewStatus();

  // function viewStatus() {
  //   const $blockId = document.querySelectorAll(".block");
  //   for (let i = 0; i < lowRow * lowColumn; i++) {
  //     if ($blockId[i].getAttribute("ismine") === "true") {
  //       $blockId[i].textContent = "mine";
  //     }

  //     // if(foo < 9)
  //     // if(foo % 9 === 0)
  //     // if(foo % 9 === 8)
  //     // if(foo > 71)
  //   }
  // }

  // function installMine() {
  //   const $blockId = document.querySelectorAll(".block");

  //   for (let i = 0; i < lowRow * lowColumn; i++) {
  //     $blockId[i].setAttribute("aroundmine", 0);
  //     for (let j = 0; j < randomArr.length; j++) {
  //       if (String(randomArr[j]) === $blockId[i].id) {
  //         $blockId[i].setAttribute("ismine", true);
  //       }
  //     }
  //   }
  // }

  function randomNumber() {
    const mineCount = 10;

    for (let i = 0; i < mineCount; i++) {
      const result = Math.floor(Math.random() * (lowRow * lowColumn));
      if (randomArr.includes(result)) {
        i--;
      } else {
        randomArr.push(result);
      }
    }
    console.log(randomArr);

    // let randomRow = Math.floor(Math.random() * lowRow);
    // let randomcolumn = Math.floor(Math.random() * lowColumn);

    // for (let i = 0; i < mineCount; i++) {
    //   if (randomArr[randomRow][randomcolumn] === "m") {
    //     i--;
    //   } else {
    //     randomArr[randomRow][randomcolumn] = "m";
    //   }
    // }
    // console.log(randomArr);
  }

  function tagCreate() {
    const $gameBoard = document.querySelector(".game-board");

    // for (let i = 0; i < lowColumn * lowRow; i++) {
    //   const $block = document.createElement("div");
    //   $block.classList.add("block");
    //   $block.id = i;
    //   $block.textContent = i; // 지울거임..
    //   $block.style.height = `${720 / lowColumn}px`;
    //   $block.style.width = `${720 / lowRow}px`;
    //   $gameBoard.appendChild($block);
    // }

    for (let i = 0; i < lowRow; i++) {
      for (let j = 0; j < lowColumn; j++) {
        const $block = document.createElement("div");
        $block.classList.add("block");
        $block.id = `${i}-${j}`;
        $block.textContent = $block.id; // 지울거임..
        $block.style.height = `${720 / lowColumn}px`;
        $block.style.width = `${720 / lowRow}px`;
        $gameBoard.appendChild($block);
      }
    }
  }
}
