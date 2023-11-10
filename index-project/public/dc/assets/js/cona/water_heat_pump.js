// 水源热泵COP

new DataChart(
    request_data={"key": "api_sub_water_source_cop", "start": start, "end": end},
    time_ids=["wshp_cop_pie_2", "f2_whp_cop_chart_title", "wshp_cop_pie_3", "f3_whp_cop_chart_title", "wshp_cop_pie_4", "f4_whp_cop_chart_title", "wshp_cop_pie_5", "f5_whp_cop_chart_title",],
    funcs=[
        {
            "type": "option",
            "func": function (data) {return get_cop_pie_options(data['f2_whp_cop'][data['f2_whp_cop'].length-1], "cona")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f2_whp_cop")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cop_pie_options(data['f3_whp_cop'][data['f3_whp_cop'].length-1], "cona")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f3_whp_cop")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cop_pie_options(data['f4_whp_cop'][data['f4_whp_cop'].length-1], "cona")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f4_whp_cop")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cop_pie_options(data['f5_whp_cop'][data['f5_whp_cop'].length-1], "cona")}
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f5_whp_cop")}
        },
    ],
    chart_objs=["f2_whp_cop_pie", "f2_whp_cop_chart", "f3_whp_cop_pie", "f3_whp_cop_chart", "f4_whp_cop_pie", "f4_whp_cop_chart", "f5_whp_cop_pie", "f5_whp_cop_chart"],
    dataZooms=[false, false, false, false, false, false, false, false]
).data_render();



