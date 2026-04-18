import { AuthManager } from './modules/AuthManager.js';
import { MeetingManager } from './modules/MeetingManager.js';
import { UIManager } from './modules/UIManager.js';
import { CONFIG } from './config.js';

class SmesApp {
    constructor() {
        this.ui = new UIManager();
        this.meeting = new MeetingManager(this.ui);
        this.auth = new AuthManager();
        this.init();
    }

    async init() {
        // 1. 監聽認證狀態
        this.auth.onUserReady(async (user) => {
            document.getElementById('scr-auth').classList.remove('active');
            
            // 2. 取得 Token 並加入會議
            const token = await this.fetchToken(user);
            this.meeting.join(CONFIG.LIVEKIT_URL, token);
        });

        // 3. 綁定按鈕事件
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.d-btn').forEach(btn => {
            btn.onclick = (e) => this.handleAction(e.currentTarget.dataset.action);
        });
    }

    async fetchToken(user) {
        const res = await fetch(CONFIG.TOKEN_API, {
            method: 'POST',
            body: JSON.stringify({ roomName: 'MAIN', username: user.displayName })
        });
        const data = await res.json();
        return data.token;
    }

    handleAction(action) {
        console.log(`[App] Action: ${action}`);
        // 根據 action 呼叫 meeting 或 ui 模組
    }
}

// 啟動應用程式
new SmesApp();