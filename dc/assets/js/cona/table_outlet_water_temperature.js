// 地热井出水温度

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

