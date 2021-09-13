var totalWheelDelta = 0, justChanged = false;

function scrollToElement(id, userInitiated=false){
    if(justChanged && userInitiated) return;
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#"+id).offset().top
    }, 500);
    justChanged = true;
    totalWheelDelta = 0;
}

const projectData = [
    {
        "title": "Time Trial Racing", 
        "link": "https://chrome.google.com/webstore/detail/time-trial-racing/phfhalhmobjblhoajagaeodhofnopcbm?hl=en", 
        "image": "https://lh3.googleusercontent.com/e0ONEoXMZO3cldgXZdZNKjkWVMFVZfeCUlfV4JYxuHHYdfE9H7nDf_fgudPZKMSngHVGvrgPVq4PpLueszD2v1rx9A=w128-h128-e365",
        "description": "2D top-down single-player racer published on Chrome Web Store. Made in HTML5 canvas with independently created physics.",
    },
    {
        "title": "Nugit", 
        "position": "Software Engineering Intern",
        "link": "https://nugit.co/", 
        "image": "https://www.datocms-assets.com/6862/1534928447-favicon256.png",
        "description": "Interviewed and obtained a paid internship during summer and worked on building data pipelines with Apache Airflow that pulled big data from APIs to be aggregated and presented in visual forms.",
    },
    {
        "title": "House SAS", 
        "link": "https://house-sas.com", 
        "image": "house-sas.png",
        "description": "Created a platform for my highschool's house system. Built with PHP and JavaScript. Includes a full admin page to edit settings.",
    },
    {
        "title": "Matrix Calculator", 
        "link": "https://matrix.advayratan.com", 
        "image": "https://live.staticflickr.com/5225/5639214967_e37009d248_b.jpg",
        "description": "A feature-rich matrix calculator made in high school Linear Algebra. Includes 2D/3D visualizations, variable storage, parsing, and many different kinds of matrix functions (like RREF, eigenvectors, LU factorization etc.)",
    },
    {
        "title": "Productive New Tab", 
        "link": "https://chrome.google.com/webstore/detail/productivity-new-tab/dnnaopiaolaelpmcefbloemfnlhcdjlm?hl=en&authuser=2", 
        "image": "https://lh3.googleusercontent.com/Q2ZuQ3aJ8Dm3eBtg9UAKB7w9eACvru0YtBVf0tvDMQuKIS7wvFZDJshBBjHDe_sLFKNuR-Pv_0zll87CX3fzYfE9=w128-h128-e365",
        "description": "A modular new tab primarily designed for myself. Includes a todo list, variable backgrounds, variable color themes, a reading list, notes, and more. Plan on expanding it to allow any users to add tools in the future.",
    },
    {
        "title": "Ambition Website", 
        "link": "http://ambitionclothing.net/", 
        "image": "https://i0.wp.com/ambitionclothing.net/wp-content/uploads/2021/02/Ambition-Earth-1.png?resize=300%2C280&ssl=1",
        "description": "Wordpress e-commerce site created for classmate's clothing brand.",
    },
    {
        "title": "SaZa Website", 
        "link": "http://sazadesigns.com/", 
        "image": "https://i0.wp.com/sazadesigns.com/wp-content/uploads/2020/12/cropped-MediumSquareLogo.png?w=400&ssl=1",
        "description": "Wordpress e-commerce site created for family friend's greeting/gifting card business.",
    },
    {
        "title": "Satellite Image Generator", 
        "link": "https://github.com/ARtheboss/big-satellite-images", 
        "image": "https://www.zerogravity.fi/wp-content/uploads/2019/11/satellite-data-e1572891876593-621x556.jpg",
        "description": "A script to generate high quality satellite images from Google Maps. Used to get realistic tracks like Spa Francochamps for Time Trial Racing.",
    },
    {
        "title": "Fusician", 
        "link": "https://www.linkedin.com/company/66355579/admin/", 
        "image": "https://media-exp1.licdn.com/dms/image/C560BAQEKgG_o-GO5Aw/company-logo_200_200/0/1596855419044?e=1635379200&v=beta&t=WWtwDt7zkNPr670FkMXv0AGQdxtBNtsQvnmyqHqnLDQ",
        "description": "A social-media style app to help amateur musicians. Includes a basic Digital Audio Workstation that is beginner friendly, and ways to share/collaborate on music. Created with Flutter and utilizes a Django backend.",
    },
    {
        "title": "SAS PES", 
        "link": "https://chrome.google.com/webstore/detail/sas-powerschool-enhanceme/ehnkngeidilnoabcjjimkomcggndbhnk?hl=en", 
        "image": "https://lh3.googleusercontent.com/m8Eq6Isft3fbqry31uz9zN4IyQkIWorJl9sGe74uw64hNshd4LoMD-kNtk08XvaFxv_M6dbba8uHXNE99soOx450Wg=w128-h128-e365-rj-sc0x00ffffff",
        "description": "Only project here not initiated by me. An enhancement for my school's gradebook used by hundreds of students. I contributed some features, including a way to help see the impact of future grades/exemptions based on weighting.",
    },
    {
        "title": "Corruption Simulator", 
        "link": "https://corruptionsim.advayratan.com", 
        "image": "corruptionsim.png",
        "description": "A 'choose your own adventure' game to teach users about corruption. Created as a world history final project in 9th grade.",
    },
    {
        "title": "SpaceApps Quiz Game", 
        "link": "https://spaceapps.advayratan.com/", 
        "image": "spaceapps.png",
        "description": "A quiz game created for NASA SpaceApps 2019 hackathon. Utilizes NASA data to see how good your geographical/demographic knowledge is.",
    },
]

