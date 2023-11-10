// 太阳能矩阵共回水温度温差
new DataChart(
    request_data={"key": "api_solar_matrix_supply_and_return_water_temperature", "start": start, "end": end, "by": 'h'},
    time_ids=["solar_matrix_title"],
    funcs=undefined,
    chart_objs=["solar_matrix_supply_and_return_water_temp"],
    option_datas=[
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['太阳能矩阵供水温度', '太阳能矩阵回水温度'],
                left: 10
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {xAxisIndex: 'all'}
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 30,
                    end: 70,
                    xAxisIndex: [0, 1]
                }
            ],
            grid: [{
                left: 70,
                right: 70,
                // height: '35%'
            }, {
                left: 70,
                right: 70,
                top: '55%',
                // height: '35%'
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '温度(℃)',
                    type: 'value'
                }
            ],
            series: []
        }

    ],
    option_mappings=[
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    type: 'category',
                    name: '日期',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: 'time_data'
                }],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '太阳能矩阵供水温度',
                    type: 'line',
                    data: 'solar_matrix_supply_water_temp'
                },
                    {
                        name: '太阳能矩阵回水温度',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        data: 'solar_matrix_return_water_temp'
                    }]

            }
        }

    ],
).data_render();