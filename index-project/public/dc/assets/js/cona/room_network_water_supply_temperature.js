// 供水温度与气温
new DataChart(
    request_data={"key": "api_room_network_water_supply_temperature", "start": start, "end": end, "by": 'd'},
    time_ids=["f2_HHWLoop001_ST_title", "f3_HHWLoop001_ST_title", "f3_HHWLoop002_ST_title", "f3_HHWLoop003_ST_title", "f4_HHWLoop001_ST_title", "f5_HHWLoop001_ST_title"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {return  get_water_provider_options([data['f2_HHWLoop001_ST'], data['last_f2_HHWLoop001_ST']], '供水温度', data["hint"])}
        },
        {
            "type": "option",
            "func": function (data) {return  get_water_provider_options([data['f3_HHWLoop001_ST'], data['last_f3_HHWLoop001_ST']], '供水温度', data["hint"])}
        },
        {
            "type": "option",
            "func": function (data) {return  get_water_provider_options([data['f3_HHWLoop002_ST'], data['last_f3_HHWLoop002_ST']], '供水温度', data["hint"])}
        },
        {
            "type": "option",
            "func": function (data) {return  get_water_provider_options([data['f3_HHWLoop003_ST'], data['last_f3_HHWLoop003_ST']], '供水温度', data["hint"])}
        },
        {
            "type": "option",
            "func": function (data) {return  get_water_provider_options([data['f4_HHWLoop001_ST'], data['last_f4_HHWLoop001_ST']], '供水温度', data["hint"])}
        },
        {
            "type": "option",
            "func": function (data) {return  get_water_provider_options([data['f5_HHWLoop001_ST'], data['last_f5_HHWLoop001_ST']], '供水温度', data["hint"])}
        }

    ],
    chart_objs=["f2_HHWLoop001_ST", "f3_HHWLoop001_ST", "f3_HHWLoop002_ST", "f3_HHWLoop003_ST", "f4_HHWLoop001_ST", "f5_HHWLoop001_ST"]
).data_render();
