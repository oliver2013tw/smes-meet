import { Room, RoomEvent, Track } from 'https://cdn.jsdelivr.net/npm/livekit-client@2.5.8/+esm';

export class MeetingManager {
    constructor(uiManager) {
        this.ui = uiManager;
        this.room = new Room({ adaptiveStream: true, dynacast: true });
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.room.on(RoomEvent.ParticipantConnected, p => {
            console.log(`[Meeting] Participant joined: ${p.identity}`);
        });

        this.room.on(RoomEvent.TrackSubscribed, (track, pub, p) => {
            if (track.kind === Track.Kind.Video) {
                const videoEl = this.ui.createVideoTile(p.sid, p.identity);
                track.attach(videoEl);
            }
            if (track.kind === Track.Kind.Audio) {
                track.attach(document.createElement('audio'));
            }
        });

        this.room.on(RoomEvent.ParticipantDisconnected, p => {
            this.ui.removeTile(p.sid);
        });
    }

    async join(url, token) {
        await this.room.connect(url, token);
        await this.room.localParticipant.enableCameraAndMicrophone();
        
        // 渲染本地視訊
        const videoEl = this.ui.createVideoTile(this.room.localParticipant.sid, 'YOU');
        const camTrack = this.room.localParticipant.getTrackPublication(Track.Source.Camera);
        if (camTrack) camTrack.track.attach(videoEl);
    }
}