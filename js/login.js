"use strict";

/* ==========================================================
   PROYECTO:
   SIMULACRO DE EXAMEN DE ASCENSO DE CATEGORÍA 2026

   Archivo:
   login.js

   Versión:
   1.0.1
========================================================== */

class Login {
  constructor() {
    this.inputCodigo = document.getElementById("codigo");
    this.btnIngresar = document.getElementById("btnIngresar");

    this.codigos = [];
  }

  async iniciar() {
    await this.cargarCodigos();

    document.getElementById("escudoSistema").src = CONFIG.ESCUDO;

    this.configurarEventos();
  }

  async cargarCodigos() {
    try {
      const respuesta = await fetch("data/codigos.json");

      this.codigos = await respuesta.json();
    } catch (error) {
      console.error("Error cargando los códigos:", error);
    }
  }

  configurarEventos() {
    this.inputCodigo.addEventListener("input", () => {
      this.inputCodigo.value = this.inputCodigo.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .substring(0, 5);
    });

    this.inputCodigo.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.validarCodigo();
      }
    });

    this.btnIngresar.addEventListener("click", () => {
      this.validarCodigo();
    });
  }

  validarCodigo() {
    const codigo = this.inputCodigo.value.trim();

    if (codigo.length !== 5) {
      this.mostrarMensaje("Ingrese un código de 5 caracteres.", false);

      this.inputCodigo.focus();

      return;
    }

    if (this.codigos.includes(codigo)) {
      this.mostrarMensaje("Código válido. Bienvenido.", true);
      setTimeout(() => {
        window.app.cargarComponente("examen");
      }, 800);

      // Aquí cargaremos el examen
    } else {
      this.mostrarMensaje("Código incorrecto.", false);

      this.inputCodigo.focus();

      this.inputCodigo.select();
    }
  }
  mostrarMensaje(texto, correcto) {
    const mensaje = document.getElementById("mensajeLogin");

    mensaje.textContent = texto;

    if (correcto) {
      mensaje.style.color = "#198754";
    } else {
      mensaje.style.color = "#dc3545";
    }
  }
}
