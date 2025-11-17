$(document).ready(function () {

  const $navLinks = $("#navLinks");
  const $hamburger = $("#hamburgerBtn");

  // hamburger toggle
  $hamburger.click(function () {
    $navLinks.stop(true, true).slideToggle(250);
  });

  // fix menu when resizing back to large screen
  function fixMenu() {
    if ($(window).width() > 700) {
      $navLinks.show();
      $navLinks.css("display", "flex");
    } else {
      $navLinks.hide();
    }
  }

  fixMenu();
  $(window).on("resize", fixMenu);
});
