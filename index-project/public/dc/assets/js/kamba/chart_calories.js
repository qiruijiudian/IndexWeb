// 供热分析
new DataChart(
    request_data={"key": "api_calories", "start": start, "end": end, "by": 'd'},
    time_ids=["heat_supply_analysis_title", "high_power_title"],
    funcs=undefined,
    chart_objs=["heat_supply_analysis", "power_rate"],
    option_datas=[
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },

            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['高温板换制热量', '水源热泵制热量']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '制热量',
                    min: 0,
                    position: 'left',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} kWh'
                    }
                }
            ],
            series: []
            ,
            grid: {
                x: 140,
                y: 80,
                x2: 115,
                y2: 50
            }
        },
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['高温板换制热功率'],
                left: 'center'
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
            }, {
                left: 70,
                right: 70,
                top: '55%',
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '制热功率(kW)',
                    type: 'value'
                }
            ],
            series: []
        }
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '高温板换制热量',
                        type: 'bar',
                        data: 'high_temperature_plate_exchange_heat'
                    },
                    {
                        name: '水源热泵制热量',
                        type: 'bar',
                        data: 'wshp_heat'
                    }
                ]
            }
        },
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
                        data: 'rate_time'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '高温板换制热功率',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#0000FF'
                                }
                            }
                        },
                        data: 'high_temperature_plate_exchange_heat_rate'
                    }
                ]
            }
        },
    ],
    dataZooms=[1, 1]
).data_render();