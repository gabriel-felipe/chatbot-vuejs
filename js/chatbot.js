var chatbot = new Vue({
    "el": "#chatbot",
    "data": {
        "messageId": 0,
        "title": "Chatbot",
        "name": "Atendente",
        "minimized": true,
        "messages": [
        ],
        "states": {

        },
        "values": {

        },
        "state": null, //Property to hold the actual state of the chatbot
        "lastMsg": null,
        "events": {
            "changeState": []
        }
    },
    computed: {
        "isMinimized": function(){
            return this.minimized;
        }
    },
    created: function(){
    },
    methods: {
        registerState: function(state){
            state.chatbot = this;
            this.states[state.name] = state
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
                    _self.trigger("changeState",_self.states[name]);
                }
            },10)
        },
        toggleMinimize: function(){
            this.minimized = !this.minimized;
            return this;
        },
        appendMsg: function(msg,author,component){
            this.messageId = this.messageId+1;
            var msgId = "msg-"+this.messageId;
            var msg = {"msg":msg,"author":author,"id":"chatbot-"+msgId,"component":"message-"+component};
            this.messages.push(msg);
            this.lastMsg = msg;
            window.setTimeout(function(){
                var messageHolder = document.getElementById("chatbot-messages");
                messageHolder.scrollTop = messageHolder.scrollHeight;
            },10);

            return msg;
        },
        set: function(key,value){
            this.values[key] = value;
        },
        get: function(key){
            return this.values[key];
        },
        on: function(evt,callback){
            if (typeof(this.events[evt]) === "undefined") {
                throw "Unknown event";
            }
            if (!callback instanceof Function) {
                throw "callback is not a function";
            }
            this.events[evt].push(callback);
        },
        trigger: function(evt){
            args = Array.prototype.slice.call(arguments, 1);

            if (typeof(this.events[evt]) === "undefined") {
                throw "Unknown event";
            }
            for (f in this.events[evt]) {
                callback = this.events[evt][f];
                callback.apply(this,args);
            }
        }
    }
});
