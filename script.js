// Código principal del juego de boxeo
document.addEventListener('DOMContentLoaded', () => {
    const btnJugar = document.getElementById('btn-jugar');
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const boxeador1 = document.getElementById('boxeador1');
    const boxeador2 = document.getElementById('boxeador2');

    // Posiciones iniciales de los boxeadores
    let pos1 = 100;
    let pos2 = 700;

    // Velocidades de los boxeadores
    const velocidad1 = 5;
    const velocidad2 = 5;

    // Teclas presionadas
    const teclas = {
        a: false,
        d: false,
        ArrowLeft: false,
        ArrowRight: false
    };

    const accionesIA = ['moverAdelante', 'moverAtras', 'golpear'];

    // Cambiar a la pantalla de juego
    btnJugar.addEventListener('click', () => {
        pantallaInicio.classList.add('oculto');
        pantallaJuego.classList.remove('oculto');
        iniciarJuego();
    });

    // Control de teclas
    document.addEventListener('keydown', (e) => {
        if (teclas.hasOwnProperty(e.key)) {
            teclas[e.key] = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (teclas.hasOwnProperty(e.key)) {
            teclas[e.key] = false;
        }
    });

    function actualizarPosiciones() {
        // Mover boxeador 1 (A y D)
        if (teclas.a && pos1 > 0) pos1 -= velocidad1;
        if (teclas.d && pos1 < 750) pos1 += velocidad1;

        // Mover boxeador 2 (←  y →)
        if (teclas.ArrowLeft && pos2 > 0) pos2 -= velocidad2;
        if (teclas.ArrowRight && pos2 < 750) pos2 += velocidad2;

        // Actualizar posiciones en pantalla
        boxeador1.style.left = pos1 + 'px';
        boxeador2.style.left = pos2 + 'px';
    }

    function comportamientoIA() {
        const accion = accionesIA[Math.floor(Math.random() * accionesIA.length)];
        switch (accion) {
            case 'moverAdelante':
                moverIAAdelante();
                break;
            case 'moverAtras':
                moverIAAtras();
                break;
            case 'golpear':
                golpearIA();
                break;
        }
    }

    function moverIAAdelante() {
        if (pos2 > pos1 + 60) {
            pos2 -= velocidad2;
            boxeador2.style.left = pos2 + 'px';
        }
    }

    function moverIAAtras() {
        if (pos2 < 750) {
            pos2 += velocidad2;
            boxeador2.style.left = pos2 + 'px';
        }
    }

    function golpearIA() {
        if (Math.abs(pos1 - pos2) < 70) {
            animarGolpe(boxeador2);
            vida1 -= 10;
            actualizarVida();
        }
    }

    function animarGolpe(boxeador) {
        boxeador.classList.add('golpe');
        setTimeout(() => boxeador.classList.remove('golpe'), 200);
    }

    function actualizarVida() {
        // Lógica para actualizar la barra de vida
    }

    function iniciarJuego() {
        // Bucle del juego
        function gameLoop() {
            actualizarPosiciones();
            requestAnimationFrame(gameLoop);
        }
        gameLoop();
        setInterval(comportamientoIA, 1000);
    }
}); 