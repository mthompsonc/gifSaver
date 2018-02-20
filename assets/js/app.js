/** Función para crear registro de usuario en Firebase*/

function registrar() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then( function() {
    location.reload();
    verificar();
    
  })
  .catch(function(error) {
    /** Handle Errors here. */
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert(errorMessage)
  });
}

/*
 * Función para verificar el correo del nuevo usuario.
 */
function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('enviando correo');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

/** Función para identificar sign in en Firebase. */

function ingreso() {
  var email2 = document.getElementById('email2').value;
  var password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).then(() => {
    location.reload();
  }).catch(function(error) {
    /** Handle Errors here. */
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
}

/*
 * Esta función permitirá que un usuario recupere su contraseña.
 */
$('#forgetpass').click(function() {
  var auth = firebase.auth();
  var emailAddress = prompt('Ingresa tu correo');
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
});


/** Función de Firebase que observa qué sucede con el usuario, si se conectó o no, si existe verificación del email, etc. */

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      aparece();
      console.log('existe usuario activo')
      useractive();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      console.log('no existe usuario activo')
      nouser();
    }
  });
}

observador();

/** Esta función reemplaza botones, siempre y cuando el usuario esté logueado. */

function aparece() {
  console.log("Holi holi aparece aparece")
  var contenedor = document.getElementById('menu');
  contenedor.innerHTML = `
  <li><a href="#" id="home">Inicio</a></li>
  <li><a href="#" id="profile">My GifSaver</a></li>
  <li><a href="#" id="close" onclick="cerrar()">Cerrar Sesión</a></li>
  `

  $('#home').click(function() {
    $('#myHome').show();
    $('#about').hide();
    $('#profile2').hide();
  })

  $('#profile').click(function() {
    $('#myHome').hide();
    $('#about').hide();
    $('#profile2').show();
  })


}

/** Función para cerrar sesión. */

function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo..');
      location.reload();
    })
    .catch(function(error) {
      console.log(error);
    })
}

/** Se activa cuando la función observador (de Firebase) nota que no hay usuario logueado. */

function nouser() {
  $('#aboutus').click(function() {
    $('#about').show();
    $('#myHome').hide();
    $('#profile2').hide();
  })
}

/** Se activa cuando la función observador (de Firebase) nota que hay un usuario logueado. */
function useractive() {
  $('#about').hide();
  $('#myHome').show();
  $('#profile2').hide();
}


/** Función que se activa al cargar el documento. */

$(document).ready(function() {

  $('#about').show();
  $('#myHome').hide();
  $('#profile2').hide();
})



//test de API buscar con palabra, falta borrar resultados
//al hacer uno nuevo
//ideal poder hacer callback y llamar tmb de .click con el
//btn de busqueda
$(document).ready(function() {
  $('input').keypress(function(event) {
    if(event.which == 13) {
      var value = $('input').val();
      value = value.trim().replace(/\s+/g, '+');
      var url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + value + '"&limit=9&offset=0&rating=R';
      $.getJSON(url, function(object) {
        object.data.forEach(function(gif) {
          var url = gif.images.original.url;
          var image = $('<img src=' + url + ' />');
          image.appendTo($('body'));
        });
      });
      event.preventDefault();
    }
  });
});