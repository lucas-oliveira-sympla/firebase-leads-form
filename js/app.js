// Initialize Firebase
const config = {
     apiKey: "<YOUR API KEY >",
     authDomain: "<YOUR AUTH DOMAIN >",
     databaseURL: "<YOUR DATA URL>",
     projectId: "<YOUR PROJECT ID >",
     storageBucket: "<YOUR STORAGE BUCKET >",
     messagingSenderId: "<YOUR SEND MESSAGE ID >"
  };
  firebase.initializeApp(config);
  
  const //send leads
        name = document.querySelector('#name'),
        email = document.querySelector('#email'),
        phone = document.querySelector('#phone'),
        alert = document.querySelector('.alert'),
        button = document.querySelector('.send-form')

 const // login 
        overlay = document.querySelector('.overlay'),  
        userEmail = document.querySelector('#email-user'),
        password = document.querySelector('#password'),
        alertLogin = document.querySelector('.alert-login'),
        btnLogin = document.querySelector('.btn-login'),
        logout = document.querySelector('.logout')


  // start db reference  connection
  const dbRefer = firebase.database().ref('leads')


  // class reference 
  class FormLeads {
      constructor() {
            this.name =  name.value,  
            this.email = email.value,
            this.phone = phone.value,
            this.date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/'),
            this.time = new Date().getTime()
          }
  }

  // send form
  const sendForm = () => {
    dbRefer.push(new FormLeads())
  
  }
//CLEAN FORM
    const cleanForm =  () => {
          name.value = '' 
          email.value = ''
          phone.value = ''
    }

  //validate inputs   

  const validateForm = () => { 
    if(name.value   === '' || email.value === '' || phone.value === '') {
        alert.classList.add('alert-danger','display')
        alert.innerHTML = 'one or more ipunts have wrong value , try agin  &#x1F915; '
        cleanForm()
    }else {
        alert.classList.remove('alert-danger')
        alert.classList.add('alert-success','display')
        alert.innerHTML = 'gotcha you are a new lead &#x1f604'
        sendForm() // send form function
        cleanForm()
    }
}

// submit form 
button.addEventListener('click', () => {
    validateForm();
})

//login validade
firebase.auth().onAuthStateChanged(user => {
    if (user) { // user logged
        overlay.style.display = 'none';
        logout.style.display = 'block';
        
        
    } else { // user not logged
        overlay.style.display = 'block';
        alertLogin.classList.add('alert', 'alert-danger')
        alertLogin.innerHTML = 'You need be a logged'

    }
})

//login function 
const loginFunction = (Email, Pass) => {
    Email = userEmail.value
    Pass = password.value
    //console.log(Email, Pass)
    firebase.auth().signInWithEmailAndPassword(Email, Pass).catch(function(error) {

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    
        alertLogin.classList.add('alert-danger')
        alertLogin.innerHTML = errorCode, + errorMessage
        // ...
    });

}
    //CLEAN FORM LOGIN
    const cleanLogin = ()  => {
        userEmail.value = ''
        password.value = ''
    }

    const logoutFunction = () => {
        firebase.auth().signOut()
        cleanLogin();

    }

    // login event
    btnLogin.addEventListener('click', () => {
        loginFunction();
    })