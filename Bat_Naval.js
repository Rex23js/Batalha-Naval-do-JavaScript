const prompt = require("prompt-sync")();
const Tamanho_Tabuleiro = 5;

function jogar() {
  let Tabuleiro = [];
  let TabuleiroTiros = [];

  for (let i = 0; i < Tamanho_Tabuleiro; i++) {
    Tabuleiro[i] = [];
    TabuleiroTiros[i] = [];
    for (let j = 0; j < Tamanho_Tabuleiro; j++) {
      Tabuleiro[i][j] = false;
      TabuleiroTiros[i][j] = "~"; // "~" significa que o tiro ainda não foi feito nessa posição
    }
  }

  Add_Random_Boat(6, Tabuleiro);

  let tirosRestantes = 10;
  let barcosRestantes = 3;

  console.log(
    "\nBem-vindo Ao Jogo De Batalha Naval! Seu Objetivo É Afundar 3 Barcos Utilizando 10 Tiros\nCoordenadas válidas: de X:0 Y:0 até X:4 Y:4\n"
  );

  while (tirosRestantes > 0 && barcosRestantes > 0) {
    console.log(`Tiros Restantes: ${tirosRestantes}`);
    mostrarTabuleiroTiros(TabuleiroTiros);

    const acertou = atirar(Tabuleiro, TabuleiroTiros);

    if (acertou === true) {
      barcosRestantes--;
      tirosRestantes--;
    } else if (acertou === false) {
      tirosRestantes--;
    }
    // Se acertou for undefined, não gasta tiro (coordenada inválida ou repetida)
  }

  if (barcosRestantes === 0) {
    console.log("*** Parabéns! Você Afundou Todos Os Barcos! ***");
  } else {
    console.log("*** Fim De Jogo! Você Não Conseguiu Afundar Todos Os Barcos! ***");
  }
}

function Add_Random_Boat(quantidade, Tabuleiro) {
  let barcosAdicionados = 0;
  while (barcosAdicionados < quantidade) {
    const x = Math.floor(Math.random() * Tamanho_Tabuleiro);
    const y = Math.floor(Math.random() * Tamanho_Tabuleiro);

    if (!Tabuleiro[x][y]) {
      Tabuleiro[x][y] = true;
      barcosAdicionados++;
    }
  }
}

function atirar(Tabuleiro, TabuleiroTiros) {
  const x = parseInt(prompt("Digite a Coordenada X (Linha): "));
  const y = parseInt(prompt("Digite a Coordenada Y (Coluna): "));

  if (x >= 0 && x < Tamanho_Tabuleiro && y >= 0 && y < Tamanho_Tabuleiro) {
    if (TabuleiroTiros[x][y] !== "~") {
      console.log("*** Você já atirou aqui! Escolha outra coordenada. ***");
      return undefined;
    }

    if (Tabuleiro[x][y] === true) {
      console.log("*** Barco Naufragado! ***");
      Tabuleiro[x][y] = false;
      TabuleiroTiros[x][y] = "X";
      return true;
    } else {
      console.log("*** Tiro Na Água! ***");
      TabuleiroTiros[x][y] = "O";
      return false;
    }
  } else {
    console.log("*** Coordenadas Inválidas! Tente Novamente! ***");
    return undefined;
  }
}

function mostrarTabuleiroTiros(TabuleiroTiros) {
  console.log("\nTabuleiro de Tiros:");
  console.log("  0 1 2 3 4");
  for (let i = 0; i < Tamanho_Tabuleiro; i++) {
    let linha = i + " ";
    for (let j = 0; j < Tamanho_Tabuleiro; j++) {
      linha += TabuleiroTiros[i][j] + " ";
    }
    console.log(linha);
  }
  console.log("\nLegenda: X = Acertou | O = Água | ~ = Não atirou ainda\n");
}

// Loop principal do jogo
let continuar = true;
while (continuar) {
  jogar();

  let resposta = prompt("\nDeseja jogar novamente? (s/n): ").toLowerCase();
  if (resposta !== "s" && resposta !== "sim") {
    continuar = false;
    console.log("\nObrigado por jogar! Até a próxima!");
  }
}
