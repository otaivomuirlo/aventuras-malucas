class Npc {
    constructor(name, message, imageSrc) {
        this.name = name;
        this.message = message;
        this.imageSrc = imageSrc;
    }
}

function interagirComNpc() {
    const npcProximo = npcsOnMap.find(npc => Math.abs(npc.x - playerX) <= 0.5 && Math.abs(npc.y - playerY) <= 0.5);
    if (npcProximo) {
        showAlert(npcProximo.message);
    }
}

let npcsOnMap = [];

function addNpcToMap(name, message, imageSrc, x, y) {
    const npc = new Npc(name, message, imageSrc);
    npcsOnMap.push({ npc, x, y });
    updateTable();
}



document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.getElementById("next-button");
    if (!nextButton) return;

    nextButton.addEventListener("click", function () {
        showNextParagraph();
    });
    atualizarVisibilidadeMapa();
});

const transitionBlocks = [
    { x: 17, y: 8, newMap: "mapa2" },
    { x: 17, y: 9, newMap: "mapa2" },
    { x: 17, y: 10, newMap: "mapa2" },
];


function loadMap(mapName) {
    if (mapName === "mapa2") {

        numRows = 20;  
        numCols = 20;  
        playerX = 1;
        playerY = 1;

        monstrosOnMap = [];
        npcsOnMap = [];
        itemsOnMap = [];


        addNpcToMap("Guarda", "!!!tem um monstro muito forte a frente pegue a armadura e tenha cuidado!!!", "imgs/guarda.png", 2, 2);

    }

    updateTable();
    atualizarVisibilidadeMapa();
    atualizarVida();
}


function showNextParagraph() {
    const storyParagraphs = [
        "Seu único item é uma pequena adaga enferrujada...",
        "Sua melhor esperança agora é explorar essa floresta desconhecida",
    ];

    const storyParagraph = document.getElementById("story-paragraph");
    const nextButton = document.getElementById("next-button");
    if (!storyParagraph || !nextButton) return;

    let currentIndex = parseInt(storyParagraph.dataset.index) || 0;

    if (currentIndex < storyParagraphs.length) {
        storyParagraph.textContent = storyParagraphs[currentIndex];
        currentIndex++;
        storyParagraph.dataset.index = currentIndex;
        if (currentIndex === storyParagraphs.length) {
            nextButton.textContent = "...";
            nextButton.disabled = true;
        }
    }
}
const numRows = 18;
const numCols = 30;
const cellSize = 40;
console.log("numRows:", numRows);
console.log("numCols:", numCols);
const storyParagraph = document.getElementById("story-paragraph");
const storyText = ""; 
let index = 0;

function typeWriter() {
    if (index < storyText.length) {
        storyParagraph.innerHTML += storyText.charAt(index);
        index++;
        setTimeout(typeWriter, 50); 
    }
}
setTimeout(typeWriter, 1000);
window.onload = function () {
    typeWriter();
};
document.getElementById("play-button").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
});

document.getElementById("about-button").addEventListener("click", function() {
    document.getElementById("about-container").style.display = "block";
});

document.getElementById("close-about-button").addEventListener("click", function() {
    document.getElementById("about-container").style.display = "none";
});

document.getElementById("exit-button").addEventListener("click", function() {
    window.location.href = "https://www.google.com";
});

document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.getElementById("next-button");
    if (!nextButton) return;

    nextButton.addEventListener("click", function () {
        showNextParagraph();
    });
    atualizarVisibilidadeMapa();
});

class Item {
    constructor(name, imageSrc) {
        this.name = name;
        this.imageSrc = imageSrc;
    }
}

class Mapa {
    constructor() {
        this.nome = "Mapa";
        this.imagemSrc = "imgs/mapa.png"; // Substitua pelo caminho da imagem do mapa
    }
}

let playerDano = 0;
let playerX = 9;
let playerY = 11;
let life = 100;
let inventory = [];
let itemsOnMap = [];
let monstrosOnMap = [];
let isPlayerInCombat = false;
const barriers = [];


