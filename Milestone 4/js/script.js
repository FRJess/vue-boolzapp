// VUE

const { createApp } = Vue;

createApp({

  // MY OBJECTS
  data(){
    return{
      newMessageContent: '',
      contacts: [ 
        {
          name: 'Fabio',
          avatar: '_1',
          visible: true,  
          messages: [ 
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati anche di stendere i panni per favore',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            } 
          ],
        }, 
        {
          name: 'Gianluca',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            }, 
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            { date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            },
          ]
        },
        {
          name: 'Noah',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'Alessia va in campagna',
              status: 'received'
            }, 
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'    
            }, 
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            } 
          ],
         }, 
        {
          name: 'Marco',
          avatar: '_4',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            } 
          ],
        }, 
        {
          name: 'Davide',
          avatar: '_5',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare nonna',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            } 
          ],
        }, 
        {
          name: 'Ilaria',
          avatar: '_6',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Ilaria, hai novità?',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            }, 
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            } 
          ],
        }, 
        {
          name: 'Flavio',
          avatar: '_7',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            } 
          ],
        }, 
        {
          name: 'Alessio',
          avatar: '_8',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            }, 
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            }, 
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            } 
          ],
        } 
      ],

      activeConversation: 0,
      newMessage: '',
      contactFilter: '',
    }
  },

  //MY FUNCTIONS
  methods:{

    //change conversation when contact click
    choseConversation(index){
      this.contacts[this.activeConversation].active = false; 
      this.activeConversation = index;
      this.contacts[this.activeConversation].active = true;
    },

    //add new message to conversation using input
    createMessage(){
      if(!this.newMessageContent) return;
      const newMessage = {
        message: this.newMessageContent,
        date: 'now',
        status: 'sent'
      }

      //push new message to conversation
      this.contacts[this.activeConversation].messages.push(newMessage);
      //reset new message input
      this.newMessageContent = '';
      setTimeout(this.getReplyMessage, 1000);
    },

    //automatic answer by current contact
    getReplyMessage(){
      const newMessage = {
        message: 'ok',
        date: 'now',
        status: 'received'
      }
      this.contacts[this.activeConversation].messages.push(newMessage);
    },

    searchContact(){
      console.log(this.contactFilter)
      this.contacts = this.contacts.map(contact => {
        if(!contact.name.toLowerCase().includes(this.contactFilter.toLowerCase()))
        {
          contact.visible = false;
          // console.log(contact)
        }else
        {
          contact.visible = true;
          
        }
        return contact
      });
    }
  },

  mounted(){

  }

}).mount('#app')
console.log("Vue OK")