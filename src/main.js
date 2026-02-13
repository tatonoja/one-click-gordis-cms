// --- REFERENCIAS AL DOM ---
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const mainCard = document.getElementById('mainCard');
const testCard = document.getElementById('testCard');
const feedbackCard = document.getElementById('feedbackCard');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const confirmacionCard = document.getElementById('confirmacionCard');
const preTestCard = document.getElementById('preTestCard');
const btnConfirmarSi = document.getElementById('btnConfirmarSi');
const btnConfirmarNo = document.getElementById('btnConfirmarNo');
const btnEmpezarTest = document.getElementById('btnEmpezarTest');
const mainImage = document.querySelector('#mainCard img');
const mainTitle = document.querySelector('#mainCard h1');

// --- CONFIGURACIÓN ---
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

const opcionesPersuasion = [
	{
		texto: "¿Seguro? Mira esta carita...",
		img: "/images/gordi-triste.png",
		labelSi: "Vale, sí...",
		labelNo: "¿En serio?"
	},
	{
		texto: "Piénsatelo otra vez...",
		img: "/images/toy-story.gif",
		labelSi: "Venga, va",
		labelNo: "Sigo diciendo no"
	},
	{
		texto: "Te daré muchos snacks si dices que sí",
		img: "/images/mordisquitos.gif",
		labelSi: "¡Por los snacks!",
		labelNo: "No me sobornes"
	},
	{
		texto: "Si dices que no, Stitch se pone triste",
		img: "/images/stitch-llora.gif",
		labelSi: "¡No llores! Sí",
		labelNo: "Corazón de piedra"
	},
	{
		texto: "¡Última oportunidad! ¿Me vas a dejar así?",
		img: "/images/gato-botas-ojitos.gif",
		labelSi: "¡SÍ, PESADO!",
		labelNo: "Soy un monstruo"
	}
];

const preguntas = [
	{
		texto: "¿Dónde fue nuestra primera cita?",
		img: "/images/preguntas/primera_cita.jpeg",
		opciones: ["La Capocha", "Akira", "La Calita", "Sloopy Joe's"],
		correcta: 0
	},
	{
		texto: "¿Gordi 2 es Borde?",
		img: "/images/preguntas/gordi-borde.jpeg",
		opciones: ["Si", "No", "Claro que Si", "Por supuesto que No"],
		correcta: 3
	},
	{
		texto: "¿Vendiste a Gordi 2 en aquella partida de DANY, para poder ganar?",
		img: "/images/preguntas/dany.jpg",
		opciones: ["SI", "NO", "Si, Si, Si, Si, Si", "Bueno... no"],
		correcta: 2
	},
	{
		texto: "¿Quien dijo el Primer Te Quiero?",
		img: "/images/preguntas/gordis-novios.jpeg",
		opciones: ["Gordi 1", "Gordi 2", "Yo me llamo Ralph", "Juego con mi Melocotonero"],
		correcta: 0
	},
	{
		texto: "¿A que gordi le gustan los videos de sustos?",
		img: "/images/preguntas/gordi-miedo.jpeg",
		opciones: ["Gordi 1", "BUHHHH", "Gordi 2", "Sustooo"],
		correcta: 2
	},
	{
		texto: "¿Vas a acabar alguna vez la Tesis?",
		img: "/images/preguntas/gordi-tesis.jpeg",
		opciones: ["NUNCA", "Tesis? Eso que es?", "Are You Kidding Me?", "Rie mientras se muere por dentro"],
		correcta: 3
	},
	{
		texto: "¿Tu sabes que yo te quiero?",
		img: "/images/preguntas/gordi-beso.jpeg",
		opciones: ["Primera Noticia", "SIIIIIIIIII", "No lo tengo Claro", "Embustero"],
		correcta: 1
	},
	{
		texto: "¿Tu me quieres?",
		img: "/images/preguntas/gordi-beso2.jpeg",
		opciones: ["No conozco ese termino", "No no no no", "Soy un Globo, no tengo sentimientos", "SHII"],
		correcta: 3
	}
];

let ultimaOpcion = -1;
let preguntaActual = 0;
let aciertos = 0;
let indicePersuasionActual = 0;

// --- LÓGICA DE NAVEGACIÓN (SISTEMA ANTI-SOLAPE) ---
function ocultarTodasLasPantallas() {
	const ids = [
		'mainCard',
		'confirmacionCard',
		'preTestCard',
		'testCard',
		'feedbackCard',
		'successMessage',
		'errorMessage'
	];
	ids.forEach(id => {
		const p = document.getElementById(id);
		if(p) p.style.display = 'none';
	});
}

