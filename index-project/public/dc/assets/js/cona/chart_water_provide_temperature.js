// 供水温度与气温
new DataChart(
    request_data={"key": "api_water_provide_temperature", "start": start, "end": end, "by": 'd'},
    time_ids=["water_provide_temp_chart_title"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['end_supply_water_temp'], data['last_end_supply_water_temp']], '供水温度', data["hint"])
            }
        }
    ],
    chart_objs=["water_provide_temp_chart"],
).data_render();