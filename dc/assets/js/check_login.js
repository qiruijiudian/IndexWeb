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

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

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

if (document.location.href.indexOf('cona') < 0){
    db = 'kamba';
} else {
    db = 'cona';
}