// --- MANEJO BOTÓN NO (PERSUASIÓN) ---
btnNo.addEventListener('click', (e) => {
	e.preventDefault();

	// 1. Obtenemos el mensaje actual usando el índice
	const seleccion = opcionesPersuasion[indiceActualPersuasion];

	indiceActualPersuasion = (indiceActualPersuasion + 1) % opcionesPersuasion.length;

	// --- Tu lógica de animación suave ---
	mainImage.style.opacity = 0;
	mainTitle.style.opacity = 0;
	btnSi.style.opacity = 0;

	setTimeout(() => {
		mainImage.src = seleccion.img;
		mainTitle.innerText = seleccion.texto;
		btnSi.innerText = seleccion.labelSi;
		btnNo.innerText = seleccion.labelNo;

		mainImage.style.opacity = 1;
		mainTitle.style.opacity = 1;
		btnSi.style.opacity = 1;
	}, 200);
});

// --- LÓGICA DEL TEST ---

// --- EVENTO PARA EMPEZAR EL TEST REAL ---
// 1. De Inicio a Confirmación
btnSi.addEventListener('click', () => {
	ocultarTodasLasPantallas();
	confirmacionCard.style.display = 'block';
});

// 2. Si se arrepiente en la confirmación, vuelve al inicio
btnConfirmarNo.onclick = () => {
	ocultarTodasLasPantallas();
	mainCard.style.display = 'block';
};

// 3. De Confirmación a Info Pre-Test
btnConfirmarSi.onclick = () => {
	ocultarTodasLasPantallas();
	preTestCard.style.display = 'block';
};

// 4. De Info Pre-Test al Inicio Real del Test
btnEmpezarTest.onclick = () => {
	ocultarTodasLasPantallas();
	testCard.style.display = 'block';
	iniciarTest(); // Tu función que carga la primera pregunta
};

function iniciarTest() {
	// 1. Reseteamos contadores siempre al empezar
	preguntaActual = 0;
	aciertos = 0;

	// 2. Nos aseguramos de que la pantalla del test sea visible
	ocultarTodasLasPantallas();
	testCard.style.display = 'block';

	// 3. Llamamos a mostrar la pregunta
	mostrarPregunta();
}

function mostrarPregunta() {
	// Verificamos que existan preguntas
	if (preguntas.length === 0) return;

	const p = preguntas[preguntaActual];

	// Referencias a los elementos de la tarjeta de test
	const imgElement = document.getElementById('preguntaImg');
	const textoElement = document.getElementById('preguntaTexto');
	const containerOpciones = document.getElementById('opcionesContainer');

	// Actualizamos imagen y título
	imgElement.src = p.img;
	textoElement.innerText = p.texto;

	// Limpiamos los botones anteriores
	containerOpciones.innerHTML = '';

	// Creamos los nuevos botones de opciones
	p.opciones.forEach((opcion, index) => {
		const btn = document.createElement('button');
		btn.innerText = opcion;
		btn.className = 'btn-opcion'; // Clase para CSS opcional
		btn.onclick = () => verificarRespuesta(index);
		containerOpciones.appendChild(btn);
	});
}

function verificarRespuesta(indiceSeleccionado) {
	const correcta = preguntas[preguntaActual].correcta === indiceSeleccionado;
	if (correcta) aciertos++;

	ocultarTodasLasPantallas();
	feedbackCard.style.display = 'block';

	const fImg = document.getElementById('feedbackImg');
	const fTitle = document.getElementById('feedbackTitle');

	if (correcta) {
		fImg.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2eXF6bm5oZzR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3ZSN78mDN1By8/giphy.gif";
		fTitle.innerText = "¡Correcto! 🥰";
	} else {
		fImg.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2eXF6bm5oZzR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/ROHl9yvRAsNJC/giphy.gif";
		fTitle.innerText = "¡Upps! Casi... 🥺";
	}
}

document.getElementById('btnSiguiente').onclick = () => {
	preguntaActual++;
	if (preguntaActual < preguntas.length) {
		ocultarTodasLasPantallas();
		testCard.style.display = 'block';
		mostrarPregunta();
	} else {
		finalizarJuego();
	}
};

function finalizarJuego() {
	ocultarTodasLasPantallas();
	const porcentaje = (aciertos / preguntas.length) * 100;
	if (porcentaje >= 80) {
		successMessage.style.display = 'block';
		successMessage.classList.add('bounce-in');
	} else {
		errorMessage.style.display = 'block';
	}
}

// --- NETLIFY IDENTITY ---
if (window.netlifyIdentity) {
	window.netlifyIdentity.on("init", user => {
		if (!user) {
			window.netlifyIdentity.open();
			window.netlifyIdentity.on("login", () => document.location.reload());
		}
	});
}