// 地热井出水温度

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


new DataChart(
    request_data={"key": "api_outlet_water_temperature", "end": end},
    time_ids=[false],
    funcs=[
        {
            "type": "p_function",
            "func": function (data) {
                set_outlet_water_temperature(data, set_table_status, ["last_week_high_temp_tbody", "last_year_high_temp_tbody", "last_week_low_temp_tbody", "last_year_low_temp_tbody"]);
                set_outlet_water_temp_time_range(data, titles)

            }
        }
    ]
).data_render();

