// VUE

const { createApp } = Vue;

createApp({

  // MY OBJECTS
  data(){
    return{
      contacts: [
        {
          name: 'Fabio',
          avatar: '_1',
          visible: true,
          messages:''
        },
        {
          name: 'Gianluca',
          avatar: '_2',
          visible: true,
          messages:''
        },
        {
          name: 'Noah',
          avatar: '_3',
          visible: true,
          messages:''
        },
        {
          name: 'Marco',
          avatar: '_4',
          visible: true,
          messages:''
        },
        {
          name: 'Davide',
          avatar: '_5',
          visible: true,
          messages:''
        },
        {
          name: 'Ilaria',
          avatar: '_6',
          visible: true,
          messages:''
        },
        {
          name: 'Flavio',
          avatar: '_7',
          visible: true,
          messages:''
        },
        {
          name: 'Alessio',
          avatar: '_8',
          visible: true,
          messages:''
        },

      ]
    }
  },

}).mount('#app')