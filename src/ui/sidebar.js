export function initSidebarControls() {
  const sideBars = document.getElementsByClassName("controls-sidebar");
  const ACTIVE = "active";
  console.log("sideBars", sideBars);
  Array.from(sideBars).forEach((sideBar) => {
    sideBar.addEventListener("click", function(e) {
      e.stopPropagation();
      e.preventDefault();
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