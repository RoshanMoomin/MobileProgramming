
$(document).ready(function () {

    const $navLinks = $("#navLinks");
    const $hamburger = $("#hamburgerBtn");

    $hamburger.click(function () {
        $navLinks.stop(true, true).slideToggle(300);
    });


    function onResize() {
        if ($(window).width() > 700) {
  
            $navLinks.show();
            $navLinks.css({
                "display": "flex",
                "flex-direction": "",
                "position": "",
                "top": "",
                "right": ""
            });
        } else {
    
            $navLinks.hide();

    
            $navLinks.css({
                "display": "block",
                "flex-direction": "column"
            });
        }
    }

    onResize();
    $(window).on("resize", function () {
        onResize();
    });
    const imgA = "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\wp2372393.jpg";
    const imgB = "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\download.jpg";

    let toggleImage = false; 
    let animating = false;   

    $("#animateBtn").click(function () {
        if (animating) return; 
        animating = true;
        $("#animateBtn").prop("disabled", true);

        const $photo = $("#photo");

        $photo.css({
            left: $photo.css("left") || "0px",
            width: $photo.width() + "px",
            height: $photo.height() + "px",
            opacity: 1
        });

    

        $photo
            .animate({ left: "+=200px" }, 1500)
            .animate({ width: "400px", height: "400px" }, 1500)
            .queue(function (next) {

                if (!toggleImage) {
                    $photo.attr("src", imgB);
                } else {
                    $photo.attr("src", imgA);
                }
                toggleImage = !toggleImage;
                next();
            })
            .animate({ opacity: 0.3, width: "150px", height: "150px" }, 1500)
            .animate({
                left: "0px",
                width: "250px",
                height: "250px",
                opacity: 1
            }, 1500, function () {
                animating = false;
                $("#animateBtn").prop("disabled", false);
            });
    });
});
