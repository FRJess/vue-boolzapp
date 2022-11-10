// VARIABLES DECLARATION AND INIZIALIZATION


// VUE

const { createApp } = Vue;

const DateTime = luxon.DateTime;

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
              date: '10/01/2022 15:48:55',
              message: 'Ti è piaciuto il film?',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 15:49:30',
              message: 'A me tantissimo e lo rivedrei volentieri',
              status: 'sent'
            }, 
            {
              date: '10/01/2022 15:52:22',
              message: 'Si, è molto bello!',
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
              date: '20/10/2022 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            }, 
            {
              date: '20/10/2022 16:30:55',
              message: 'Bene grazie! Poi hai risolto con le telecamere?',
              status: 'received'
            },
            { date: '20/10/2022 16:35:00',
            message: 'Si, tutto ok.',
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
            date: '03/11/2022 10:10:40',
            message: 'Giochiamo stasera?',
            status: 'received'
          }, 
          {
            date: '03/11/2022 10:12:10',
            message: 'Va bene ma non a Mario Kart allora.',
            status: 'sent'    
          }, 
          {
            date: '03/11/2022 10:12:22',
            message: 'Among us!',
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
            date: '14/09/2022 09:30:40',
            message: 'Domani apre la mostra Pixar',
            status: 'sent'
          }, 
          {
            date: '14/09/2022 09:32:50',
            message: 'Ci organizziamo per andare insieme?',
            status: 'received'
          } 
        ],
      }, 
      {
        name: 'David',
        avatar: '_5',
        visible: true,
        messages: [
          {
            date: '12/06/2022 10:30:20',
            message: 'Fammi sapere quando possiamo sentirci',
            status: 'sent'
          }, 
          {
            date: '12/06/2022 10:40:18',
            message: 'Va bene stasera se vuoi',
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
            date: '26/05/2022 09:48:00',
            message: 'Sei andata a prendere il mio regalo?',
            status: 'sent'
          }, 
          {
            date: '26/05/2022 09:50:00',
            message: 'Non te lo dico',
            status: 'received'
          }, 
          {
            date: '26/05/2022 09:50:40',
            message: 'Daiiii! Per favore!',
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
            date: '20/01/2022 15:30:55',
            message: 'Fai gli auguri a Martina che è il suo compleanno!',
            status: 'sent'
          }, 
          {
            date: '20/01/2022 15:50:00',
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
            message: 'Ciao, comìè finita poi la storia del lavoro?',
            status: 'received'
          }, 
          {
            date: '08/04/2022 15:21:50',
            message: 'Ho dato le dimissioni!',
            status: 'sent'
          }, 
          {
            date: '08/04/2022 15:22:55',
            message: 'Ci dobbiamo vedere cosi mi racconti.',
            status: 'received'
          } 
        ],
      } 
    ],
    
    replyMessages: [
      // "Ciao, come stai?",
      // "Ti va di andare a cena fuori domani sera?",
      // "vado di fretta, scusa",
      // "Mi ha chiamato tuo padre",
      // "Tutto bene?",
      // "ok, grazie",
      // "Non ho capito.",
      // "Va bene, ci sentiamo dopo.",
      // "Ricordati di prendere il pane!",
      '😍',
      '🤦🏻‍♀️',
      '👍🏼',
      '👎🏻',
      '🤨',
      '😂',
      '😫',
      '😲',
      '🤬',
      '🥺'
    ],

    activeConversation: 0,
    newMessage: '',
    timeMessage: '',
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
  
  getTime(){
    const now = DateTime.now();
    const timeMessage = now.setLocale('it').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    return timeMessage;
  },

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
      date: this.getTime(),
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
  
  //automatic random answer by current contact
  getReplyMessage(){
    const newMessage = {
      message: this.getRandomReply(),
      date: this.getTime(),
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
    if (this.contacts[this.activeConversation].messages.length !==1) {
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
  },
},

mounted(){
}

}).mount('#app')
console.log("Vue OK")