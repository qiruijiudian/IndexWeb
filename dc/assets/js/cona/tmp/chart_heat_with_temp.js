// 供热/制热与气温关系

new DataChart(
    request_data={"key": "api_heat_provide_temperature", "start": start, "end": end, "by": "d"},
    time_ids=["heat_well_heating_chart_title", "heat_pipe_network_heating_chart_title", "water_heat_pump_heat_production_chart_title", "high_temp_plate_exchange_heat_production_chart_title"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                return get_heat_provide_options({'latest_data': data['heat_well_heating'], 'last_data': data['last_heat_well_heating']},"热力井", "供热量", data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return get_heat_provide_options({'latest_data': data['heat_pipe_network_heating'], 'last_data': data['last_heat_pipe_network_heating']},"热力管网", "供热量", data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return get_heat_provide_options({'latest_data': data['water_heat_pump_heat_production'], 'last_data': data['last_water_heat_pump_heat_production']},"水源热泵", "制热量", data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return get_heat_provide_options({'latest_data': data['high_temp_plate_exchange_heat_production'], 'last_data': data['last_high_temp_plate_exchange_heat_production']},"高温板换", "制热量", data["hint"])
            }
        }
    ],
    chart_objs=["heat_well_heating_chart", "heat_pipe_network_heating_chart", "water_heat_pump_heat_production_chart", "high_temp_plate_exchange_heat_production_chart"],
).data_render();


