themes = ["paper", "iceberg", "superuser", "horizon", "arch", "shadow", "mountain", "rgb", "infared", "earth", "ocean", "buzz", "shrubs"]
theme_current = 0

$(function() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const preset = themes.indexOf(params.get("theme"))
    if (preset >= 0) {
        $("html").removeClass().addClass(themes[preset] + "-theme")
        $("#theme-toggle .theme-text").text(themes[theme_current])
    }

    $("#theme-toggle").click(function() {
        theme_current = theme_current + 1 < themes.length ? theme_current += 1 : 0
        $("html").removeClass().addClass(themes[theme_current] + "-theme")
        $("#theme-toggle .theme-text").text(themes[theme_current])        
    })

    $("#pic-profile").dblclick(function() {
        $("#pic-profile").fadeTo(200, 0.3, function() {
            $("#pic-profile").attr("src", "media/profile_altv2.png")
        }).fadeTo(200, 1);
        setTimeout(function() {
            $("#pic-profile").fadeTo(200, 0.3, function() {
                $("#pic-profile").attr("src", "media/profile.png")
            }).fadeTo(200, 1);
        }, 1400)
    })
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
    console.log(href, offsetTop)
    $('#content-scroll').stop().animate({ 
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
});
      

$("#content-scroll").scroll(function() {
    var fromTop = $(this).scrollTop();
    var curr = scrollItems.map(function() {
        if ($(this).offset().top - $(this).parent().offset().top  < fromTop) 
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