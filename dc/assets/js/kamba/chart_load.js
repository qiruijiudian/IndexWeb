new DataChart(
    request_data={"key": "api_load", "start": start, "end": end, "by": 'd'},
    time_ids=["load_title"],
    funcs=undefined,
    chart_objs=["load_by_days"],
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
                    name: '负荷量（kW）',
//            min: 0,
                    axisLabel: {
                        formatter: '{value} kW'
                    }
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
                    name: '最小负荷',
                    type: 'line',
                    data: 'min_loads',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#548B54'
                            }
                        }
                    }
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
                    }]

            }
        }

    ],
).data_render();