// 子页面COP

new DataChart(
    request_data={"key": "api_sub_com_cop", "start": start, "end": end},
    time_ids=["com_cop_pie_2", "f2_cop_chart_title", "com_cop_pie_3", "f3_cop_chart_title", "com_cop_pie_4", "f4_cop_chart_title", "com_cop_pie_5", "f5_cop_chart_title",],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                return get_cop_pie_options(data['f2_cop'][data['f2_cop'].length-1], "cona")
            }
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f2_cop")}
        },
        {
            "type": "option",
            "func": function (data) {
                return get_cop_pie_options(data['f3_cop'][data['f3_cop'].length-1], "cona")
            }
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f3_cop")}
        },
        {
            "type": "option",
            "func": function (data) {
                return get_cop_pie_options(data['f4_cop'][data['f4_cop'].length-1], "cona")
            }
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f4_cop")}
        },
        {
            "type": "option",
            "func": function (data) {
                return get_cop_pie_options(data['f5_cop'][data['f5_cop'].length-1], "cona")
            }
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_sub_cop_chart_option(data, "f5_cop")}
        },
    ],
    chart_objs=["f2_cop_pie", "f2_cop_chart", "f3_cop_pie", "f3_cop_chart", "f4_cop_pie", "f4_cop_chart", "f5_cop_pie", "f5_cop_chart"],
    dataZooms=[false, false, false, false, false, false, false, false]
).data_render();

