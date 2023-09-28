// ARQUIVO SERÁ IMPORTADO NO HTML, POIS ESTE CONTÉM FUNÇÕES UTILIZADAS
// DENTRO DO ESCOPO DO HTML
export default {
  // Função para exibir a caixa de diálogo
  showDialog(dialogId) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById(dialogId).style.display = "block";
  },

  // Função para fechar a caixa de diálogo
  closeDialog(dialogId) {
    document.getElementById("overlay").style.display = "none";
    document.getElementById(dialogId).style.display = "none";
    resultadoFiltro.innerHTML = '';
  }
};