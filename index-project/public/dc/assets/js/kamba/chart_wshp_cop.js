// 水源热泵COP

new DataChart(
    request_data={"key": "api_wshp_cop", "start": start, "end": end, "by": 'h'},
    time_ids=["wshp_cop_pie_title", "wp_cop_title"],
    funcs=[
        {
            'type': 'option',
            'func': function (data) {return get_cop_pie_options(data['kamba_wshp_cop'][data['kamba_wshp_cop'].length-1], "kamba")}
        },
        false
    ],
    chart_objs=["kamba_wshp_cop_pie", "kamba_wshp_cop_chart"],
    option_datas=[
        false,
        {
            color: ['#32CD32', '#0000FF', '#FF0000'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['COP', 'Target Miniumum', 'Low Threshold'],
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
            yAxis: [],
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
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'COP',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#32CD32'
                                }
                            }
                        },
                        data: 'kamba_wshp_cop'
                    },
                    {
                        name: 'Target Miniumum',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#0000FF'
                                }
                            }
                        },
                        data: 'target_minimum'
                    },
                    {
                        name: 'Low Threshold',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#FF0000'
                                }
                            }
                        },
                        data: 'low_threshold'
                    }
                ]
            },
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        name: 'COP',
                        type: 'value',
                        max: 'max_cop'
                    }
                ]
            }
        }
    ],
    dataZooms=[1, 1]
).data_render();