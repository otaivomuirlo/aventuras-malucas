class Item {
    constructor(name, imageSrc) {
        this.name = name;
        this.imageSrc = imageSrc;
    }
}

export function addItemToMap(name, imageSrc, x, y, itemsOnMap, updateTable) {
    const item = new Item(name, imageSrc);
    itemsOnMap.push({ item, x, y });
    updateTable();
}

export function addToInventory(item, inventory, updateInventory, verificarEspada) {
    inventory.push(item);
    updateInventory();

    const inventoryList = document.getElementById("items");
    const itemElement = document.createElement("li");
    itemElement.textContent = item.name;
    inventoryList.appendChild(itemElement);

    if (item.name === "Espada") {
        verificarEspada(inventory);
    }
}

export function removeFromInventory(itemName, inventory) {
    const index = inventory.findIndex(item => item.name === itemName);
    if (index !== -1) {
        inventory.splice(index, 1);
    }
}

export function hasItemInInventory(itemName, inventory) {
    return inventory.some(item => item.name === itemName);
}

export function verificarEspada(inventory, setPlayerDano, showAlert) {
    if (inventory.find(item => item.name === "Espada")) {
        setPlayerDano(60); 
        showAlert("Você pegou a espada e adquiriu +60 de dano!");
    }
}
