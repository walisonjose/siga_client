import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.69:8888' , { 
    autoConnect: false,
});



function subscribeToNewDevs(subscribeFuntion){
 socket.on('new-dev', subscribeFuntion);
}


function subscribeToNewsTest(subscribeFuntion){
    socket.on('news-test', subscribeFuntion);
   }


function connect( latitude, longitude, techs,  itemId){
socket.io.opts.query = {
    latitude,
    longitude,
    techs,
    itemId,
};


    socket.connect();



    /* Exemplo de recebimento de mensagem
    socket.on('message', text => {
        console.log(text);
    }) */
}

function disconnect(){
    if(socket.connected){
socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
    subscribeToNewsTest
};