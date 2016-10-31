$(function () {
    $(".toTop").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $(".toTop").fadeIn("slow");
        } else {
            $(".toTop").fadeOut("slow");
        }
    });
    $(".toTop").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});