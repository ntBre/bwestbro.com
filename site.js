$(document).ready(function () {
    $(".dropbtn").click(function () {
        if ($("#dropdown").css("display") == "none") {
            $("#dropdown").css("display", "block");
        }
        else {
            $("#dropdown").css("display", "none");
        }
    });
});
