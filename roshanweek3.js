// roshanweek3.js
$(document).ready(function () {

    // ---------- Menu: hamburger + responsive fix ----------
    const $navLinks = $("#navLinks");
    const $hamburger = $("#hamburgerBtn");

    // hamburger click (mobile)
    $hamburger.click(function () {
        $navLinks.stop(true, true).slideToggle(300);
    });

    // on resize ensure proper layout:
    // - if wide: show nav and force horizontal (flex)
    // - if narrow: hide nav (so hamburger controls it)
    function onResize() {
        if ($(window).width() > 700) {
            // show and ensure horizontal layout
            $navLinks.show();
            $navLinks.css({
                "display": "flex",
                "flex-direction": "",
                "position": "",
                "top": "",
                "right": ""
            });
        } else {
            // smaller screens: hide by default (hamburger will toggle)
            $navLinks.hide();

            // keep the column layout when shown by hamburger (CSS handles most)
            $navLinks.css({
                "display": "block",
                "flex-direction": "column"
            });
        }
    }

    // run once on load and on resize
    onResize();
    $(window).on("resize", function () {
        onResize();
    });

    // ---------- Image animation (runs once per click) ----------
    const imgA = "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\wp2372393.jpg";
    const imgB = "C:\\Users\\nepal\\OneDrive\\Desktop\\New folder (2)\\download.jpg";

    let toggleImage = false; // which image will be used next
    let animating = false;   // prevents double-starts

    $("#animateBtn").click(function () {
        if (animating) return; // ignore if already running
        animating = true;
        $("#animateBtn").prop("disabled", true);

        const $photo = $("#photo");

        // ensure starting position/size/opacity
        $photo.css({
            left: $photo.css("left") || "0px",
            width: $photo.width() + "px",
            height: $photo.height() + "px",
            opacity: 1
        });

        // Sequence:
        // 1) slide right
        // 2) increase height & width
        // 3) change photo (alternating)
        // 4) lower opacity + shrink
        // 5) return to original size/opacity/position

        $photo
            .animate({ left: "+=200px" }, 1500)
            .animate({ width: "400px", height: "400px" }, 1500)
            .queue(function (next) {
                // swap image (alternate)
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
                // animation complete
                animating = false;
                $("#animateBtn").prop("disabled", false);
            });
    });
});
