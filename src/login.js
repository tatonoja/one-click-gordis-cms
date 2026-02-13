// Función para mostrar la web una vez autenticado
function mostrarWeb() {
	console.log("Acceso concedido. Limpiando widget...");

	// 1. Hacemos visible el contenido real
	document.body.style.visibility = "visible";
	document.body.classList.add("u-authenticated");

	// 2. Cerramos el widget de forma oficial
	if (window.netlifyIdentity) {
		window.netlifyIdentity.close();
	}

	// 3. ELIMINACIÓN RADICAL: Borramos el iframe del DOM para que no bloquee clics
	const widget = document.getElementById('netlify-identity-widget');
	if (widget) {
		widget.remove();
		// También quitamos la clase que Netlify añade al body y que suele bloquear el scroll
		document.body.classList.remove('nf-modal-open');
		console.log("Iframe eliminado con éxito.");
	}
}

if (window.netlifyIdentity) {
	// 1. Comprobar estado inicial inmediatamente
	const user = window.netlifyIdentity.currentUser();

	if (user) {
		mostrarWeb();
	} else {
		// 2. Si no hay usuario, esperamos al init para abrir el modal
		window.netlifyIdentity.on("init", user => {
			if (!user) {
				window.netlifyIdentity.open();
			} else {
				mostrarWeb();
			}
		});
	}

	// 3. GESTIÓN DEL LOGIN (Sin recarga infinita)
	window.netlifyIdentity.on("login", user => {
		console.log("Login exitoso");
		window.netlifyIdentity.close();

		// En lugar de reload() directo, esperamos a que el modal se cierre
		// y solo recargamos si es estrictamente necesario, o simplemente mostramos la web
		mostrarWeb();

		// Si notas que el estado no se actualiza bien sin recargar:
		// setTimeout(() => { location.reload(); }, 300);
	});

	// Gestionar cuando se cierra el modal (por si lo cierra sin loguearse)
	window.netlifyIdentity.on("close", () => {
		const user = window.netlifyIdentity.currentUser();
		if (!user) {
			window.netlifyIdentity.open(); // Obligamos a loguearse
		}
	});
}