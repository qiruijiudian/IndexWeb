
// function dateFormat(timestamp){
//     var time = new Date(timestamp);    //先将时间戳转为Date对象，然后才能使用Date的方法
//     var year = time.getFullYear(),
//         month = time.getMonth() + 1 ,  //月份是从0开始的
//         day = time.getDate(),
//         hour = time.getHours(),
//         minute = time.getMinutes(),
//         second = time.getSeconds();
//     //add0()方法在后面定义
//     return  year+'-'+this.add0(month)+'-'+ this.add0(day)+' '+this.add0(hour)+':'+this.add0(minute)+':'+this.add0(second)
// }

function add0(m){
    return m < 10 ? '0' + m: m
}

function initDateFormat(timestamp){
    var time = new Date(timestamp);    //先将时间戳转为Date对象，然后才能使用Date的方法
    var year = time.getFullYear(),
        month = time.getMonth() + 1 ,  //月份是从0开始的
        day = time.getDate();

    //add0()方法在后面定义
    return  year+'-'+this.add0(month)+'-'+ this.add0(day)+' 00:00:00';

}

function getdateGap(latest_date){
    var _today = new Date();
    var today_str = _today.getFullYear() + "-"+ add0(_today.getMonth()+1) + "-" +add0(_today.getDate()) + "  00:00:00";
    var latest_str = latest_date.split(" ")[0] + " 00:00:00";
    var date_gap = (Date.parse(today_str) - Date.parse(latest_str)) / (1000*60*60*24);
    return date_gap;
}

function getTimeOption(){
    var gap = getdateGap(end);
    return [
        {
            name: '最近一周',
            day: `${-gap-7},${-gap}`,
            time:'00:00:00,23:59:59'
        },
        {
            name: '最近一个月',
            day: `${-gap-30},${-gap}`,
            time: '00:00:00,23:59:59'
        },
        {
            name: '最近三个月',
            day: `${-gap-90},${-gap}`,
            time: '00:00:00,23:59:59'
        },
        {
            name: '最近六个月',
            day: `${-gap-180},${-gap}`,
            time: '00:00:00,23:59:59'
        },
        {
            name: '最近一年',
            day: `${-gap-365},${-gap}`,
            time: '00:00:00,23:59:59'
        }
    ];
}

$(function(){
    //十分秒年月日范围，包含最大最小值
    $('.J-datepicker-range').datePicker({
        hasShortcut: true,
        min: start_limit,
        max: end_limit,
        isRange: true,
        shortcutOptions: getTimeOption()
        // shortcutOptions: [
        //     {
        //         name: '昨天',
        //         day: '-1,-1',
        //         time: '00:00:00,23:59:59'
        //     },
        //     {
        //         name: '最近一周',
        //         day: '-9,-2',
        //         time:'00:00:00,23:59:59'
        //     },
        //     {
        //         name: '最近一个月',
        //         day: '-32,-2',
        //         time: '00:00:00,23:59:59'
        //     },
        //     {
        //         name: '最近三个月',
        //         day: '-92, -2',
        //         time: '00:00:00,23:59:59'
        //     },
        //     {
        //         name: '最近六个月',
        //         day: '-182, -2',
        //         time: '00:00:00,23:59:59'
        //     },
        //     {
        //         name: '最近一年',
        //         day: '-367, -2',
        //         time: '00:00:00,23:59:59'
        //     }
        // ]
    });


    $("#confirm_date").click(function () {
        try {
            var t_start = $("#start_time").val(), t_end = $("#end_time").val();
            var _start = Date.parse(t_start), _end = Date.parse(t_end);

            var _start_limit = Date.parse(start_limit);
            var _end_limit = Date.parse(end_limit);
            console.log(_start, _end, _start_limit, _end_limit);
            if (_end - _start < 1000 * 60 * 60 * 24 * 7 || _start >= _end_limit || _end <= _start_limit){
                t_end = end_limit;
                t_start = initDateFormat(_end_limit - 1000 * 60 * 60 * 24 * 6);
                // console.log(_start, _end);
            }else {
                if (_start < _start_limit) t_start = start_limit;
                if (_end > _end_limit) t_end = end_limit;
            }
            // console.log(_start, _end, _start_limit, _end_limit);

        }catch (e) {
            console.log(e);
            location.reload();
        }

        window.location.href = `http://${window.location.host}${window.location.pathname}?start_time=${t_start}&end_time=${t_end}`;

    });

});
