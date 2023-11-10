/**
 * @function resize_chart
 * @desc 针对_charts内的所有图表设置图表跟随页面缩放
 * @param _charts 图表数组
 */
function resize_chart(_charts) {
    window.onresize = function (){for (let i=0;i<_charts.length;i++){_charts[i].resize();}};
}

/**
 * @function delete_cookie
 * @desc 删除cookie
 */
function delete_cookie() {
    let cookie_date = new Date();
    cookie_date.setDate(cookie_date.getDate() - 30);
    document.cookie = `auth=;expires=${cookie_date.toUTCString()}`;
}

/**
 * @function getQueryVariable
 * @desc 根据传入的变量名称获取url中？后访问参数中对应变量的值，如果不存在则返回false
 * @param variable 变量名
 */
function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}

/**
 * @function getCookie
 * @desc 根据传入的name名称获取cookie中设置的值，如果不存在则返回null
 * @param name 查询的名称
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/**
 * @function is_large_range
 * @desc 判断现有时间周期是否为大周期(start与end的间隔大于7天)
 */
function is_large_range(){
    let link = document.location.search;
    try {
        if (link.includes('start_time') && link.includes('end_time')){
            let time_range = Date.parse(getQueryVariable("end_time").replace("%20", " ").replace("+", " ")) - Date.parse(getQueryVariable("start_time").replace("%20", " ").replace("+", " "));
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

/**
 * @function set_time_range
 * @desc 根据传入的id值获取dom元素，并将其下的文字设置为time_dic中提供的时间周期
 * @param id dom元素id值
 * @param time_dic 包含时间值的字典
 */
function set_time_range(id, time_dic){
    let now = $(`#${id}`).text();
    if (time_dic.hasOwnProperty("date")){
        $(`#${id}`).text(now + "   [" + time_dic['date'] + "]");
    }else if (time_dic.hasOwnProperty("last_start")){
        $(`#${id}`).text(now + "   [" + time_dic['start'] + "   ——   " + time_dic['end'] + "  对照：  " +  time_dic['last_start'] + '   ——   ' + time_dic['last_end'] + "]");
    }else{
        $(`#${id}`).text(now + "   [" + time_dic['start'] + "   ——   " + time_dic['end'] + "]");
    }
}


var is_large = is_large_range();


let set_table_status = "all";
let titles = ["high_week", "high_year", "low_week", "low_year"];

if (document.location.href.includes("?high") || document.location.href.includes("?low")) {
    let levels = document.location.href.split('?');
    if (levels.length > 1) {
        let level = levels.pop();
        if (level.includes('high')) {
            $('.week_title').attr('id','high_week');
            $('.year_title').attr('id','high_year');
            $('.tbody_week').attr('id','last_week_high_temp_tbody');
            $('.tbody_year').attr('id','last_year_high_temp_tbody');
            $("#gwt_title").text('高温地热井出水温度');
            set_table_status = "high";
            titles = ["high_week", "high_year"];
        } else if (level.includes('low')) {
            $('.week_title').attr('id','low_week');
            $('.year_title').attr('id','low_year');
            $('.tbody_week').attr('id','last_week_low_temp_tbody');
            $('.tbody_year').attr('id','last_year_low_temp_tbody');
            $("#gwt_title").text('高温地热井出水温度');
            $("#gwt_title").text('低温地热井出水温度');
            set_table_status = "low";
            titles = ["low_week", "low_year"];
        } else {
            window.location.href = 'http://' + document.location.host + '/dc/cona.html';
        }
    } else {
        window.location.href = 'http://' + document.location.host + '/dc/cona.html';
    }
}

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



