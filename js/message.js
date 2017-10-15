var messageFactory = function(state){
    messageComponent = Vue.component('message-'+state.name, {
        template: '<div class="message" v-bind:id="message.id">\
            <span class="author">{{message.author}}</span>\
            <div>'+state.getTemplate()+'</div>\
        </div>',
        "props": {
            message: Object
        },
        data: (function (state) {
            var data = {"chatbot":state.chatbot};
            for (d in state.data) {
                data[d] = state.data[d];
            }
            return function () {return data;};
        })(state),
        methods: state.methods
    });
   return messageComponent;
}
