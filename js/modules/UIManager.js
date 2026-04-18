export class UIManager {
    constructor() {
        this.stage = document.getElementById('video-stage');
    }

    // 動態計算網格排列
    rebalanceGrid() {
        const tiles = this.stage.querySelectorAll('.v-tile');
        const count = tiles.length;
        if (count === 0) return;

        const cols = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);

        this.stage.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        this.stage.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        
        console.log(`[UI] Grid Rebalanced: ${cols}x${rows}`);
    }

    createVideoTile(participantId, label) {
        const div = document.createElement('div');
        div.className = 'v-tile';
        div.id = `tile-${participantId}`;
        div.innerHTML = `
            <video id="v-${participantId}" autoplay playsinline></video>
            <div class="tile-label">${label}</div>
        `;
        this.stage.appendChild(div);
        this.rebalanceGrid();
        return document.getElementById(`v-${participantId}`);
    }

    removeTile(participantId) {
        const tile = document.getElementById(`tile-${participantId}`);
        if (tile) tile.remove();
        this.rebalanceGrid();
    }
}