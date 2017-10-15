var estadoChatbot = function(name,template){
    var _self = this;
    _self.chatbot = null;
    _self.templates = [template];
    _self.mainTemplateProbability = null;
    _self.active = false;
    _self.methods = {};
    _self.data = {};
    _self.name = name;
    _self.selectedTemplate = null;

    _self.init = function(){
        _self.active = true;
        var msg = _self.chatbot.appendMsg(_self.getTemplate(),_self.chatbot.name,_self.name);
        return messageFactory(_self);
    }

    _self.getTemplate = function(){
        if (_self.templates.length === 1) {
            return _self.templates[0];
        }
        if (!_self.selectedTemplate) {
            _self.selectedTemplate = _self.templates[0];
        }
        var templatesLenght = _self.templates.length;
        var mainTemplateProbability = this.mainTemplateProbability;
        if (!mainTemplateProbability) {
            mainTemplateProbability = 100 / templatesLenght;
        }
        var escalas = [mainTemplateProbability];
        var othersProbability = (100 - mainTemplateProbability) / (_self.templates.length - 1)
        var inicio = mainTemplateProbability;
        for (n = 1; n <_self.templates.length; n++) {
            inicio += othersProbability;
            escalas[n] = inicio;
        }

        var rand = Math.random(0,100) * 100;
        for (key in escalas) {
            percent = escalas[key];
            if (rand <= percent) {
                _self.selectedTemplate = _self.templates[key];
                break;
            }
        }

        return _self.selectedTemplate;
    }

    _self.addVariant = function(template) {

        _self.templates.push(template);
    }
}
