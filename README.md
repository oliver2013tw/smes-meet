1. 系統定位與存取機制
本系統為專屬 石門國小 (SMES) 的視訊會議平台。透過 Firebase Authentication 實作帳號登入，並在前端程序中強制過濾僅限 @mail2.smes.tyc.edu.tw 網域用戶存取。
2. 核心技術棧與工具鏈
通訊服務： 整合 LiveKit 雲端方案，負責 WebRTC 媒體流（音訊/視訊軌道）的發布與訂閱管理。
後端與安全： * 使用 Firebase 處理用戶帳號資訊與資料庫存儲。
透過 Vercel Serverless Functions 建立 API 中轉站，安全地取得 LiveKit API 金鑰與 Token，確保敏感資訊不外洩。
部署平台： 前端網頁託管於 GitHub Pages。
開發規範： 字體統一採用 JetBrains Mono。
3. 多 AI 協作開發流程 (約數千行代碼)
- Claude： 負責生成核心 HTML 結構與基礎 CSS 框架。
- Gemini： 負責代碼除錯（Debug）與邏輯審查，針對 WebRTC 與 Firebase 集成的異步問題提供優化方案。
- DeepSeek： 負責後期核心邏輯重構。在不變動既有 UI 與驗證邏輯的前提下，針對 LiveKit 的連線與傳輸模組進行深度重寫。
