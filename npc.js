class Npc {
    constructor(name, message, imageSrc) {
        this.name = name;
        this.message = message;
        this.imageSrc = imageSrc;
    }
}

export function addNpcToMap(name, message, imageSrc, x, y, npcsOnMap, updateTable) {
    const npc = new Npc(name, message, imageSrc);
    npcsOnMap.push({ npc, x, y });
    updateTable();
}

export function interagirComNpc(playerX, playerY, npcsOnMap, showAlert) {
    const npc = npcsOnMap.find(npcObj => npcObj.x === playerX && npcObj.y === playerY);
    if (npc) {
        showAlert(`Você encontrou ${npc.npc.name}: ${npc.npc.message}`);
    }
}
