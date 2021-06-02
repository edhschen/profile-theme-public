themes = ["paper", "iceberg", "superuser", "horizon", "arch", "shadow", "mountain", "rgb", "infared", "earth", "ocean", "buzz", "shrubs"]
theme_current = 0

$(function() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const preset = themes.indexOf(params.get("theme"))
    if (preset >= 0) {
        $("html").removeClass().addClass(themes[preset] + "-theme")
        $("#theme-toggle").text(themes[preset])
    }

    $("#theme-toggle").click(function() {
        theme_current = theme_current + 1 < themes.length ? theme_current += 1 : 0
        $("html").removeClass().addClass(themes[theme_current] + "-theme")
        $("#theme-toggle").text(themes[theme_current])
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