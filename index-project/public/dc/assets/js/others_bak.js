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

function delete_cookie() {
    console.log('删除前', document.cookie);
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = `auth=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
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
        if (document.location.href.indexOf('cdqrmi') > -1){
            window.location.href = 'http://' + document.location.host + '/dc/login.html?permission_error'
        }else {
            window.location.href = 'http://' + document.location.host + '/webs/dc/' + 'login.html?permission_error'
        }
    }
);

