var chatbot = new Vue({
    "el": "#chatbot",
    "data": {
        "messageId": 0,
        "title": "Chatbot",
        "name": "Atendente",
        "messages": [
        ],
        "states": {

        },
        "values": {

        },
        "state": null, //Property to hold the actual state of the chatbot
        "lastMsg": null

    },
    created: function(){
    },
    methods: {
        registerState: function(name,state){
            state.chatbot = this;
            this.states[name] = state
        },
        triggerState: function(name){
            if (this.state) {
                this.state.active = false;
            }
            var _self = this;
            window.setTimeout(function(){
                if (typeof(_self.states[name]) !== "undefined") {
                    _self.states[name].init();
                    _self.actualState = _self.states[name];
                }
            },10)
        },
        appendMsg: function(msg,author){
            this.messageId = this.messageId+1;
            var msgId = "msg-"+this.messageId;
            var msg = {"msg":msg,"author":author,"id":"msg-"+msgId};
            this.messages.push(msg);
            this.lastMsg = msg;

            return msg;
        }
    }
});
