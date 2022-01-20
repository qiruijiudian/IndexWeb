// 供回水温度与温差

new DataChart(
    request_data={"key": "api_water_supply_return_temperature", "start": start, "end": end, "by": "d"},
    time_ids=["avg_temp_with_temp", "temp_diff_title"],
    funcs=[
        {
            "type": "p_function",
            "func": function (data) {
                if ($("#avg_temp_with_temp").length){
                    for (var i=0;i<data['supply_return_water_temp_table_data'].length;i++){
                        if (data['supply_return_water_temp_table_data'][i][0] > 0){
                            var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                            tr_html = tr_html.format(
                                data['supply_return_water_temp_table_data'][i][1],
                                data['supply_return_water_temp_table_data'][i][2],
                                data['supply_return_water_temp_table_data'][i][3],
                                data['supply_return_water_temp_table_data'][i][4],
                            );

                        } else {
                            var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                            tr_html = tr_html.format(
                                data['supply_return_water_temp_table_data'][i][1],
                                data['supply_return_water_temp_table_data'][i][2],
                                data['supply_return_water_temp_table_data'][i][3],
                                data['supply_return_water_temp_table_data'][i][4],
                            );
                        }
                        $("#supply_return_water_temp_table_data").append(tr_html);
                    }
                }

            }
        },
        false
    ],
    chart_objs=[
        false, "supply_return_water_temp"
    ],
    option_datas=[
        false,
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
                height: '25%'
            }, {
                left: 70,
                right: 70,
                top: '60%',
                height: '25%'
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '温度(℃)',
                    type: 'value',
                    // max: 50,
                    // min: 20
                },
                {
                    gridIndex: 1,
                    name: '温差(℃)',
                    type: 'value',
                    max: 8,
                    inverse: true
                }
            ],
            series: []
        }
    ],
    option_mappings=[
        false,
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
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
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '平均供水温度',
                        type: 'line',
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'water_supply_temperature'
                    },
                    {
                        name: '平均回水温度',
                        type: 'line',
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'return_water_temperature'
                    },
                    {
                        name: '平均供回水温差',
                        type: 'line',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'supply_return_water_temp_diff'
                    }
                ]
            }
        }
    ],

    dataZooms=[1, 1]
).data_render();

