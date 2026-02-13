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
		texto: "Te daré muchas chuches si dices que sí",
		img: "/images/mordisquitos.gif",
		labelSi: "¡Por las Chuches!",
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
		texto: "Si me pierdo en el súper por 20 minutos, ¿en que pasillo estoy seguro?",
		img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXBzOGpoZzI5Y3B5c2FqdXNwcjdyaHV0ZmJsaTUzb2UzN3M4amthcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/z2D26GunfUK1W/giphy.gif",
		opciones: ["Fruta", "Yogures", "Dulces", "Bebida"],
		correcta: 2
	},
	{
		texto: "Si ganara un Oscar, ¿qué sería lo más probable que pasara durante mi discurso?",
		img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJwcmF1M3ZwcXB6cWhjbDFib3FqNm0xbmJ1ZjYweHdqZGkyYWh6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBrZhsBDQ4X6w/giphy.gif",
		opciones: ["Me caigo al subir al escenario", "Me olvido de darte las gracias", "Empiezo a llorar sin control", "Me echan porque hablo demasiado"],
		correcta: 3
	},
	{
		texto: "Si nos perdiéramos en un bosque, ¿por qué sería?",
		img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2t4Z29qMXpkdXF3dHFjdWFnamljdjU1bWFnMjhua3UyMnFpcnV1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aCTPPm4OHfRLSH6/giphy.gif",
		opciones: ["Por seguir un 'atajo' que vi en Google", "Por ir mirando el móvil", "Por algo que ha hecho Gordi 1", "Por ir discutiendo"],
		correcta: 0
	},
	{
		texto: "¿Qué hago si me sirven un plato en un restaurante que no es lo que pedí?",
		img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnhxbm1vbTN1anVyN3hkcGV6cmt6MWV2MzRyemQ5bGQxajJwaTMzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMMYbPOGNyKnCtW/giphy.gif",
		opciones: ["Me lo como callado por vergüenza", "Llamo al camarero educadamente", "Te pido que te quejes tú", "Miro el plato con odio"],
		correcta: 0
	},
	{
		texto: "¿Cuál es mi reacción si me pides un trozo de mi comida favorita?",
		img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzFzdTZ2eTg5M3U5aWs4Mzlmb29rb2d1aW9wdnZyNzhyazk4c2VnYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eSQKNSmg07dHq/giphy.gif",
		opciones: ["Te doy el trozo más grande", "Te doy el trozo más pequeño", "Digo que no 'porque ya te ofrecí'", "Gordi 1 no le gusta compartir su comida"],
		correcta: 3
	},
	{
		texto: "¿Qué hago cuando pierdo jugando a un juego de mesa contigo?",
		img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHIxanNiMjZtenJoZXk2ZGZqOHpibGNwejdkNDVkNzBoMjljOXV5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WwbmjTK5TS87e/giphy.gif",
		opciones: [ "Tiro las fichas al aire", "Digo que me has dejado ganar", "Acepto la derrota con dignidad (mentira)", "Pido la revancha enfadado/a"],
		correcta: 3
	},
	{
		texto: "¿Cuál es mi manía más extraña con el volumen de la televisión o del coche?",
		img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmVmcnExNnYwdWJkMWlva2l1bnk4OHA4N2Mydm5tYW40OHVkenVidyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tqfS3mgQU28ko/giphy.gif",
		opciones: ["Tiene que ser un número par", "Tiene que terminar en 0 o 5", "Lo pongo tan alto que parecemos sordos", "Todas las anteriores"],
		correcta: 3
	},
	{
		texto: "Si te mando un video o un meme, ¿qué espero de tu parte?",
		img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDRiN3YzeDE4cHg1NWQxOHcwamUwbXQ2Y3MwZjR6eHdnaGUwMHBpaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohc196klOZvLguVry/giphy.gif",
		opciones: ["Un 'jajaja' inmediato aunque sea mentira", "Que me mandes otro mejor", "Un análisis profundo del video", "Que lo veas a mi lado 10 segundos después"],
		correcta: 0
	},
	{
		texto: "Si la peli empezó hace 5 minutos y seguimos en la cola de las palomitas, ¿qué hago?",
		img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDVsYmp6Z2tjeTc3Y3Eycm5lYWVyc2U5a3pjZmMwMnJpbWxxZHJhcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z0tFWbRWGwwTe/giphy.gif",
		opciones: ["Abandono la misión y entro sin nada", "Miro fijamente al que está pagando para que corra", "Me pongo nervioso/a y empiezo a resoplar", "Digo que ya no quiero ver la película"],
		correcta: 2
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
		opciones: ["No conozco ese termino", "No no no no", "Soy un Globo, no tengo sentimientos", "SHIIIII"],
		correcta: 3
	}
];

opcionesPersuasion.forEach(opcion => {
	const img = new Image();
	img.src = opcion.img;
});

preguntas.forEach(opcion => {
	const img = new Image();
	img.src = opcion.img;
});

let ultimaOpcion = -1;
let preguntaActual = 0;
let aciertos = 0;
let indiceActualPersuasion = 0;

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
		fImg.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWd6dndld3Yxanptb3lmazZkcDR4emMycG9lcGJsNWNtdWo1dWFpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xThta1ONGRY4aXOBDq/giphy.gif";
		fTitle.innerText = "¡Correcto! 🥰";
	} else {
		fImg.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG84cXRicXVhNmk1NzhzdG9weXpvejR1N2prY3l6bDNkYzlqcXppdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aVytG2ds8e0tG/giphy.gif";
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

// Colores de la bandera LGTBIQ+
const coloresPride = ['#E74C3C', '#E67E22', '#F1C40F', '#2ECC71', '#3498DB', '#9B59B6'];
const container = document.querySelector('.emoji-background');

function crearCorazonLluvia() {
	if (!container) return;

	const heart = document.createElement('div');
	heart.classList.add('emoji-particle', 'pride-heart');

	// LA MAGIA: El corazón + el selector de variante de texto
	// Esto desactiva el emoji de Apple y activa el color CSS
	heart.innerText = '\u2764\uFE0E';

	// Color de la bandera
	const colorAzar = coloresPride[Math.floor(Math.random() * coloresPride.length)];
	heart.style.setProperty('--heart-color', colorAzar);

	// Reparto horizontal
	heart.style.left = Math.random() * 100 + "vw";

	// Reparto vertical inicial (para que no empiecen todos arriba a la vez)
	// Al ponerles un top negativo aleatorio, irán entrando en tiempos diferentes
	heart.style.top = -(Math.random() * 100) + "vh";

	// Tamaño
	heart.style.fontSize = (Math.random() * 15 + 12) + "px";

	// Velocidad de caída lenta (entre 10 y 20 segundos)
	const duracion = Math.random() * 10 + 10;
	heart.style.setProperty('--duration', duracion + "s");

	// Un toque de difuminado para los que están "lejos"
	if (Math.random() > 0.5) {
		heart.style.filter = "blur(1px)";
		heart.style.opacity = "0.4";
	}

	container.appendChild(heart);
}

// CREAR LOS 50
for (let i = 0; i < 100; i++) {
	crearCorazonLluvia();
}