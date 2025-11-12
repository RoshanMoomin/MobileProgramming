$(document).ready(function() {
  let toggle = false; 
  $("#animateBtn").click(function() {
    const photo = $("#photo");

    photo.animate({
      left: "+=150px",
      width: "400px",
      height: "400px"
    }, 1500, function() { 

      if (!toggle) {
        photo.attr("src", "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\download.jpg");
      } else {
        photo.attr("src", "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\wp2372393.jpg");
      }
      toggle = !toggle;


      photo.animate({
        opacity: 0.3,
        width: "150px",
        height: "150px",
        left: "-=150px"
      }, 1500, function() { 

        photo.animate({
          opacity: 1,
          width: "250px",
          height: "250px",
          left: "0px"
        }, 1500); 
      });
    });
  });
});
