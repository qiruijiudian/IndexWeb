// 末端供回水温度

new DataChart(
    request_data={"key": "api_end_supply_and_return_water_temp", "start": start, "end": end, "by": 'd'},
    time_ids=["re_with_temp_title", "sup_with_temp_title", "diff_with_temp_title", "diff_temp"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['end_supply_and_return_water_temp_diff_with_temp'], data['last_end_supply_and_return_water_temp_diff_with_temp']], '末端供回水温差', data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['supply_water_temp_with_temp'], data['last_supply_water_temp_with_temp']], '末端供水温度', data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['return_water_temp_with_temp'], data['last_return_water_temp_with_temp']], '末端回水温度', data["hint"])
            }
        },
        false
    ],
    chart_objs=["supply_and_return_water_temp_diff_with_temp", "supply_water_temp_with_temp", "return_water_temp_with_temp", "end_supply_and_return_water_temp"],
    option_datas=[
        false, false, false,
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['平均供水温度', '平均回水温度', '平均供回水温差'],
                left: 10
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },

            axisPointer: {
                link: {xAxisIndex: 'all'}
            },

            grid: [{
                left: 70,
                right: 70,
                height: '30%'
            }, {
                left: 70,
                right: 70,
                top: '60%',
                height: '30%'
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '温度(℃)',
                    type: 'value'
                },
                {
                    gridIndex: 1,
                    name: '温差(℃)',
                    type: 'value',
                    inverse: true
                }
            ],
            series: []
        }

    ],
    option_mappings=[
        false, false, false,
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data',
                        position: 'top'
                    }
                ],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        name: '平均供水温度',
                        type: 'line',
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'end_supply_water_temp'
                    },
                    {
                        name: '平均回水温度',
                        type: 'line',
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'end_return_water_temp',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#556B2F'
                                }
                            }
                        }
                    },
                    {
                        name: '平均供回水温差',
                        type: 'line',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'end_supply_and_return_water_temp_diff'
                    }
                ]
            }
        }

    ],
    dataZooms=[false, false, false, 2]
).data_render();