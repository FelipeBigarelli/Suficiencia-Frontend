// MENU
export default {
  // Função para fechar o menu mobile
  closeMenuMobile: function closeMenuMobile() {
    let menuOpened = document.getElementById("menu__toggle-mobile");
  
    if(menuOpened.checked = true) {
      menuOpened.checked = false;
    }

    return menuOpened;
  },

  buttonCloseMobile: document.getElementById("close-menu-mobile"),
};