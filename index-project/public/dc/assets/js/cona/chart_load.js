// 负荷

new DataChart(
    request_data={"key": "api_load", "start": start, "end": end, "by": 'd'},
    time_ids=["load_title", false],
    funcs=[false, false],
    chart_objs=["load_data_chart", "load_pie"],
    option_datas=[
        {
            grid: {
                left: 100,
                right: 80
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
                data: ['最小负荷', '平均负荷', '最大负荷']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '负荷量（kWh）',
                    min: 0,
                    // max: 7000,
                    axisLabel: {
                        formatter: '{value} kW'
                    }
                }
            ],
            series: []
        },
        {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
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
                        name: '日期',
                        data: 'time_data',
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '最小负荷',
                        type: 'bar',
                        data: 'min_loads'
                    },
                    {
                        name: '平均负荷',
                        type: 'bar',
                        data: 'avg_loads'
                    },
                    {
                        name: '最大负荷',
                        type: 'line',
                        yAxisIndex: 0,
                        data: 'max_loads'
                    }
                ]
            }

        },
        {
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '负荷值',
                        type: 'pie',
                        radius: '50%',
                        data: 'load_pie_data',
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    ]
).data_render();