var estadoChatbot = function(template){
    var _self = this;
    _self.chatbot = null;
    _self.template = template;
    _self.msgId = null;
    _self.msgApp = null
    _self.active = false;
    _self.init = function(){
        _self.active = true;
        var msg = _self.chatbot.appendMsg(_self.template,_self.chatbot.name);
        window.setTimeout(function(){
            var msgApp = messageFactory(msg,_self);
            _self.msgApp = msgApp;
        },1);

    }

    _self.set = function(key,value){
        _self.chatbot.values[key] = value;
    }

    _self.get = function(key){
        return this.chatbot.values[key];
    }

    _self.getOption = function(key){
        return this.msgApp.options[key];
    }
}
