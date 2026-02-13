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
		texto: "Piénsatelo otra vez... ¡Ohana!",
		img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2eXF6bm5oZzR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/11KzOet1ElBDz2/giphy.gif",
		labelSi: "Venga, va",
		labelNo: "Sigo diciendo no"
	},
	{
		texto: "Te daré muchos snacks si dices que sí",
		img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2eXF6bm5oZzR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/pS77p6vV9tJok/giphy.gif",
		labelSi: "¡Por los snacks!",
		labelNo: "No me sobornes"
	},
	{
		texto: "Si dices que no, Stitch se pone triste",
		img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2eXF6bm5oZzR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/uxv6t1fIOojDy/giphy.gif",
		labelSi: "¡No llores! Sí",
		labelNo: "Corazón de piedra"
	},
	{
		texto: "¡Última oportunidad! ¿Me vas a dejar así?",
		img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N2eXF6bm5oZzR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/ROHl9yvRAsNJC/giphy.gif",
		labelSi: "¡SÍ, PESADO!",
		labelNo: "Soy un monstruo"
	}
];

const preguntas = [
	{
		texto: "¿Cuál es nuestra comida favorita?",
		img: "https://media.giphy.com/media/pS77p6vV9tJok/giphy.gif",
		opciones: ["Pizza", "Sushi", "Hamburguesa", "Tacos"],
		correcta: 1
	},
	{
		texto: "¿Dónde fue nuestra primera cita?",
		img: "https://media.giphy.com/media/ROHl9yvRAsNJC/giphy.gif",
		opciones: ["El Parque", "Cine", "Cafetería", "Playa"],
		correcta: 2
	}
];

let ultimaOpcion = -1;
let preguntaActual = 0;
let aciertos = 0;

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

	let indiceRandom;
	do {
		indiceRandom = Math.floor(Math.random() * opcionesPersuasion.length);
	} while (indiceRandom === ultimaOpcion);

	ultimaOpcion = indiceRandom;
	const seleccion = opcionesPersuasion[indiceRandom];

	// Animación suave de cambio
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