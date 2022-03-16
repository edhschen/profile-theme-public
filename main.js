themes = ["paper", "iceberg", "superuser", "horizon", "arch", "shadow", "mountain", "rgb", "infared", "earth", "ocean", "buzz", "shrubs", "retro", "oblivion", "money"]
theme_current = 13
var style

$(function() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const theme_param = params.get("theme")
    const preset = theme_param ? theme_param : (localStorage.getItem("theme") ? +localStorage.getItem("theme") : null)

    if (preset >= 0 && typeof preset == "number") {
        $("html").removeClass().addClass(themes[preset] + "-theme")
        $("#theme-toggle .theme-text").text(themes[preset])
        localStorage.setItem("theme", preset)
        theme_current = preset
    }

    $("#theme-toggle").click(function() {
        theme_current = theme_current + 1 < themes.length ? theme_current += 1 : 0
        $("html").removeClass().addClass(themes[theme_current] + "-theme")
        $("#theme-toggle .theme-text").text(themes[theme_current])
        localStorage.setItem("theme", theme_current)
        effect.setOptions({
            color: new THREE.Color(parseInt (style.getPropertyValue('--accentcolor').replace("#","0x"), 16)),
            backgroundColor: new THREE.Color(parseInt (style.getPropertyValue('--bgcolor').replace("#","0x"), 16))
        })        
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

navItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).position().top + $(href).parent().scrollTop();
    // console.log(href, offsetTop)
    $('#content-scroll').stop().animate({ 
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
    $(this).attr("selected", "")
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
});

var curr_sec
$('.nav-text-link').hover(
    function () {
        curr_sec = $(this).attr("selected")
        // console.log(curr_sec)
        $(this).attr("selected", "");
    }, 
    function() {
        !curr_sec && $(this).removeAttr("selected")
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