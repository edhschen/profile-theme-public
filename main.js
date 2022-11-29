themes_main = ["paper", "iceberg", "superuser", "horizon", "arch", "shadow", "mountain", "rgb", "infared", "earth", "ocean", "buzz", "shrubs", "retro", "oblivion", "money"]
themes_origami = ["orange", "blue", "red", "lightblue"]
themes_update = ["arch", "paper"]
themes_spectrum = {
    "orange": ["#ff9100", "#ff7804"],
    "orange3": ["#fd963f",
        "#fd8c3e",
        "#fca040"],
    "orange2": ["#f18a2f",
            "#fa7730",
            "#f98b31",],
    "blue": ["#caf0f8",
            "#ade8f4",
            "#90e0ef"],
    "red": ["#e5383b",
            "#ba181b",
            "#a4161a",
            "#d90429",
            "#ef233c"],
    "lightblue": ['#b2faec',
        '#cbf5f3',
        '#a8eef0'],
    "arch" : ['#101116',
              '#141519',
              '#0c0d11'],
    "paper": ['#F1EFEF',
              '#E9E8E8',
              '#EEEEEE']
}
sections = ["about", "interests", "work", "projects", "teaching"]
theme_current = 0
var style
var bg

themes = [...themes_update]

$(function() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const theme_param = params.get("theme")
    const preset = theme_param ? theme_param : (localStorage.getItem("theme") ? +localStorage.getItem("theme") : null)

    if (preset >= 0 && typeof preset == "number") {
        $("html").removeClass().addClass(themes[preset] + "-theme")
        $("#theme-toggle .theme-text").text(themes[preset])
        // $("#pic-profile").attr("src", "media/origami_"+themes[preset]+".png");
        // new App(themes_spectrum[themes[preset]])
        localStorage.setItem("theme", preset)
        theme_current = preset
    } else {
        $("html").removeClass().addClass(themes[0] + "-theme")
        bg = new App(themes_spectrum[themes[0]])
    }

    $("#theme-toggle").click(function() {
        theme_current = theme_current + 1 < themes.length ? theme_current += 1 : 0
        change_theme(theme_current)      
    })

    $('body').css('display', 'none');
    $('body').fadeIn(1000);
    background_init();

    // $("#pic-profile").dblclick(function() {
    //     $("#pic-profile").fadeTo(200, 0.3, function() {
    //         $("#pic-profile").attr("src", "media/profile_altv2.png")
    //     }).fadeTo(200, 1);
    //     setTimeout(function() {
    //         $("#pic-profile").fadeTo(200, 0.3, function() {
    //             $("#pic-profile").attr("src", "media/profile.png")
    //         }).fadeTo(200, 1);
    //     }, 1400)
    // })
});

var nav = $("#nav-text"),
    navHeight = nav.outerHeight()+15,
    navItems = nav.find("a")
    scrollItems = navItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

var curr_scroll
navItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).position().top + $(href).parent().scrollTop() - $(href).parent().height()/2 + $(href).height()/2;
    // console.log(href, offsetTop)
    curr_scroll = undefined
    $('#content-scroll').stop().animate({ 
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
    curr_scroll = href
    // $(this).attr("selected", "")
});
      
$("#content-scroll").scroll(function() {
    var fromTop = $(this).scrollTop();
    var elemHeight = $(this).height()
    var curr = scrollItems.map(function() {
        if ($(this).position().top < elemHeight/2) 
        // distance from elem to top of viewport - the distance from frame to top top of viewport
        // cutoffs are relative to the TOP of section div
            return this;
    });
    // console.log(curr)
    curr = curr[curr.length-1]
    var id = curr && curr.length ? curr[0].id : "about";
    // console.log(id)
    navItems.removeAttr("selected")
    navItems.filter(`[href="#` + id + `"]`).attr("selected", "")
    // change_theme(sections.indexOf(id) % themes.length)
});

var curr_sec
$('.nav-text-link').hover(
    function () {
        curr_sec = $(this).attr("selected")
        // console.log(curr_sec)
        $(this).attr("selected", "");
    }, 
    function() {
        // console.log(curr_scroll)
        console.log($(this).attr("id"))
        if (($(this).attr("href") != curr_scroll) || ($(this).attr("id") == "theme-toggle")) {
            // console.log($(this))
            // console.log($(this).attr("id"), " removed select")
            !curr_sec && $(this).removeAttr("selected")
        }
    }
);

$('.theme-dot').parent().hover(
    function(){ $(this).addClass(themes[theme_current + 1 < themes.length ? theme_current + 1 : 0] + "-theme") },
    function(){ $(this).removeClass() }
)

function background_init() {
    style = getComputedStyle(document.body)
    effect = VANTA.NET({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: new THREE.Color(parseInt (style.getPropertyValue('--accentcolor').replace("#","0x"), 16)),
    backgroundColor: new THREE.Color(parseInt (style.getPropertyValue('--bgcolor').replace("#","0x"), 16)),
    points: 18.00,
    maxDistance: 20.00,
    showDots: false
    })
}

function change_theme(theme_current) {
    console.log("changing theme to " + themes[theme_current])
    $("html").removeClass().addClass(themes[theme_current] + "-theme")
    $("#theme-toggle .theme-text").text(themes[theme_current])
    localStorage.setItem("theme", theme_current)
    // $("#pic-profile").attr("src", "media/origami_"+themes[theme_current]+".png");
    // $("#c").getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // $("#c").remove()
    // $("body").append($('<canvas/>',{id: 'c'}))
    // const canvas = document.getElementById("c")
    // const context = canvas.getContext('2d');
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // delete bg
    // bg = new App(themes_spectrum[themes[theme_current]])
    console.log(parseInt (style.getPropertyValue('--accentcolor').replace("#","0x"), 16))
    effect.setOptions({
        color: new THREE.Color(parseInt (style.getPropertyValue('--accentcolor').replace("#","0x"), 16)),
        backgroundColor: new THREE.Color(parseInt (style.getPropertyValue('--bgcolor').replace("#","0x"), 16))
    }) 
}