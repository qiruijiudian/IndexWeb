new DataChart(
    request_data={"key": "api_com_cop", "start": start, "end": end, "by": 'h'},
    time_ids=["com_cop_pie_title", "com_cop_chart_title"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {


                return get_cop_pie_options(data['values'][data['values'].length-1], "cona")
            }
        },
        {
            "type": "option",
            "func": function (data) {return get_cona_com_cop_chart_options(data)}
        }
    ],
    chart_objs=["com_cop_pie", "com_cop_chart"],
    dataZooms=[false, 1]
).data_render();