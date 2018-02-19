/** Función para crear registro de usuario en Firebase*/

function registrar(){
  var email= document.getElementById('email').value;
  var password= document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
    location.reload();
  }).catch(function(error) {
    /** Handle Errors here. */
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert(errorMessage)
  });
}

/** Función para identificar sign in en Firebase. */

function ingreso(){
  var email2= document.getElementById('email2').value;
  var password2= document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).then(()=>{
    location.reload();
  }).catch(function(error) {
    /** Handle Errors here. */
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
}

/** Función de Firebase que observa qué sucede con el usuario, si se conectó o no, si existe verificación del email, etc. */

function observador(){
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

function aparece(){
  console.log("Holi holi aparece aparece")
  var contenedor= document.getElementById('menu');
  contenedor.innerHTML= `
  <li><a href="#" id="home">Inicio</a></li>
  <li><a href="#" id="profile">Perfiles</a></li>
  <li><a href="#" id="close" onclick="cerrar()">Cerrar Sesión</a></li>
  `

    $('#home').click(function(){
      $('#myHome').show();
      $('#about').hide();
      $('#profile2').hide();
    })

    $('#profile').click(function(){
      $('#myHome').hide();
      $('#about').hide();
      $('#profile2').show();
    })


}

/** Función para cerrar sesión. */

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo..');
    location.reload();
  })
  .catch(function(error){
    console.log(error);
  })
}

/** Se activa cuando la función observador (de Firebase) nota que no hay usuario logueado. */

function nouser(){
  $('#aboutus').click(function(){
    $('#about').show();
    $('#myHome').hide();
    $('#profile2').hide();
  })
}

/** Se activa cuando la función observador (de Firebase) nota que hay un usuario logueado. */
  function useractive(){
    $('#about').hide();
    $('#myHome').show();
    $('#profile2').hide();
  }


/** Función que se activa al cargar el documento. */

$(document).ready(function(){

  $('#about').show();
  $('#myHome').hide();
  $('#profile2').hide();
})

/** Función para postear recetas. */

$('#post').click(function(){
  /** Guardando todos los valores en una variable. */
  var name= $('#title').val();
  var photo= $('#urlInput').val();
  var portion= $('#portion').val();
  var ingredients= $('#ingredients').val();
  var recipe= $('#recipe').val();
  var categorias1= $('#categorias1').val();
  /** Vaciando los input. */
  $('#title').val('');
  $('#urlInput').val('');
  $('#portion').val('');
  $('#ingredients').val('');
  $('#recipe').val('');
  $('categorias1').val('0');

  /** Contenedor donde irán los nuevos comentarios. */
  var contenedor= $('.newpost');
  /** Ingresando comentario en una caja de comentario. */
  contenedor.append('<div class=box> <h3 class= text-center>'+ name + '</h3> <div> <img class="photobox center-block" src= ' + photo + '  alt=...> </div> <h6><b>Porciones:</b> ' + portion + '</h6> <p><b> Ingredientes:</b> ' + ingredients + '</p> <p><b> Instrucciones:</b> ' + recipe + '</p><p><b> Tipo de Comida:</b> ' + categorias1 + '</p></div>' );
})

/** Función que muestra las recetas*/

console.log(data);

var cont = $('.container');
var platoFondo = $('.platoFondo');
var postre = $('.postre');
var bebestible = $('.bebestible');
var panaderiaPasteleria = $('.panaderiaPasteleria');
var everyone = $('.everyone');

/** Evento que dá funcionalidad al select. */

$('#categorias').on('change', function(){

  /** guardando el valor del select en la variable selection. */

  var selection = $('#categorias').val();

  /** Filtro de los platos de fondo. */

  if (selection === 'platoFondo') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'plato de fondo') {
        postre.children().remove();
        bebestible.children().remove();
        panaderiaPasteleria.children().remove();
        everyone.children().remove();
        platoFondo.append('<div class=box> <h3 class= text-center>'+ data[i].nombre + '</h3> <div> <img class="photobox center-block" src="assets/' + data[i].foto + '"> </div> <h6><b>Porciones:</b> ' + data[i].porciones + '</h6> <p><b> Ingredientes:</b> ' + data[i].ingredientes + '</p> <p><b> Instrucciones:</b> ' + data[i].receta + '</p><p><b> Tipo de Comida:</b> ' + data[i].tipo + '</p></div>')
      }
    }
  }

  /** Filtro de los postres. */

  if (selection === 'postre') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'postre') {
        platoFondo.children().remove();
        bebestible.children().remove();
        panaderiaPasteleria.children().remove();
        everyone.children().remove();
        postre.append('<div class=box> <h3 class= text-center>'+ data[i].nombre + '</h3> <div> <img class="photobox center-block" class= photobox src="assets/' + data[i].foto + '"> </div> <h6><b>Porciones:</b> ' + data[i].porciones + '</h6> <p><b> Ingredientes:</b> ' + data[i].ingredientes + '</p> <p><b> Instrucciones:</b> ' + data[i].receta + '</p><p><b> Tipo de Comida:</b> ' + data[i].tipo + '</p></div>')
      }
    }
  }

  /** Filtro de los platos de los bebestibles. */

  if (selection === 'bebestible') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'bebestible') {
        platoFondo.children().remove();
        postre.children().remove();
        panaderiaPasteleria.children().remove();
        everyone.children().remove();
        bebestible.append('<div class=box> <h3 class= text-center>'+ data[i].nombre + '</h3> <div> <img class="photobox center-block" src="assets/' + data[i].foto + '"> </div> <h6><b>Porciones:</b> ' + data[i].porciones + '</h6> <p><b> Ingredientes:</b> ' + data[i].ingredientes + '</p> <p><b> Instrucciones:</b> ' + data[i].receta + '</p><p><b> Tipo de Comida:</b> ' + data[i].tipo + '</p></div>')
      }
    }
  }

  /** Filtro de la Patelería/panadería. */

  if (selection === 'panaderiaPasteleria') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'panaderia/pasteleria') {
        platoFondo.children().remove();
        postre.children().remove();
        bebestible.children().remove();
        everyone.children().remove();
        panaderiaPasteleria.append('<div class=box> <h3 class= text-center>'+ data[i].nombre + '</h3> <div> <img class="photobox center-block" src="assets/' + data[i].foto + '"> </div> <h6><b>Porciones:</b> ' + data[i].porciones + '</h6> <p><b> Ingredientes:</b> ' + data[i].ingredientes + '</p> <p><b> Instrucciones:</b> ' + data[i].receta + '</p><p><b> Tipo de Comida:</b> ' + data[i].tipo + '</p></div>')
      }
    }
  }

  /** Filtro de todas las recetas. */

  if (selection === 'everyone') {
    platoFondo.children().remove();
    postre.children().remove();
    bebestible.children().remove();
    panaderiaPasteleria.children().remove();
    for (var i = 0; i < data.length; i++){
        everyone.append('<div class=box> <h3 class= text-center>'+ data[i].nombre + '</h3> <div> <img class="photobox center-block" src="assets/' + data[i].foto + '"> </div> <h6><b>Porciones:</b> ' + data[i].porciones + '</h6> <p><b> Ingredientes:</b> ' + data[i].ingredientes + '</p> <p><b> Instrucciones:</b> ' + data[i].receta + '</p><p><b> Tipo de Comida:</b> ' + data[i].tipo + '</p></div>')
    }
  }
})
