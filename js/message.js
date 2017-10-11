var messageFactory = function(msg,state){
    msg.state = state;
    msg.options = {};
    messageApp = new Vue({
        "el": "#"+msg.id,
        "data": msg,
        methods: {
            /*
                Method that act as a proxy, only calling the function if this is last msg
            */
            "_": function(name){
                var argumentos = Object.values(arguments);
                argumentos.shift();
                if(state.chatbot.lastMsg.id === this.id){
                    return this.state[name].apply(this.state,argumentos);
                }
            },

            get: function(name){
                return state.chatbot.values[name];
            }
        },
        created: function(){

        }
   });
   return messageApp;
}