const nextPages = {"home-page": "about-page", "about-page": "projects-page", "projects-page": "contact-page"};
const prevPages = {"about-page": "home-page", "projects-page": "about-page", "contact-page": "projects-page"};

function showBack(i){
    var frontSelector = "#" + i + "-card > div.card-front";
    var backSelector = "#" + i + "-card > div.card-back";
    $(frontSelector).css("display", "none");
    $(backSelector).css("display", "inline-block");
}

function showFront(i){
    var frontSelector = "#" + i + "-card > div.card-front";
    var backSelector = "#" + i + "-card > div.card-back";
    $(frontSelector).css("display", "inline-block");
    $(backSelector).css("display", "none");
}

$(document).ready(function(){

    var projectHtml = "";
    projectData.forEach(function(data, i){
        /*
        projectHtml += `
        <div class='card' id='`+i+`-card'>
            <div class='card-front'>
                <div class='card-header'>
                    <a href='`+data['link']+`' target='_blank'>
                        `+data['title']+`
                        <br>
                        <img class='card-image' src='`+data['image']+`'>
                    </a>
                </div>
                <button class='card-button' onClick="showBack(`+i+`)">Details</button>
            </div>
            <div class='card-back'>
                <div class='card-header'>
                <a href='`+data['link']+`' target='_blank'>`+data['title']+`</a>
                </div>
                <div class='card-description'>`+data['description']+`</div>
                <button class='card-button' onClick="showFront(`+i+`)">Back</button>
            </div>
        </div>`;*/
        projectHtml += `
        <div class='about-info-tile'>
        <span class='front'>
            <img src=` + data['image'] + `>
            <div class='front-title'>
                <h3>`+ data['title'] +`</h3>`
        if("position" in data) projectHtml += "<h4>" + data['position'] + "</h4>";
        projectHtml += `</div>
        </span>
        <span class='back'>
            <p>`+ data['description'] +`
            <br>
            <a href='`+data['link']+`' target='_blank'>Open <i class='fa fa-external-link'></i></a>
            </p>
        </span>
        </div>
        `;
    });
    $("#code-about-block").html(projectHtml);

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
    var shooting_star_points = [];
    var stars = [];
    var loop = 0;
    var x = 0;
    var y = 0;
    var shift_pressed = false;
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
        canvas.height = document.body.offsetHeight * 5/16;
        simulateStarFill();
        animationInterval = drawComponents();
    }
    function simulateStarFill(){
        var loop = 0, nodeletes = true;
        while(nodeletes){
            for(var i = 0; i < stars.length; i++){
                if(stars[i].y < 0){
                    stars.splice(i, 1);
                    i--;
                    nodeletes = false;
                }else{
                    stars[i].y -= stars[i].v;
                }
            }
            if(loop % 5 == 0){
                stars.push({"x": Math.random() * canvas.width, "y": canvas.height, "v": Math.random()/4 + 0.25, "size": (Math.random() + 0.5) * 4});
            }
            loop++;
        }
    }
    function drawComponents(){
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#61c4ff"//"#ffbb00";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        return setInterval(function(){
            ctx.fillStyle = "gray";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            trail.push({"x": x, "y": y});
            while(trail.length > 10 && !shift_pressed){
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
            ctx.fillRect(x - 3, y - 3, 6, 6);
            ctx.stroke();
            loop++;
            /*
            for(var i = 0; i < shooting_star_points.length; i++){
                ctx.beginPath();
                ctx.moveTo(shooting_star_points[i].x, shooting_star_points[i].y);
                ctx.lineTo(shooting_star_points[i].x - 100, shooting_star_points[i].y - 50);
                ctx.stroke();
                shooting_star_points[i].x += 10;
                shooting_star_points[i].y += 5;
            }
            if(loop % 10 == 0) shooting_star_points.push({"x": Math.random() * 100 - 100, "y": Math.random() * 100 - 100})
            */
            ctx.fillStyle = "white";
            for(var i = 0; i < stars.length; i++){
                if(stars[i].y < 0){
                    stars.splice(i, 1);
                    i--;
                }else{
                    ctx.fillRect(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
                    stars[i].y -= stars[i].v;
                }
            }
            if(loop % 5 == 0){
                stars.push({"x": Math.random() * canvas.width, "y": canvas.height, "v": Math.random()/4 + 0.25, "size": (Math.random() + 0.5) * 4});
            }
        }, 1000/60);
    }

    $(".about-block").on("click", function(){
        $(".about-content").css("display", "none");
        $(this).find(".about-content").eq(0).css("display", "grid");
    });

    $(".down-arrow").on("click", function(){
        activePage = "about-page";
        scrollToElement(activePage);
    });

    $("body").on("keydown", function(e){
        if(e.key === "Shift") shift_pressed = true;
    });
    $("body").on("keyup", function(e){
        if(e.key === "Shift") shift_pressed = false;
        if(e.key === "ArrowDown"){
            if(activePage != "contact-page"){
                activePage = nextPages[activePage];
                scrollToElement(activePage)
            }
        }
        if(e.key === "ArrowUp"){
            if(activePage != "home-page"){
                activePage = prevPages[activePage];
                scrollToElement(activePage)
            }
        }
    });

    $("body").find(".about-block").eq(0).find(".about-content").eq(0).css("display", "grid");
});