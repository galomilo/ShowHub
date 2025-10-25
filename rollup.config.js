export default {
  input: "banner/ShowHub.js", // tu archivo modular original
  output: {
    file: "banner/banner.build.js", // archivo compilado (build)
    format: "iife",                 // formato clásico para navegadores
    name: "ShowHubLib"              // acceso global: window.ShowHubLib
  }
};
