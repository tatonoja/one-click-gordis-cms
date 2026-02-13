// Función para gestionar lo que pasa cuando sabemos si hay usuario o no
function inicializarAcceso(user) {
	if (!user) {
		window.netlifyIdentity.open(); // Abre el login si no hay nadie
	} else {
		console.log("Usuario autenticado:", user.email);
		document.body.style.visibility = "visible"; // Aseguramos que se vea
		document.body.classList.add("u-authenticated");
	}
}

// Lógica de inicialización robusta
if (window.netlifyIdentity) {
	// 1. Si el widget ya se inicializó antes de que cargara este script
	const currentUser = window.netlifyIdentity.currentUser();
	if (currentUser) {
		inicializarAcceso(currentUser);
	} else {
		// 2. Si aún no se ha inicializado, esperamos al evento init
		window.netlifyIdentity.on("init", user => {
			console.log("Evento init disparado");
			inicializarAcceso(user);
		});
	}

	// Gestionar el login exitoso
	window.netlifyIdentity.on("login", user => {
		console.log("Login exitoso");
		window.netlifyIdentity.close();
		document.location.reload();
	});
} else {
	// Caso de emergencia: si no carga el script de Netlify, mostramos la web
	console.warn("Netlify Identity no cargado. Mostrando web por seguridad.");
	document.body.style.visibility = "visible";
}