var totalWheelDelta = 0, justChanged = false;

function scrollToElement(id, userInitiated=false){
    if(justChanged && userInitiated) return;
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#"+id).offset().top
    }, 500);
    justChanged = true;
    totalWheelDelta = 0;
}

$(document).ready(function(){

    var pages = [];
    $(".page").each(function(){
        pages.push($(this).attr('id'));
    });

    $('h1').each(function(){ 
        var text = $(this).text(), html = "";
        [...text].forEach(function(char){
            if(char == " ") html += "<span class='name-letter' style='width: 10px;'></span>";
            else html += "<span class='name-letter'>"+char+"</span>";
        });
        $(this).html(html);
    });

    var activePage = "home-page";
    scrollToElement(activePage);
    $(document).on("scroll", function(){
        var wh = $(window).height();
        $(".page").each(function(){
            var rect = $(this)[0].getBoundingClientRect();
            var id = "#" + $(this).attr('id').substring(0, $(this).attr('id').length - 5) + "-nav";
            if(Math.abs(rect.top) < $(window).height() / 10 || (rect.bottom > $(window).height() / 10 && rect.bottom < wh)){
                $(id).addClass('active');
                activePage = $(this).attr('id');
            }else{
                $(id).removeClass('active');
            } 
        });
    });
    var lastWheelDelta = 0;
    const WHEEL_DELTA_THRESHOLD = 3000;
    $(document).bind('mousewheel', function(e){

        totalWheelDelta += e.originalEvent.wheelDelta;
        if(Math.abs(e.originalEvent.wheelDelta) > Math.abs(lastWheelDelta)) justChanged = false;
        else if(justChanged) totalWheelDelta = 0;

        var myInd = pages.indexOf(activePage);

        if(myInd == 0) totalWheelDelta = Math.min(0, totalWheelDelta);
        else if(myInd == pages.length - 1) totalWheelDelta = Math.max(0, totalWheelDelta);

        if(Math.abs(totalWheelDelta) > WHEEL_DELTA_THRESHOLD){
            var newPage = myInd - Math.sign(totalWheelDelta);
            if(newPage < 0 || newPage >= pages.length) return;
            else scrollToElement(pages[newPage], true);
        }

        lastWheelDelta = e.originalEvent.wheelDelta;
    });

    var canvas = document.getElementById('background-canvas');
    var ctx = canvas.getContext('2d');

    canvas.style.width = document.body.offsetHeight;
    canvas.style.height = document.body.offsetWidth;

    var trail = [];
    var loop = 0;
    var x = 0;
    var y = 0;
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        x = event.clientX - 9;
        y = event.clientY - 7;
    }

    var animationInterval = drawComponents();

    initialize();

    function initialize() {
        // Register an event listener to call the resizeCanvas() function 
        // each time the window is resized.
        window.addEventListener('resize', resizeCanvas, false);
        // Draw canvas border for the first time.
        resizeCanvas();
    }
    function resizeCanvas() {
        clearInterval(animationInterval);
        canvas.width = document.body.offsetWidth;
        canvas.height = document.body.offsetHeight;
        animationInterval = drawComponents();
    }
    function drawComponents(){
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#61c4ff"//"#ffbb00";
        ctx.fillStyle = "gray";
        ctx.lineJoin = "round";
        return setInterval(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            trail.push({"x": x, "y": y});
            while(trail.length > 10){
                trail.splice(0, 1);
            }
            ctx.beginPath();
            if(trail.length > 0) ctx.moveTo(trail[0].x, trail[0].y);
            for(var i = 1; i < trail.length - 2; i++){
                var xc = (trail[i].x + trail[i + 1].x) / 2;
                var yc = (trail[i].y + trail[i + 1].y) / 2;
                ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc)
            }
            if(trail.length > 2) ctx.quadraticCurveTo(trail[i].x, trail[i].y, trail[i+1].x, trail[i+1].y)
            ctx.fillRect(x - 2, y - 2, 4, 4);
            ctx.stroke();
            loop++;
        }, 1000/60);
    }
});