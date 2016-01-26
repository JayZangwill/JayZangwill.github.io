//鼠标经过换图
function mmov() {
    document.getElementById("heade").src = "images/logo.png";
}

function mmou() {
    document.getElementById("heade").src = "images/logo1.png";
}
//字体大小
function changesize(className) {
    var aaId = document.getElementById("aa");
    aaId.className = className;
}
//顶部
{

    function backTop() {
        window.scrollTo(0, 0);
    }
}