function removeFromInventory(itemName, arr) {
    const index = arr.findIndex(item => item.name === itemName);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function hasItemInInventory(itemName) {
    return inventory.some(item => item.name === itemName);
}

function verificarEspada() {
    const espadaIndex = inventory.findIndex(item => item.name === "Espada");
    if (espadaIndex !== -1) {
        playerDano += 60;
        showAlert("Você pegou a espada e adquiriu +60 de dano!");
    }
}

function addToInventory(item) {
    inventory.push(item);
    updateInventory();
    const inventoryList = document.getElementById("items");
    const itemElement = document.createElement("li");
    itemElement.textContent = item.name;
    inventoryList.appendChild(itemElement);
}

function criarParedeVertical(inicioX, inicioY, finalX) {
    for (let x = inicioX; x <= finalX; x++) {
        barriers.push({ x, y: inicioY });
    }
}

function criarParedeHorizontal(inicioX, inicioY, finalY) {
    for (let y = inicioY; y <= finalY; y++) {
        barriers.push({ x: inicioX, y });
    }
}


function realizarAtaqueMonstro() {
    if (isPlayerInCombat) {
        const monstroIndex = monstrosOnMap.findIndex(monstroObj =>
            Math.abs(monstroObj.x - playerX) <= 1 && Math.abs(monstroObj.y - playerY) <= 1
        );

        if (monstroIndex !== -1) {
            const monstro = monstrosOnMap[monstroIndex].monstro;
            const resultadoDadoMonstro = girarDado(20);
            const danoCausadoMonstro = resultadoDadoMonstro * monstro.dano;
            life -= danoCausadoMonstro;

            if (life <= 0) {
                showAlert("Você morreu! Fim de jogo.");
                showAlert("Reiniciando em 5 segundos");
                reiniciarPagina();
            } else {
                showAlert(`O ${monstro.name} atacou você! Causou ${danoCausadoMonstro} de dano.`);
                showAlert(`Vida restante: ${life}`);
                atualizarVida();
            }
        }
    }
}


function addItemToMap(name, imageSrc, x, y) {
    const item = new Item(name, imageSrc);
    itemsOnMap.push({ item, x, y });
    updateTable();
}

function addMonstroToMap(name, imageSrc, dano, vida, x, y) {
    const monstro = { name, imageSrc, dano, vida };
    monstrosOnMap.push({ monstro, x, y });
    updateTable();
}

function iniciarCombate() {
    if (isPlayerInCombat) {
        showAlert("Você já está em combate!");
        document.getElementById("botao-girar-dado").disabled = false;
        return;
    }

    const monstroProximo = monstrosOnMap.find(monstroObj =>
        Math.abs(monstroObj.x - playerX) <= 0.5 && Math.abs(monstroObj.y - playerY) <= 0.5
    );

    if (monstroProximo) {
        isPlayerInCombat = true;
        showAlert("Você entrou em modo de combate!");
        document.getElementById("botao-girar-dado").disabled = false;
        document.getElementById("combate-container").style.display = "block";
    }
}

function terminarCombate() {
    isPlayerInCombat = false;
    document.getElementById("botao-girar-dado").disabled = true;
    showAlert("Você saiu do modo de combate.");
    document.getElementById("combate-container").style.display = "none";
}

function realizarAtaque() {
    if (!isPlayerInCombat) {
        showAlert("Você não está em combate!");
        return;
    }

    const resultadoDado = girarDado(20);
    const danoCausado = resultadoDado * (playerDano + 10); // 10 de dano base
    const monstroIndex = monstrosOnMap.findIndex(monstroObj =>
        Math.abs(monstroObj.x - playerX) <= 1 && Math.abs(monstroObj.y - playerY) <= 1
    );

    if (monstroIndex !== -1) {
        const monstro = monstrosOnMap[monstroIndex].monstro;
        monstro.vida -= danoCausado;

        if (monstro.vida <= 0) {
            showAlert("Você derrotou o monstro!");
            monstrosOnMap.splice(monstroIndex, 1);
            terminarCombate();
        } else {
            showAlert(`Você causou ${danoCausado} de dano ao ${monstro.name}.`);
            showAlert(`Vida restante: ${monstro.vida}`);
            atualizarVida();
        }
    }
}

function girarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
}

function logPlayerPosition() {
    console.log(`Player position: (${playerX}, ${playerY})`);
}

