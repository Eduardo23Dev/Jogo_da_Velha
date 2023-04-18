const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let turnPlayer = "";

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>';
  updateTitle();
  boardRegions.forEach(function (ev) {
    ev.classList.remove("win");
    ev.innerText = "";
    ev.addEventListener("click", handleBoardClick);
    ev.style.background = "white";
  });
}

function disableRagion(element) {
  element.style.cursor = "default";
  element.removeEventListener("click", handleBoardClick);
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function handleWin(regions) {
  regions.forEach((region) => {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const player = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = player + " venceu!";
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = ev.currentTarget.dataset.region;
  const rowColumPair = region.split(".");
  const row = rowColumPair[0];
  const colum = rowColumPair[1];
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][colum] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][colum] = "O";
  }
  console.clear();
  console.table(vBoard);
  disableRagion(span);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
    boardRegions.forEach((ele) => {
      ele.style.cursor = "default";
      ele.removeEventListener("click", handleBoardClick);
    });
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
    boardRegions.forEach((element) => {
      element.style.background = "red";
    });
  }
}

document.getElementById("start").addEventListener("click", initializeGame);
