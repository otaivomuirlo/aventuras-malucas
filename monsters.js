export function addMonstroToMap(x, y, monstro, monstrosOnMap, updateTable) {
    monstrosOnMap.push({ monstro, x, y });
    updateTable();
}

export async function iniciarCombate(playerX, playerY, monstrosOnMap, setPlayerInCombat, showAlert) {
    const monstroProximo = monstrosOnMap.find(monstroObj => 
        Math.abs(monstroObj.x - playerX) <= 1 && Math.abs(monstroObj.y - playerY) <= 1
    );

    if (monstroProximo) {
        setPlayerInCombat(true);
        showAlert("Você entrou em modo de combate!");
        document.getElementById("botao-girar-dado").disabled = false;
        document.getElementById("combate-container").style.display = "block";
    } else {
        showAlert("Nenhum monstro próximo encontrado.");
    }
}

export function terminarCombate(setPlayerInCombat, showAlert) {
    setPlayerInCombat(false);
    document.getElementById("botao-girar-dado").disabled = true;
    showAlert("Você saiu do modo de combate.");
    document.getElementById("combate-container").style.display = "none";
}