function updateTable() {
    const table = document.querySelector("table");
    table.innerHTML = '';

    const totalWidth = numCols * cellSize;
    const totalHeight = numRows * cellSize;

    const offsetX = (window.innerWidth - totalWidth) / 2;
    const offsetY = (window.innerHeight - totalHeight) / 2;

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("td");
            cell.id = `cell${i}${j}`;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            const fogElement = document.createElement('div');
            fogElement.classList.add('fog');
            cell.prepend(fogElement);

            const itemOnCellIndex = itemsOnMap.findIndex(item => item.x === i && item.y === j);
            if (itemOnCellIndex !== -1) {
                const itemOnCell = itemsOnMap[itemOnCellIndex];
                const itemImage = document.createElement('img');
                itemImage.src = itemOnCell.item.imageSrc;
                itemImage.classList.add('Gif_Img');
                cell.appendChild(itemImage);
            }

            const monstroOnCell = monstrosOnMap.find(monstroObj => monstroObj.x === i && monstroObj.y === j);
            if (monstroOnCell) {
                const monstroImage = document.createElement('img');
                monstroImage.src = monstroOnCell.monstro.imageSrc;
                monstroImage.classList.add('Gif_Img');
                cell.appendChild(monstroImage);
            }

            const npcOnCell = npcsOnMap.find(npcObj => npcObj.x === i && npcObj.y === j);
            if (npcOnCell) {
                const npcImage = document.createElement('img');
                npcImage.src = npcOnCell.npc.imageSrc;
                npcImage.classList.add('Gif_Img');
                cell.appendChild(npcImage);
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    table.style.position = 'absolute';
    table.style.left = `${offsetX}px`;
    table.style.top = `${offsetY}px`;

    if (playerX >= 0 && playerX < numRows && playerY >= 0 && playerY < numCols) {
        const playerCell = document.getElementById(`cell${playerX}${playerY}`);
        if (playerCell) {
            const playerImage = document.createElement('img');
            playerImage.src = "imgs/pixil-frame-0.png";
            playerImage.width = 35;
            playerImage.height = 40;
            playerCell.appendChild(playerImage);
        }
    }

    atualizarVida();
}


function isBarrier(x, y) {
    return barriers.some(coordenada => coordenada.x === x && coordenada.y === y);
}



function movePlayer(event) {
    if (isPlayerInCombat) {
        showAlert("Você está em combate! Gire o dado para atacar.");
        return;
    }


    let newPlayerX = playerX;
    let newPlayerY = playerY;
    const moveDistance = 0.5;

    switch (event.key) {
        case "ArrowUp":
            if (newPlayerX > 0 && !isBarrier(newPlayerX - moveDistance, playerY)) {
                newPlayerX -= moveDistance;
            }
            break;
        case "ArrowDown":
            if (newPlayerX < numRows - 1 && !isBarrier(newPlayerX + moveDistance, playerY)) { 
                newPlayerX += moveDistance;
            }
            break;
        case "ArrowLeft":
            if (newPlayerY > 0 && !isBarrier(newPlayerX, newPlayerY - moveDistance)) {
                newPlayerY -= moveDistance;
            }
            break;
        case "ArrowRight":
            if (newPlayerY < numCols - 1 && !isBarrier(newPlayerX, newPlayerY + moveDistance)) { 
                newPlayerY += moveDistance;
            }
            break;
    }

    // Verificar interação com itens
    const itemIndex = itemsOnMap.findIndex(item => item.x === newPlayerX && item.y === newPlayerY);
    if (itemIndex !== -1) {
        const pickedItem = itemsOnMap.splice(itemIndex, 1)[0];
        addToInventory(pickedItem.item);
    }

    // Verificar interação com monstros
    iniciarCombate();

    // Atualizar a posição do jogador e a tabela
    if (newPlayerX >= 0 && newPlayerX < numRows && newPlayerY >= 0 && newPlayerY < numCols) {
        playerX = newPlayerX;
        playerY = newPlayerY;
        updateTable();
    }

    // Verificar interação com NPCs
    interagirComNpc();

    // Verificar se o jogador está em um bloco de transição
    const transitionBlock = transitionBlocks.find(block => block.x === playerX && block.y === playerY);
    if (transitionBlock) {
        loadMap(transitionBlock.newMap);
    }

    atualizarVisibilidadeMapa();
    atualizarVida();
    interagirComNpc();
    verificarMapa();;
}


function atualizarResultadoDado(resultado) {
    const resultadoDadoElement = document.getElementById("resultado-dado");
    resultadoDadoElement.textContent = `Resultado do Dado: ${resultado}`;
}

function atualizarVida() {
    document.getElementById("life").textContent = `Vida: ${life}`;
}

function updateInventory() {
    const hasPotion = hasItemInInventory("Poção");
    const botaoCurar = document.getElementById("botao-curar");
    if (hasPotion) {
        botaoCurar.style.display = "block";
    } else {
        botaoCurar.style.display = "none"; 
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botao-girar-dado").addEventListener("click", function () {
        if (isPlayerInCombat) {
            const resultadoDado = girarDado(20);
            atualizarResultadoDado(resultadoDado);
            realizarAtaque();
            realizarAtaqueMonstro();
        }
    });
});

