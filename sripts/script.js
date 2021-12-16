
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//Inicializando Firebase con mi configuration 
// Your web app's Firebase 



const firebaseConfig = {
  apiKey: "AIzaSyCpEwppEh_nA8TNCgimTY7eMIJ-cSExOxc",
  authDomain: "tic-tac-toe-1f9b0.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-1f9b0-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-1f9b0",
  storageBucket: "tic-tac-toe-1f9b0.appspot.com",
  messagingSenderId: "850548903138",
  appId: "1:850548903138:web:f63d0bcc6dbf477778e2bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Configurando Id de jugadores

let input = document.createElement('span');

let contain2 = document.getElementById('container2');
let unirse = document.getElementById('unirse');
let nueva = document.getElementById('nueva');

let id = Math.floor(Math.random() * (1, 100) + 1)
let user;

//Nueva partida
nueva.addEventListener('click', () => {
  let nombre = prompt("Nombre del jugador", 'Jugador 1');
  input.value = nombre;
  unirse.style.display = "none";
  contain2.append(input);
  valueSelect();
  writeUserData(++id, input.value)
});

nuevoJuego = true;
// Enviando datos a mi base de datos
function writeUserData(userId, name) {
  firebase.database().ref(name + userId).set({
    username: name,
  }).catch(error => {
    nuevoJuego = false;
  });
  alert("id: " + name + userId)
}


unirse.addEventListener('click', () => {
  nueva.style.display = "none";
  valueSelect();
  user = prompt("Ingrese Id de la partida");
  consultarUsuarios();
});

//obtener datos de la base de datos 

jugadas = true;

async function consultarUsuarios() {
  const usuarios = await firebase.database().ref();
  usuarios.child(user).child("username").get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      alert(`El usuario ${user} no se encuantra registrado`)
      jugadas = false;
    }
  }).catch((error) => {
    console.error(error);
  });
  console.log(usuarios)
}



// Codigo del tic tac toc
// Codigo del tic tac toc


valorEntrada = "O";

game = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_'],
];


function selectItem() {
  if (jugadas) {
    winnig()
    viewWining();
    valueSelect()
    game[this.dataset.row][this.dataset.column] = valorEntrada;
    setBoard()
  }
}

// con la funcion valueSelect() cambiamos el valor del los valos de entrada caundo damos click sobre los campos vacios dentro de juego
empate = 0;
function valueSelect() {
  if (jugadas) {
    let p = document.createElement('p')

    p.textContent = 'turno jugador 1';
    if (valorEntrada === 'O') {
      valorEntrada = 'X';
      p.textContent = 'turno jugador 1';
      empate = empate++;
    } else {
      valorEntrada = 'O';
      p.textContent = 'turno jugador 2';
      empate = empate++;
    }
    contain2.append(p)
  }

}

// se comparan los values dentro de cada espacio del array bidimencional que coincidan con los patrones nesesarios para ganar el juego

function winnig() {
  if (game[0][0] === valorEntrada && game[0][1] === valorEntrada & game[0][2] === valorEntrada) {
    return true;
  }
  if (game[1][0] === valorEntrada && game[1][1] === valorEntrada & game[1][2] === valorEntrada) {
    return true;
  }
  if (game[2][0] === valorEntrada && game[2][1] === valorEntrada & game[2][2] === valorEntrada) {
    return true;
  }
  if (game[0][0] === valorEntrada && game[1][0] === valorEntrada & game[2][0] === valorEntrada) {
    return true;
  }
  if (game[0][1] === valorEntrada && game[1][1] === valorEntrada & game[2][1] === valorEntrada) {
    return true;
  }
  if (game[0][2] === valorEntrada && game[1][2] === valorEntrada & game[2][2] === valorEntrada) {
    return true;
  }
  if (game[0][0] === valorEntrada && game[1][1] === valorEntrada & game[2][2] === valorEntrada) {
    return true;
  }
  if (game[0][2] === valorEntrada && game[1][1] === valorEntrada & game[2][0] === valorEntrada) {
    return true;
  }

  return false
}

// con el retorno de tipo boolean de la funcion winning() lanzamos un alert que contiene a el ganador del juego
function viewWining() {
  if (winnig()) {
    alert(`el jugador ${valorEntrada} a ganado`);
    location.reload();
  }
}


// Organizamos el contenido de cada spacio del array tambien creamos nuevos elementos dentro del document
function render({ content, row, column }, container) {
  span = document.createElement('span');
  span.textContent = `${content}`;
  (winnig()) ? span.textContent = `${'_'}` :
    span.dataset.row = row;
    span.dataset.column = column;
  span.addEventListener('click', selectItem);
  container.append(span);
}



// Se extran los los datos del array game y se envian a la funcion render
function setBoard() {
  contain.innerHTML = ''
  this.game.forEach((row, indexRow) => {
    row.forEach((column, indexCol) => {
      this.render({
        content: column,
        row: indexRow,
        column: indexCol
      }, window.contain);
    });
  });
}

setBoard();

//Reiniciar juego

document.getElementById('reiniciar').addEventListener('click', () => {
  location.reload();
})