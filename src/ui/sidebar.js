export function initSidebarControls() {
  const sideBars = document.getElementsByClassName("controls-sidebar");
  const ACTIVE = "active";
  Array.from(sideBars).forEach((sideBar) => {
    sideBar.addEventListener("click", function(e) {
      const thisSlideButton = e.target;
      const thisSlideBar = thisSlideButton.parentElement;
      if (thisSlideBar.classList.contains(ACTIVE)) {
        thisSlideBar.classList.remove(ACTIVE);
        return;
      }
      thisSlideBar.classList.add(ACTIVE);
    });
  });
}