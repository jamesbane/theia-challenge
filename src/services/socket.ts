const SocketIOClient = require('socket.io-client/dist/socket.io');
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

class SocketService {
    private socket: any;
    getInstance() {
        if (this.socket && this.socket.connected) {
            return this.socket;
        }
        this.socket = SocketIOClient(SOCKET_URL);
        return this.socket;
    }

    listenNofications(walletAddress, cb = () => {}) {
        if (this.socket) {
            this.socket.on(`noti_receive_${walletAddress}`, cb);
        }
    }

    changeNetwork(data) {
        if (this.socket) {
            this.socket.emit('chainChanged', data);
        }
    }
}

export default SocketService;
