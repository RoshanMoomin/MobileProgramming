$(document).ready(function() {
  let toggle = false; // track current image

  $("#animateBtn").click(function() {
    const photo = $("#photo");

    // Step 1: Slide right and grow slowly
    photo.animate({
      left: "+=150px",
      width: "400px",
      height: "400px"
    }, 1500, function() { // slower: 1.5s

      // Step 2: Change image based on toggle
      if (!toggle) {
        photo.attr("src", "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\download.jpg");
      } else {
        photo.attr("src", "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\wp2372393.jpg");
      }
      toggle = !toggle;

      // Step 3: Fade out a bit and shrink slowly
      photo.animate({
        opacity: 0.3,
        width: "150px",
        height: "150px",
        left: "-=150px"
      }, 1500, function() { // slower: 1.5s

        // Step 4: Return to original position and opacity smoothly
        photo.animate({
          opacity: 1,
          width: "250px",
          height: "250px",
          left: "0px"
        }, 1500); // slower: 1.5s
      });
    });
  });
});
