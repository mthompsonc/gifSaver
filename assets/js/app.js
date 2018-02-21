/** Función para crear registro de usuario en Firebase*/

function registrar() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

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
  const email2 = document.getElementById('email2').value;
  const password2 = document.getElementById('password2').value;
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
  <li><a href="#" id="aboutus">About us</a></li>
  <li><a href="#" id="close" onclick="cerrar()">Cerrar Sesión</a></li>
  `

  $('#home').click(function() {
    $('#home1').show();
    $('#aboutus1').hide();
    $('#myGifSave1').hide();
  })

  $('#profile').click(function() {
    $('#home1').hide();
    $('#aboutus1').hide();
    $('#myGifSave1').show();
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
    $('#aboutus1').show();
    $('#home1').hide();
  })

    $('#home').click(function() {
    $('#aboutus1').hide();
    $('#home1').show();
  })
}

/** Se activa cuando la función observador (de Firebase) nota que hay un usuario logueado. */
function useractive() {
  $('#home1').show();
  $('#about1').hide();
  $('#myGifSave1').hide();

  $('#aboutus').click(function() {
    $('#aboutus1').show();
    $('#home1').hide();
    $('#myGifSave1').hide();
  })
}


$(document).ready(function() {
  $('#home1').show();
  $('#myGifSave1').hide();
  $('#aboutus1').hide();


//Funciones API,giphy
 $('input').keypress(function(event) {
    if(event.which == 13) {
//vacia el contenedor al hacer otra busqueda
      $('#home1').show();
      $('#myGifSave1').hide();
      $('#aboutus1').hide();

      $( ".containerImg" ).empty();
//toma el valor del input y reemplaza los espacios con +
      var value = $('input').val();
      $('input').val('');
      value = value.trim().replace(/\s+/g, '+');
//inserta el valor del input en la url para hacer la busqueda
      var url = 'http://api.giphy.com/v1/gifs/search?api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&q=' + value + '"&limit=9&offset=0&rating=R';
//llama a la api, .getJSON es una abreviacion de:
/*
$.ajax({
dataType: "json",
url: url,
data: data,
success: success
});
*/
      $.getJSON(url, function(object) {
// forEach metodo que enlista cada item del arreglo
        object.data.forEach(function(gif) {
          console.log(object.data)
/*gif.images.fixed_height.url lo da la api para que las
*imagenes tengan un tamaño fijo
*/
          var url = gif.images.fixed_height.url;
          console.log(url)
//inyecta la url en el contenedor de la imagen
          var image = $('<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img src="' + url + '" class="center-block img-responsive"><div class="caption text-right"><h5><a href="#"><i class="fas fa-heart" style="color: #8E8D91; margin-right: 2em;"></i></a></h5></div></div></div>');
          image.appendTo($('.containerImg'));
        });
      });
      event.preventDefault();
    }
  });
});