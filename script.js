const Tamanho_Tabuleiro = 5;
let Tabuleiro = [];
let TabuleiroTiros = [];
let tirosRestantes;
let barcosRestantes;

function iniciarJogo() {
  console.log("Iniciando o jogo...");
  Tabuleiro = [];
  TabuleiroTiros = [];
  tirosRestantes = 10;
  barcosRestantes = 3;

  // Inicializa o tabuleiro lógico
  for (let i = 0; i < Tamanho_Tabuleiro; i++) {
    Tabuleiro[i] = [];
    TabuleiroTiros[i] = [];
    for (let j = 0; j < Tamanho_Tabuleiro; j++) {
      Tabuleiro[i][j] = false;
      TabuleiroTiros[i][j] = "~";
    }
  }

  Add_Random_Boat(3, Tabuleiro);

  // Cria o tabuleiro visual com as divs T_Block
  const tabuleiroHTML = document.getElementById('TabuleiroHtml');
  tabuleiroHTML.innerHTML = "";

  for (let i = 0; i < Tamanho_Tabuleiro; i++) {
    for (let j = 0; j < Tamanho_Tabuleiro; j++) {
      const bloco = document.createElement('div');
      bloco.classList.add('T_Block');
      bloco.setAttribute('data-i', i);
      bloco.setAttribute('data-j', j);
      bloco.addEventListener('click', () => atirar(i, j, bloco));
      tabuleiroHTML.appendChild(bloco);
    }
  }

  atualizarStatus();
}

function Add_Random_Boat(qtde, Tabuleiro) {
  let adicionados = 0;
  while (adicionados < qtde) {
    const i = Math.floor(Math.random() * Tamanho_Tabuleiro);
    const j = Math.floor(Math.random() * Tamanho_Tabuleiro);
    if (!Tabuleiro[i][j]) {
      Tabuleiro[i][j] = true;
      adicionados++;
    }
  }
}

function atirar(i, j, bloco) {
  if (tirosRestantes <= 0 || barcosRestantes <= 0) return;

  if (TabuleiroTiros[i][j] !== "~") {
    alert("Você já atirou aqui!");
    return;
  }

  tirosRestantes--;

  if (Tabuleiro[i][j]) {
    bloco.style.backgroundColor = "red";
    bloco.innerText = "X";
    Tabuleiro[i][j] = false;
    TabuleiroTiros[i][j] = "X";
    barcosRestantes--;
    alert("Acertou um barco!");
  } else {
    bloco.style.backgroundColor = "gray";
    bloco.innerText = "O";
    TabuleiroTiros[i][j] = "O";
    alert("Água!");
  }

  atualizarStatus();

  if (barcosRestantes <= 0) {
    alert("Parabéns! Você afundou todos os barcos!");
  } else if (tirosRestantes <= 0) {
    alert("Fim de jogo! Você perdeu!");
  }
}

function atualizarStatus() {
  const status = document.getElementById('status');
  status.innerHTML = `Tiros Restantes: ${tirosRestantes} | Barcos Restantes: ${barcosRestantes}`;
}

window.onload = iniciarJogo;