document.getElementById("botao-curar").addEventListener("click", function () {
    if (hasItemInInventory("Poção")) {
        removeFromInventory("Poção", inventory);
        life += 30; // Aumenta a vida em 30 ao usar a poção
        atualizarVida(); // Atualiza a vida do jogador na div 'life'
        updateInventory();
        showAlert("Você usou uma Poção e recuperou 30 de vida!");
    }
});

addItemToMap("Poção", "imgs/abacate.png", 9, 7);
addItemToMap("Poção", "imgs/abacate.png", 16, 15);
addItemToMap("Poção", "imgs/abacate.png", 9, 5);
addItemToMap("Espada", "imgs/SPADA.png", 6, 3);

addItemToMap("Mapa", "imgs/mapa.png", 10, 15);
addMonstroToMap("alien", "imgs/boss.png", 8, 900, 2, 16);
addMonstroToMap("Monstro do Lago", "imgs/agua.png", 70, 850, 2, 8);
addMonstroToMap("arvore", "imgs/dinosario.png", 5, 900, 4, 10);
addMonstroToMap("arvore", "imgs/dinosario.png", 5, 900, 8, 17);
addMonstroToMap("caveira", "imgs/cavera.png", 5, 1000, 17, 19);

document.addEventListener("keydown", function(event) {
    movePlayer(event);
    
})

function showAlert(message) {
    const alertBox = document.getElementById("result-alert");
    const newAlert = document.createElement("div");
    newAlert.textContent = message;
    alertBox.appendChild(newAlert);
}

function reiniciarPagina() {
    setTimeout(function() {
        location.reload();
    }, 5000); 
}

function limparDiv() {
    var div = document.getElementById('result-alert');
    div.innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function () {
    var botao = document.getElementById('botaoLimpar');
    botao.addEventListener("click", limparDiv);
});

var botao = document.getElementById('botaoLimpar');
botao.onclick = limparDiv;

function atualizarVisibilidadeMapa() {
    let alcanceVisual = 1;
    if (hasItemInInventory("Mapa")) {
        alcanceVisual = 10; // Aumenta o alcance visual se o jogador tiver o mapa no inventário
    }

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.getElementById(`cell${i}${j}`);
            const distancia = Math.abs(playerX - i) + Math.abs(playerY - j);

            if (distancia > alcanceVisual) {
                cell.style.visibility = "hidden";

                const fogElement = document.createElement('div');
                fogElement.classList.add('fog');
                cell.prepend(fogElement);
            } else {
                cell.style.visibility = "visible";

                const fogElement = cell.querySelector('.fog');
                if (fogElement) {
                    cell.removeChild(fogElement);
                }
                if (playerX === i && playerY === j) {
                    cell.style.visibility = "visible";
                }
            }
        }
    }
}



function revelarArea(centerX, centerY, alcance) {
    for (let i = centerX - alcance; i <= centerX + alcance; i++) {
        for (let j = centerY - alcance; j <= centerY + alcance; j++) {
            if (i >= 0 && i < numRows && j >= 0 && j < numCols) {
                const cell = document.getElementById(`cell${i}${j}`);
                if (cell) {
                    cell.style.visibility = "visible";
                    const fogElement = cell.querySelector('.fog');
                    if (fogElement) {
                        fogElement.style.display = "none";
                    }
                }
            }
        }
    }
}
function verificarMapa() {
    const itemMapaEncontrado = itemsOnMap.findIndex(item => item.item.name === "Mapa" && item.x === playerX && item.y === playerY);

    if (itemMapaEncontrado !== -1) {
        const mapa = itemsOnMap.splice(itemMapaEncontrado, 1)[0];
        addToInventory(mapa.item);
        showAlert("Você pegou o mapa! A área ao redor foi revelada.");
        atualizarVisibilidadeMapa(); // Atualize a visibilidade do mapa após pegar o mapa
    }
}

document.addEventListener("keydown", function(event) {
    movePlayer(event);
    verificarMapa();
});