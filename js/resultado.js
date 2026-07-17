"use strict";

/* ==========================================================
   PROYECTO:
   SIMULACRO DE EXAMEN DE ASCENSO DE CATEGORÍA 2026

   Archivo:
   resultado.js

   Versión:
   2.0.0
========================================================== */

class Resultado {
  constructor() {
    this.datos = null;
  }

  iniciar() {
    this.datos = JSON.parse(localStorage.getItem("resultado"));

    if (!this.datos) {
      alert("No existen resultados.");

      return;
    }

    this.obtenerElementos();

    this.cargarResumen();

    this.cargarDetalle();
  }

  obtenerElementos() {
    this.lblNota = document.getElementById("notaFinal");

    this.lblCorrectas = document.getElementById("correctas");

    this.lblIncorrectas = document.getElementById("incorrectas");

    this.lblTiempo = document.getElementById("tiempoUsado");

    this.contenedorDetalle = document.getElementById("detallePreguntas");
  }

  cargarResumen() {
    this.lblNota.textContent = this.datos.nota + " / 100";

    this.lblCorrectas.textContent = this.datos.correctas;

    this.lblIncorrectas.textContent = this.datos.incorrectas;

    this.lblTiempo.textContent = this.datos.tiempo;
  }

  cargarDetalle() {
    this.contenedorDetalle.innerHTML = "";

    this.datos.detalle.forEach((item) => {
      const tarjeta = document.createElement("div");

      tarjeta.className = item.correcta
        ? "detalle-card correcta"
        : "detalle-card incorrecta";

      tarjeta.innerHTML = `

            <h2>

                📝 Pregunta ${item.numero}

            </h2>

            <span class="detalle-label">

                ❓ Pregunta

            </span>

            <div class="detalle-texto">

                ${item.pregunta}

            </div>

            <hr>

            <span class="detalle-label">

                👤 Tu respuesta

            </span>

            <div class="detalle-texto">

                ${item.respuestaUsuario}

            </div>

            <hr>

            <span class="detalle-label">

                ✅ Respuesta correcta

            </span>

            <div class="detalle-texto">

                ${item.respuestaCorrecta}

            </div>

            <hr>

            <div>

                ${
                  item.correcta
                    ? '<span class="badge-correcta">✔ RESPUESTA CORRECTA</span>'
                    : '<span class="badge-incorrecta">✘ RESPUESTA INCORRECTA</span>'
                }

            </div>

            <div class="info-extra">

                <div class="info-box">

                    <strong>📚 Unidad</strong>

                    ${item.unidad || "-"}

                </div>

                <div class="info-box">

                    <strong>📄 Documento</strong>

                    ${item.pdf || "-"}

                </div>

                <div class="info-box">

                    <strong>📑 Página</strong>

                    ${item.pagina || "-"}

                </div>

            </div>

            <hr>

            <span class="detalle-label">

                📖 Explicación

            </span>

            <div class="detalle-texto">

                ${item.explicacion || "Sin explicación disponible."}

            </div>

            <hr>

            <span class="detalle-label">

                ⏰ Respondida

            </span>

            <div class="detalle-texto">

                ${
                  item.respondidaDentroDelTiempo
                    ? "✅ Dentro del tiempo"
                    : "❌ Después del tiempo"
                }

            </div>

        `;

      this.contenedorDetalle.appendChild(tarjeta);
    });
  }
}
