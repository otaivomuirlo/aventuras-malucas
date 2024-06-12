export function showAlert(message) {
    const alertBox = document.getElementById("result-alert");
    const newAlert = document.createElement("div");
    newAlert.textContent = message;
    alertBox.appendChild(newAlert);
}

export function girarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
}

export function updateTable(numRows, numCols, cellSize, playerX, playerY, itemsOnMap, monstrosOnMap, npcsOnMap, inventory, atualizarVida) {
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
            playerImage.src = "../imgs/protagonista.png";
            playerImage.width = 35;
            playerImage.height = 40;
            playerCell.appendChild(playerImage);
        }
    }

    atualizarVida();
}

export function atualizarVida(life) {
    document.getElementById("life").textContent = `Vida: ${life}`;
}
