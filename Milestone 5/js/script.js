// VARIABLES DECLARATION AND INIZIALIZATION

const DateTime = luxon.DateTime;
const now = DateTime.now();
const dateMessage = now.setLocale('it').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

// VUE

const { createApp } = Vue;

createApp({

  // MY OBJECTS
  data(){
    return{
      newMessageContent: '',
      messageDate: new Date(),
      contacts: [ 
        {
          name: 'Fabio',
          avatar: '_1',
          visible: true,  
          messages: [ 
            {
              date: '10/01/2022 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 15:50:00',
              message: 'Ricordati anche di stendere i panni per favore',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 16:15:22',
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
              date: '20/03/2022 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            }, 
            {
              date: '20/03/2022 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            { date: '20/03/2022 16:35:00',
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
              date: '28/03/2022 10:10:40',
              message: 'Alessia va in campagna',
              status: 'received'
            }, 
            {
              date: '28/03/2022 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'    
            }, 
            {
              date: '28/03/2022 16:15:22',
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
              date: '10/01/2022 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 15:50:00',
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
              date: '10/01/2022 15:30:55',
              message: 'Ricordati di chiamare nonna',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 15:50:00',
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
              date: '26/05/2022 12:48:00',
              message: 'Ciao Ilaria, hai novità?',
              status: 'sent'
            }, 
            {
              date: '26/05/2022 12:50:00',
              message: 'Non ancora',
              status: 'received'
            }, 
            {
              date: '26/05/2022 12:50:40',
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
              date: '10/01/2022 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 15:50:00',
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
              date: '08/04/2022 15:20:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            }, 
            {
              date: '08/04/2022 15:21:50',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            }, 
            {
              date: '08/04/2022 15:21:55',
              message: 'OK!!',
              status: 'received'
            } 
          ],
        } 
      ],

      replyMessages: [
        "Ciao, come stai?",
        "Ti va di andare a cena fuori domani sera?",
        "vado di fretta, scusa",
        "Mi ha chiamato tuo padre",
        "Tutto bene?",
        "ok, grazie",
        "Non ho capito.",
        "Va bene, ci sentiamo dopo.",
        "Ricordati di prendere il pane!",
      ],
      allIndexExtracted: [],
      botIndex: null,

      activeConversation: 0,
      newMessage: '',
      contactFilter: '',
      show: false,
      showChevron: false,
      scroll: '',
      notificationOff: true,
      notificationOn: false,
      turOnNotification: true,
      turOffNotification: false,
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
        date: dateMessage,
        status: 'sent'
      }

      //push new message to conversation
      this.contacts[this.activeConversation].messages.push(newMessage);
      //reset new message input
      this.newMessageContent = '';
      setTimeout(this.getReplyMessage, 1000);
      setTimeout(() => {
        this.autoScroll();
      }, 10);
    },

    //automatic answer by current contact
    getReplyMessage(){
      const newMessage = {
        message: this.getRandomReply(),
        date: dateMessage,
        status: 'received'
      }
      this.contacts[this.activeConversation].messages.push(newMessage);
      setTimeout(() => {
        this.autoScroll();
      }, 10);
    },

    getRandomReply(){
      const num = Math.floor(Math.random() * (this.replyMessages.length));
      return this.replyMessages[num];
    },

    //search input with map
    searchContact(){
      this.contacts = this.contacts.map(contact => {
        if(!contact.name.toLowerCase().includes(this.contactFilter.toLowerCase()))
        {
          contact.visible = false;
        }else
        {
          contact.visible = true;
        }
        return contact
      });
    },

    //show dropdown menu on message
    showMenu(){
      this.show ? (this.show = false) : (this.show = true);
    },

    hideAll() {
      this.showChevron = false;
      this.show = false;
    },

    //delete message at click
    deleteMsg(index) {
      if (this.contacts[this.activeConversation].messages.length !== 1) {
          this.contacts[this.activeConversation].messages.splice(index, 1);
      }
      this.hideAll();
    },

    //scroll
    autoScroll(){
      const chatContainer = document.querySelector('.conversation');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    //notification toggle
    notificationToggle(){
      this.notificationOff = !this.notificationOff;
      this.notificationOn = !this.notificationOn;
      this.turOffNotification = !this.turOffNotification;
      this.turOnNotification = !this.turOnNotification;
    },
  },

  mounted(){

  }

}).mount('#app')
console.log("Vue OK")