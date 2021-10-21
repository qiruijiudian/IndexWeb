
function loading_all(charts) {
    for (var i=0;i<charts.length;i++){
        charts[i].showLoading();
    }
}

function resize_chart(charts) {
    window.onresize = function (){
        for (var i=0;i<charts.length;i++){
            charts[i].resize();
        }
    };
}

function delete_cookie() {
    // console.log('删除前', document.cookie);
    var cookie_date = new Date();
    cookie_date.setDate(cookie_date.getDate() - 30);
    document.cookie = `auth=;expires=${cookie_date.toUTCString()}`;
    // console.log('删除后', document.cookie);


}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


$("#sideNav").click(function(){
    setTimeout(function(){
        let resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
        window.dispatchEvent(resizeEvent);
    }, 500)
});

if (document.location.href.indexOf('.html')){
    try {
        //latest_time

        $.ajax(
            {
                url: common_url,
                type: "POST",
                data: {
                    "key": "latest_time",
                    "db": db
                },
                async: false,
                cache: false,
                success: function (data) {
                    start = data["start"];
                    end = data["end"];
                    last_month_date = data["last_month_date"];
                },
                error: function (xhr) {
                    console.log("post latest_time error：", xhr);
                }
            }
        )
    }catch (e) {
        console.log("ajax latest_time error：", e);
    }
}

$("#logout").click(
    function () {
        delete_cookie();
        now_href = document.location.href;
        if (now_href.includes('cona.html') || now_href.includes('kamba.html')){
            window.location.href = 'login.html?permission_error'
        }else {
            window.location.href = '../login.html?permission_error'
        }
    }
);

