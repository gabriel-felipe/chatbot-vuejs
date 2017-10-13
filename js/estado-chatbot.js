var estadoChatbot = function(name,template){
    var _self = this;
    _self.chatbot = null;
    _self.template = template;
    _self.active = false;
    _self.methods = {};
    _self.data = {};
    _self.name = name;

    _self.init = function(){
        _self.active = true;
        var msg = _self.chatbot.appendMsg(_self.template,_self.chatbot.name,_self.name);
        return messageFactory(_self);

    }
}
