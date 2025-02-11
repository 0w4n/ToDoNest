const iceConfiguration = {
    iceServers: [
        {
            urls: 'turn:my-turn-server.mycompany.com:19403',
            username: 'optional-username',
            credential: 'auth-token'
        }
    ]
}

const peerConnection = new RTCPeerConnection(iceConfiguration);