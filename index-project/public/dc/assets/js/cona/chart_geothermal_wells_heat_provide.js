// 地热井供水温度

new DataChart(
    request_data={"key": "api_geothermal_wells_heat_provide", "start": start, "end": end, "by": 'd'},
    time_ids=["geothermal_wells_heat_provide_title"],
    funcs=undefined,
    chart_objs=["geothermal_wells_heat_provide"],
    option_datas=[
        {
            grid: {
                x: 110,
                x2: 80,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['高温板换制热量', '水源热泵制热量', '地热井可提供高温热量', '地热井可提供低温热量']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '热量(kWh)',
                    min: 0,
                    // max: 150000,
                    axisLabel: {
                        formatter: '{value}' + ' kWh'
                    }
                }
            ],
            series: []
        }
    ],
    option_mappings=[
        {
            "xAxis": {
                "type": "arr",
                "obj": ['data'],
                "values": [
                    {
                        type: 'category',
                        name: '日期',
                        data: 'time_data',
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ]
            },
            "series": {
                "type": "arr",
                "obj": ['data'],
                "values": [
                    {
                        name: '高温板换制热量',
                        type: 'bar',
                        stack: '制热量',
                        data: 'high_temp_plate_exchange_heat_production'
                    },
                    {
                        name: '水源热泵制热量',
                        type: 'bar',
                        stack: '制热量',
                        data: 'water_heat_pump_heat_production'
                    },
                    {
                        name: '地热井可提供高温热量',
                        type: 'line',
                        data: 'geothermal_wells_high_heat_provide'
                    },
                    {
                        name: '地热井可提供低温热量',
                        type: 'line',
                        data: 'geothermal_wells_low_heat_provide'
                    }
                ]
            }
        }
    ]
).data_render();