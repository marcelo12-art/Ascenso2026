"use strict";

/* ==========================================================
   PROYECTO:
   SIMULACRO DE EXAMEN DE ASCENSO DE CATEGORÍA 2026

   Archivo:
   examen.js

   Versión:
   1.0.0
========================================================== */

class Examen {
  constructor() {
    this.preguntas = [];

    this.preguntaActual = 0;

    this.respuestas = [];
    this.tiempoRestante = CONFIG.TIEMPO_EXAMEN;

    this.intervalo = null;

    this.tiempoFinalizado = false;

    this.correctas = 0;

    this.incorrectas = 0;

    this.nota = 0;
  }

  async iniciar() {
    await this.cargarPreguntas();

    this.obtenerElementos();

    this.configurarEventos();

    this.mostrarPregunta();
    this.iniciarTemporizador();
  }

  async cargarPreguntas() {
    try {
      this.preguntas = [];

      for (const archivo of CONFIG.PDFS) {
        const respuesta = await fetch(`data/preguntas/${archivo}`);

        if (!respuesta.ok) {
          throw new Error(`No se pudo cargar ${archivo}`);
        }

        const banco = await respuesta.json();

        const mezcladas = this.mezclarArreglo(banco);

        const seleccionadas = mezcladas.slice(0, CONFIG.PREGUNTAS_POR_PDF);

        this.preguntas.push(...seleccionadas);
      }

      this.preguntas = this.mezclarArreglo(this.preguntas);
    } catch (error) {
      console.error("Error cargando preguntas:", error);
    }
  }

  mezclarArreglo(arreglo) {
    const copia = [...arreglo];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  obtenerElementos() {
    this.lblPregunta = document.getElementById("pregunta");

    this.lblContador = document.getElementById("contadorPregunta");

    this.opciones = document.querySelector(".opciones");

    this.btnAnterior = document.getElementById("btnAnterior");

    this.btnSiguiente = document.getElementById("btnSiguiente");
    this.barra = document.getElementById("barraProgreso");

    this.lblPorcentaje = document.getElementById("porcentaje");
    this.lblTiempo = document.getElementById("temporizador");
  }

  configurarEventos() {
    this.btnAnterior.addEventListener("click", () => {
      this.anterior();
    });

    this.btnSiguiente.addEventListener("click", () => {
      this.siguiente();
    });

    document.getElementById("btnCancelar").addEventListener("click", () => {
      this.cerrarModalFinalizar();
    });

    document.getElementById("btnAceptar").addEventListener("click", () => {
      this.finalizarExamen();
    });
  }

  mostrarPregunta() {
    if (this.preguntas.length === 0) {
      this.lblPregunta.textContent = "No existen preguntas.";

      return;
    }

    const pregunta = this.preguntas[this.preguntaActual];

    this.lblPregunta.textContent = pregunta.pregunta;

    this.lblContador.textContent = `Pregunta ${this.preguntaActual + 1} de ${this.preguntas.length}`;
    const porcentaje = Math.round(
      ((this.preguntaActual + 1) / this.preguntas.length) * 100,
    );

    this.barra.style.width = `${porcentaje}%`;

    this.lblPorcentaje.textContent = `${porcentaje}%`;

    this.opciones.innerHTML = "";

    pregunta.opciones.forEach((texto, index) => {
      const checked =
        this.respuestas[this.preguntaActual]?.opcion === index ? "checked" : "";

      this.opciones.innerHTML += `

            <label>

                <input
                    type="radio"
                    name="respuesta"
                    value="${index}"
                    ${checked}
                >

                ${texto}

            </label>

        `;
    });

    // Guardar automáticamente cuando el usuario cambie de opción

    document.querySelectorAll('input[name="respuesta"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.respuestas[this.preguntaActual] = {
          opcion: Number(e.target.value),

          dentroDelTiempo: !this.tiempoFinalizado,
        };
      });
    });

    // ===============================
    // Cambiar botón en la última pregunta
    // ===============================

    if (this.preguntaActual === this.preguntas.length - 1) {
      this.btnSiguiente.innerHTML = "🏁 FINALIZAR EXAMEN";
    } else {
      this.btnSiguiente.innerHTML = "Siguiente ➜";
    }
  }

  siguiente() {
    // Si estamos en la última pregunta,
    // no avanzamos, mostramos la confirmación

    if (this.preguntaActual === this.preguntas.length - 1) {
      this.abrirModalFinalizar();

      return;
    }

    this.preguntaActual++;

    this.mostrarPregunta();
  }

  anterior() {
    if (this.preguntaActual > 0) {
      this.preguntaActual--;

      this.mostrarPregunta();
    }
  }
  iniciarTemporizador() {
    this.actualizarTiempo();

    this.intervalo = setInterval(() => {
      this.tiempoRestante--;

      this.actualizarTiempo();

      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);

        this.tiempoFinalizado = true;

        this.tiempoAgotado();
      }
    }, 1000);
  }
  actualizarTiempo() {
    const horas = String(Math.floor(this.tiempoRestante / 3600)).padStart(
      2,
      "0",
    );

    const minutos = String(
      Math.floor((this.tiempoRestante % 3600) / 60),
    ).padStart(2, "0");

    const segundos = String(this.tiempoRestante % 60).padStart(2, "0");

    this.lblTiempo.textContent = `⏰ ${horas}:${minutos}:${segundos}`;
  }
  tiempoAgotado() {
    alert("El tiempo de 2 horas ha finalizado.");
  }
  abrirModalFinalizar() {
    const modal = document.getElementById("modal");

    modal.classList.remove("oculto");
  }

  cerrarModalFinalizar() {
    const modal = document.getElementById("modal");

    modal.classList.add("oculto");
  }

  finalizarExamen() {
    clearInterval(this.intervalo);

    this.calcularResultado();

    const detalle = this.preguntas.map((pregunta, index) => {
      return {
        numero: index + 1,

        pregunta: pregunta.pregunta,

        respuestaUsuario: this.respuestas[index]
          ? pregunta.opciones[this.respuestas[index].opcion]
          : "No respondió",

        respuestaCorrecta: pregunta.opciones[pregunta.correcta],

        correcta: this.respuestas[index]?.opcion === pregunta.correcta,
        respondidaDentroDelTiempo: this.respuestas[index]
          ? this.respuestas[index].dentroDelTiempo
          : true,

        unidad: pregunta.unidad || "",

        pdf: pregunta.pdf || "",

        pagina: pregunta.pagina || "",

        explicacion: pregunta.explicacion || "",
      };
    });

    localStorage.setItem(
      "resultado",
      JSON.stringify({
        nota: this.nota,
        correctas: this.correctas,
        incorrectas: this.incorrectas,
        tiempo: this.lblTiempo.textContent,
        detalle: detalle,
      }),
    );

    window.app.cargarComponente("resultado");
  }

  calcularResultado() {
    this.correctas = 0;

    this.incorrectas = 0;

    this.preguntas.forEach((pregunta, index) => {
      const respuesta = this.respuestas[index]?.opcion;

      if (respuesta === pregunta.correcta) {
        this.correctas++;
      } else {
        this.incorrectas++;
      }
    });

    this.nota = Math.round((this.correctas / this.preguntas.length) * 100);
  }
}
