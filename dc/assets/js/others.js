
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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
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

function is_large_range(){
    var link = document.location.search;
    try {
        if (link.includes('start_time') && link.includes('end_time')){
            var time_range = Date.parse(getQueryVariable("end_time").replace("%20", " ").replace("+", " ")) - Date.parse(getQueryVariable("start_time").replace("%20", " ").replace("+", " "));
            if (time_range > 1000 * 60 * 60 * 24 * 7){
                return true;
            } else {
                return false;
            }
        }else {
            return false;
        }
    }catch (e) {
        return false
    }

}

function set_time_range(id, time_dic){
    let now =$(`#${id}`).text();
    if (time_dic.hasOwnProperty("date")){
        $(`#${id}`).text(now + "   [" + time_dic['date'] + "]");
    }else if (time_dic.hasOwnProperty("last_start")){
        $(`#${id}`).text(now + "   [" + time_dic['start'] + "   ——   " + time_dic['end'] + "  对照：  " +  time_dic['last_start'] + '   ——   ' + time_dic['last_end'] + "]");
    }else{
        $(`#${id}`).text(now + "   [" + time_dic['start'] + "   ——   " + time_dic['end'] + "]");
    }
}


var is_large = is_large_range();


$("#sideNav").click(function(){
    setTimeout(function(){
        let resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
        window.dispatchEvent(resizeEvent);
    }, 500)
});

if (document.location.href.indexOf('.html')){

    if (window.location.href.includes("start_time") && window.location.href.includes("end_time")){
        start = getQueryVariable("start_time").replace("%20", " ").replace("+", " ");
        end = getQueryVariable("end_time").replace("%20", " ").replace("+", " ");
        last_month_date = start;
        try {
            //latest_time
            $.ajax(
                {
                    url: common_url,
                    type: "POST",
                    data: {
                        "key": "relative_time",
                        "db": db,
                        "end": end
                    },
                    async: false,
                    cache: false,
                    success: function (data) {
                        // last_month_date = data["last_month_date"];
                        start_limit = data["start_limit"];
                        end_limit = data["end_limit"];
                    },
                    error: function (xhr) {
                        console.log("post latest_time error：", xhr);
                        window.location.href = "http://cdqrmi.com";
                    }
                }
            )
        }catch (e) {
            console.log("ajax latest_time error：", e);
            window.location.href = "http://cdqrmi.com";
        }

    }else {
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
                        start_limit = data["start_limit"];
                        end_limit = data["end_limit"];
                    },
                    error: function (xhr) {
                        console.log("post latest_time error：", xhr);
                    }
                }
            )
        }catch (e) {
            console.log("ajax latest_time error：", e);
            window.location.href = "http://cdqrmi.com";
        }
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



