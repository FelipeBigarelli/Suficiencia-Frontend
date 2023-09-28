/* ARQUIVO QUE CONTEM FUNCIONALIDADES DE POSTAGEM, BUSCA E REMOÇÃO */

// Importações
import menuFunction from './menu.js';
import dialogFunction from './dialogBox.js';

// Array de Tarefas
let arrayTODO = [];

// Para evitar renderização que não existe ao executar o código, usa-se DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const listaItens = document.getElementById("listaItens");

  // Capturar o formulário
  const todoForm = document.getElementById("todoForm");
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário.
    
    // Capturar o valor do campo de entrada
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;


    // Verificar se o campo não está vazio
    if (title.trim() === "" || date.trim() === "" || description.trim() === "") {
      if (title.trim() === "") {
        document.getElementById("title").style.borderColor = "#ff0000";
        document.getElementById("title").placeholder = "Título obrigatório";
      }

      if (date.trim() === "") {
        document.getElementById("date").style.borderColor = "#ff0000";
      }

      if (description.trim() === "") {
        document.getElementById("description").style.borderColor = "#ff0000";
        document.getElementById("description").placeholder = "Descrição obrigatória";
      }

      return false;
    }
    
    if (title.trim() !== "" || date.trim() !== "" || description.trim() !== "") {
      // Adicionar o novo item ao array
      const newTODO = {
        title,
        date,
        description,
      };

      arrayTODO.push(newTODO);
      localStorage.setItem('tarefas', JSON.stringify(arrayTODO));

      // Limpar o campo de entrada
      document.getElementById("title").value = "";
      document.getElementById("date").value = "";
      document.getElementById("description").value = "";

      // Remover alerta de erro
      document.getElementById("title").style.borderColor = "#CFD8DC"; 
      document.getElementById("date").style.borderColor = "#CFD8DC"; 
      document.getElementById("description").style.borderColor = "#CFD8DC"; 

      document.getElementById("title").style.borderWidth = "1px"; 
      document.getElementById("date").style.borderWidth = "1px"; 
      document.getElementById("description").style.borderWidth = "1px";

      dialogFunction.closeDialog('dialog-box1');
      exibirArray();
      listaExcluir();

    } 
  });

  // Função para exibir o array na tela
  function exibirArray() {
    listaItens.innerHTML = "";

    arrayTODO.forEach(function (item) {
      const divItem = document.createElement("div");
      
      const campoTitle = document.createElement("h3");
      campoTitle.textContent = item.title;
      campoTitle.style.color = "#404040";

      const campoDate = document.createElement("h6");
      campoDate.textContent = item.date;
      campoDate.style.color = "#d3d3d3";
      campoDate.style.paddingTop = "12px";
      campoDate.style.paddingBottom = "12px";

      const campoDescription = document.createElement("h5");
      campoDescription.textContent = item.description;
      campoDescription.style.color = "#808080";
      campoDescription.style.paddingBottom = "40px";

      const addLine = document.createElement("hr");
      addLine.style.border = "1px solid #bfbfbf";
      addLine.style.marginBottom = "32px";
      
      divItem.appendChild(campoTitle);
      divItem.appendChild(campoDate);
      divItem.appendChild(campoDescription);
      divItem.appendChild(addLine);


      listaItens.appendChild(divItem);
    });
  }

  // BUSCA DE TAREFAS
  // Referenciando os elementos do filtro HTML
  const filtroTitulo = document.getElementById("filtroTitulo");
  const filtroData = document.getElementById("filtroData");
  const filtrarButton = document.getElementById("filtrarButton");
  const resultadoFiltro = document.getElementById("resultadoFiltro");

  filtrarButton.addEventListener('click', filtrarItens);

  // Função para filtrar dados do array
  function filtrarItens() {
    resultadoFiltro.innerHTML = ''; // Limpar o conteúdo anterior
    const tituloFiltro = filtroTitulo.value.toLowerCase();
    const dataFiltro = filtroData.value;

    if (tituloFiltro === "" || dataFiltro === "") {
      alert('Insira os campos corretamente');
      return;
    }

    // Filtrar os itens com base nos critérios
    const itensFiltrados = arrayTODO.filter(item => {
      const tituloItem = item.title.toLowerCase();
      const dataItem = item.date;

      return tituloItem.includes(tituloFiltro) && (dataFiltro === '' || dataItem === dataFiltro);
    });

    // Exibir o resultado encontrado no elemento "resultadoFiltro"
    mostrarResultados(itensFiltrados);
  } 

  // Exibir a tarefa filtrada
  function mostrarResultados(itensFiltrados) {
    if (itensFiltrados.length === 0) {
        resultadoFiltro.textContent = 'Nenhum resultado encontrado.';
        return;
    }

    const ul = document.createElement('ul');
    for (const item of itensFiltrados) {
        const li = document.createElement('li');
        li.innerHTML = `Título: ${item.title}<br> Data: ${item.date}<br> Descrição: ${item.description}`;
        ul.appendChild(li);
    }

    resultadoFiltro.appendChild(ul);
  }
  
  // Função para encontrar a tarefa do array e remover do localStorage
  function buscarItem(title, date) {
    for (let i = 0; i < arrayTODO.length; i++) {
      if(arrayTODO[i].title === title && arrayTODO[i].date === date) {
        arrayTODO.splice(i, 1);
        localStorage.setItem('tarefas', JSON.stringify(arrayTODO));
      }
    }

    return null;
  }
  
  // Função para excluir um item da lista
  function removerItem(itemProcurado) {
    var index = arrayTODO.indexOf(itemProcurado); // Encontra o índice do item
    
    if (index !== -1) {
        // arrayTODO.splice(index, 1); // Remove o item do array
        buscarItem(itemProcurado.title, itemProcurado.date);
        dialogFunction.closeDialog('dialog-box3');
        exibirArray();
        listaExcluir();
        alert('Tarefa excluída com sucesso')

        return true; 
    } else {
        return false;  
    }
  }
  
  const buttonExcluir = document.getElementById("dialog-box-excluir");
  
  // Lista das tarefas para a exlusão 
  function listaExcluir() {
    let listaExcluir = document.getElementById("listaExcluir");

    const excluirItem = document.createElement("button");
    excluirItem.textContent = "Excluir";
    excluirItem.style.marginBottom = "4px";
    excluirItem.style.marginTop = "8px";
    excluirItem.addEventListener('click', removerItem);

    listaExcluir.innerHTML = "";

    arrayTODO.forEach(function(item) {
      var itemDiv = document.createElement("div");
      itemDiv.className = "item-excluir"; // Defina uma classe para estilização CSS, se necessário

      var tituloExcluir = document.createElement("p");
      tituloExcluir.textContent = "Título: " + item.title;

      var dataExcluir = document.createElement("p");
      dataExcluir.textContent = "Data: " + item.date;

      var descricaoExcluir = document.createElement("p");
      descricaoExcluir.textContent = "Descrição: " + item.description;

      // Clona o botão criado e adiciona-o a cada item
      const botaoClone = excluirItem.cloneNode(true);
      botaoClone.addEventListener("click", () => removerItem(item));

      var pulaLinha = document.createElement("br");
      
      var quebraLinha = document.createElement("hr");
      quebraLinha.style.marginBottom = "8px";

      // Anexe os elementos ao itemDiv
      itemDiv.appendChild(tituloExcluir);
      itemDiv.appendChild(dataExcluir);
      itemDiv.appendChild(descricaoExcluir);
      itemDiv.appendChild(botaoClone);
      itemDiv.appendChild(pulaLinha);
      itemDiv.appendChild(quebraLinha);

      listaExcluir.appendChild(itemDiv);
    })
  }
  
  // Verificar se o botão de exclusão foi clicado e carregar a lista para a exclusão
  function verificarButtonExcluir() {
    let verifica = document.getElementById("dialog-box-excluir").style.display;
    if ( verifica = "block") {
      return verifica;
    }
    listaExcluir();
  }
  
  buttonExcluir.addEventListener('click', verificarButtonExcluir);
  
  // Adiciona o evento de click do menu mobile
  menuFunction.buttonCloseMobile.addEventListener('click', menuFunction.closeMenuMobile);

});