$(document).ready(function() {
  $('#home1').show();
  $('#myGifSave1').hide();
  $('#aboutus1').hide();
});


/** Función para crear registro de usuario en Firebase*/

function registrar() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then( function() {
    location.reload();
    /*
    * Esto permite que la página se "recargue automáticamente para que aparezca el nuevo contenido del navbar
    */
    verificar();
    // Llamando a la función para verificar e-mail si es que se registró recién.
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
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

/*
* Función para identificar sign in en Firebase.
*/

function ingreso() {
  const email2 = document.getElementById('email2').value;
  const password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).then(() => {
    // Aquí verifica si es que la contraseña corresponde al usuario.
    location.reload();
    // Nuevamente actualiza para que se muestre el nuevo contenido del navbar
  }).catch(function(error) {
    /*
    *Handle Errors here.
    */
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
  var emailAddress = prompt('Enter the email address you used to create your account');
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
});


/*
* Función de Firebase que observa qué sucede con el usuario, si se conectó o no, si existe verificación del email, etc.
*/

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      aparece();
      /*
      * Llamando a la función aparece, la cual contiene los nuevos elementos que estarán en el navbar y también las funciones de click de los elementos del navbar.
      */
      useractive();
      /*
      * Esta función le dice al navegador que cuando el usuario ingrese, muestre una sección determinada
      */

      userSearch();
      /*
      * Esta función diferencia de que aparezca el corazón con el link de descarga.
      */

      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      $('#hi').append(`<h1>Hi ${email}!</h1>`);
      // ...
    } else {
      nouser();
      /*
      * Esta función tiene la funcionalidad de los botones que aparecen en el navbar sin estar logueado.
      */
      nouserSearch();
      /*
      * Esta función diferencia de que aparezca el corazón con el link de descarga, cuando el usuario no ha ingresado, no aparece el corazón.
      */
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
  <li><a href="#" id="close" onclick="cerrar()">Log Out</a></li>
  `

  $('#home').click(function() {
    $('#home1').show();
    $('#aboutus1').hide();
    $('#myGifSave1').hide();
  });

  $('#profile').click(function() {
    $('#home1').hide();
    $('#aboutus1').hide();
    $('#myGifSave1').show();
  });


  $('#aboutus').click(function() {
    $('#aboutus1').show();
    $('#home1').hide();
    $('#myGifSave1').hide();
  });

}

/** Función para cerrar sesión. */

function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      location.reload();
      // Actualizando el navbar
    })
    .catch(function(error) {
      //Error alert
    })
}

/*
* Se activa cuando la función observador (de Firebase) nota que no hay usuario logueado. */

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

/*
* Se activa cuando la función observador (de Firebase) nota que hay un usuario logueado. */
function useractive() {
  $('#home1').show();
  $('#about1').hide();
  $('#myGifSave1').hide();
}


function userSearch(){
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
      var url = 'http://api.giphy.com/v1/gifs/search?api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&q=' + value + '"&limit=15&offset=0&rating=R';

/*
Llama a la api, .getJSON es una abreviacion de:

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
          var urlHref = gif.images.downsized.url;
          console.log(url)
//inyecta la url en el contenedor de la imagen
          var image = $('<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img src="' + url + '" class="center-block img-responsive" style="height: 200px"><div class="caption text-right"><h5><a href="' + urlHref + '" target="_blank"><i class="fas fa-heart" style="color: #8E8D91; margin-right: 2em;"></i></a></h5></div></div></div>');
          image.appendTo($('.containerImg'));
        });
      });
      event.preventDefault();
    }
  });
 }

 function nouserSearch(){
//Funciones API,giphy
 $('input').keypress(function(event) {
    if(event.which == 13) {
      $( ".containerImg" ).empty();
      $('#alert').empty();
//vacia el contenedor al hacer otra busqueda
      $('#home1').show();
      $('#myGifSave1').hide();
      $('#aboutus1').hide();

      $('#alert').append('<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="alert text-center"><p><strong>Alert: Only if you are registered you can have full access to download gifs. </strong></p></div></div></div>');
//toma el valor del input y reemplaza los espacios con +
      var value = $('input').val();
      $('input').val('');
      value = value.trim().replace(/\s+/g, '+');
//inserta el valor del input en la url para hacer la busqueda
      var url = 'http://api.giphy.com/v1/gifs/search?api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&q=' + value + '"&limit=15&offset=0&rating=R';

/*
Llama a la api, .getJSON es una abreviacion de:

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
          var urlHref = gif.images.downsized.url;
          console.log(url);
//inyecta la url en el contenedor de la imagen
          var image = $('<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img src="' + url + '" class="center-block img-responsive" style="height: 200px"></div></div>');
          image.appendTo($('.containerImg'));
        });
      });
      event.preventDefault();
    }
  });
 }
  //img hover
$(function(){
  $("#andrea").on({
   mouseenter: function(){
    $(this).attr('src','assets/img/andre2.png');
  },
  mouseleave: function(){
    $(this).attr('src','assets/img/andre.png');
  }
  });
  
});
$(function(){
  $("#maripi").on({
   mouseenter: function(){
    $(this).attr('src','assets/img/mari2.png');
  },
  mouseleave: function(){
    $(this).attr('src','assets/img/mari.png');
  }
  });
  
});
$(function(){
  $("#sabrina").on({
   mouseenter: function(){
    $(this).attr('src','assets/img/sab2.png');
  },
  mouseleave: function(){
    $(this).attr('src','assets/img/sab.png');
  }
  });
  
});