var url = "http://cdqrmi.com:8000/api/cona/";
var kamba_url = "http://cdqrmi.com:8000/api/kamba/";
var common_url = "http://cdqrmi.com:8000/api/common/";
var start = "";
var last_month_date = "";
var end = "";
var db = "";

function cli(obj) {
    window.open(
        'http://' + document.location.host + '/dc/' + obj.name, '_blank'
    );
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

