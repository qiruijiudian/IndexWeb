$(function(){
    //十分秒年月日范围，包含最大最小值
    $('.J-datepicker-range').datePicker({
        hasShortcut: true,
        min: '2018-01-01 06:00:00',
        max: '2019-04-29 20:59:59',
        isRange: true,
        shortcutOptions: [{
            name: '昨天',
            day: '-1,-1',
            time: '00:00:00,23:59:59'
        },{
            name: '最近一周',
            day: '-7,0',
            time:'00:00:00,'
        }, {
            name: '最近一个月',
            day: '-30,0',
            time: '00:00:00,'
        }, {
            name: '最近三个月',
            day: '-90, 0',
            time: '00:00:00,'
        }]
    });
});