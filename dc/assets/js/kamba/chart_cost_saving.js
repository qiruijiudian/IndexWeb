new DataChart(
    request_data={"key": "api_cost_saving", "start": last_month_date, "end": end, "by": 'd'},
    time_ids=["cost_saving_title"],
    funcs=undefined,
    chart_objs=["cost_saving"],
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
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['节省电费', '耗电量']
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
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '节省电费（元）',
                    min: 0,
                    position: 'left',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} 元'
                    }
                },
                {
                    type: 'value',
                    name: '耗电量（kWh）',
                    min: 0,
//            max: 100,
                    position: 'right',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} kWh'
                    }
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
                        data: 'time_data',
                        axisTick: {
                            alignWithLabel: true
                        },
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
                        name: '节省电费',
                        type: 'bar',
                        data: 'cost_saving'
                    },
                    {
                        name: '耗电量',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: 'power_consumption'
                    }
                ]
            }
        }
    ]
).data_render();