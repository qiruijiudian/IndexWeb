var url = "http://cdqrmi.com:8000/api/cona/";
var kamba_url = "http://cdqrmi.com:8000/api/kamba/";
var common_url = "http://cdqrmi.com:8000/api/common/";
var login_url = 'http://cdqrmi.com/dc/login.html';
var start = "";
var last_month_date = "";
var end = "";
var db = "";


if (document.location.href.indexOf('cdqrmi') < 0){
    url = "http://127.0.0.1:8000/api/cona/";
    kamba_url = "http://127.0.0.1:8000/api/kamba/";
    common_url = "http://127.0.0.1:8000/api/common/";
    login_url = 'http://' + document.location.host + "/webs/dc/login.html";
}
console.log(url, common_url);

function check_login() {
    var token = getCookie('auth');
    if (token == null || token.length < 1){
        window.location.href = login_url + '?permission_error';
    }else {
        $.ajax(
            {
                url: common_url,
                type: "POST",
                data: {
                    "key": "is_valid",
                    "token": token,
                },
                cache: true,
                success: function (data) {
                    console.log(data);
                    $("#u_name").text(data['user']);
                    // window.location.href = 'index3.html';
                },
                error: function (xhr) {

                    window.location.href = login_url + '?permission_error';
                }
            }
        );
    }
}

check_login();


function cli(obj) {
    if (document.location.href.indexOf('cdqrmi') < 0){
        window.open(
            'http://' + document.location.host + '/webs/dc/' + obj.name, '_blank'
        );
    }else {
        window.open(
            'http://' + document.location.host + '/dc/' + obj.name, '_blank'
        );
    }

}

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

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function delete_cookie() {
    console.log('删除前', document.cookie);
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    console.log('删除后', document.cookie);
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
        if (document.location.href.indexOf('cona') < 0){
            db = 'kamba';
        } else {
            db = 'cona';
        }

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
        window.location.href = 'login.html?permission_error'
    }
);

