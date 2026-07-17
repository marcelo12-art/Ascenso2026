"use strict";

/* ==========================================================
   PROYECTO:
   SIMULACRO DE EXAMEN DE ASCENSO DE CATEGORÍA

   Gestión 2026

   Archivo:
   config.js

   Versión:
   1.0.0
========================================================== */

const CONFIG = {
  /*=========================================
        INFORMACIÓN GENERAL
    =========================================*/

  SISTEMA: "SIMULACRO DE EXAMEN DE ASCENSO DE CATEGORÍA",

  GESTION: "2026",

  VERSION: "1.0.0",

  AUTOR: "Marcelo Canaza Camacho",

  /*=========================================
        CONTACTO
    =========================================*/

  WHATSAPP: "65612987",

  /*=========================================
        EXAMEN
    =========================================*/

  TOTAL_PREGUNTAS: 100,

  TOTAL_PDF: 10,

  PREGUNTAS_POR_PDF: 10,

  /*=========================================
        TIEMPO
    =========================================*/

  TIEMPO_EXAMEN: 7200,

  /*=========================================
        CÓDIGOS
    =========================================*/

  LONGITUD_CODIGO: 5,

  /*=========================================
        RUTAS
    =========================================*/

  ESCUDO: "img/escudo.png",

  /*=========================================
      BANCO DE PREGUNTAS
=========================================*/

  PDFS: [
    "desarrollo_innovacion_curriculum.json",

    "estilos_metodos_aprendizaje.json",

    "fortalecimiento_educacion_inclusiva.json",

    "guia_violencia_intrafamiliar.json",

    "innovacion_educativa.json",

    "ley_223.json",

    "neurociencia.json",

    "protocolo_prevencion_actuacion.json",

    "reglamento_escalafon_nacional.json",

    "reglamento_faltas_sanciones.json",
  ],

  PREGUNTAS_POR_PDF: 10,
};
