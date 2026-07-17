"use strict";

/* ==========================================================
   PROYECTO:
   SIMULACRO DE EXAMEN DE ASCENSO DE CATEGORÍA 2026

   Archivo:
   app.js

   Versión:
   1.0.1
========================================================== */

class App {
  constructor() {
    this.app = document.getElementById("app");
  }

  async iniciar() {
    await this.cargarComponente("login");
  }

  async cargarComponente(nombre) {
    try {
      const respuesta = await fetch(`componentes/${nombre}.html`);

      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar ${nombre}.html`);
      }

      const html = await respuesta.text();

      this.app.innerHTML = html;

      console.log("Cargando:", nombre);

      switch (nombre) {
        case "login":
          window.login = new Login();

          window.login.iniciar();

          break;

        case "examen":
          window.examen = new Examen();

          window.examen.iniciar();

          break;

        case "resultado":
          window.resultado = new Resultado();

          window.resultado.iniciar();

          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();

  window.app.iniciar();
});
