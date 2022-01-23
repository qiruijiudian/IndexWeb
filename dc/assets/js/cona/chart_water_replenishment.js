// 负荷
new DataChart(
    request_data={"key": "api_water_replenishment", "start": start, "end": end, "by": 'h'},
    time_ids=["water_replenishment_title"],
    funcs=undefined,
    chart_objs=["water_replenishment"],
    option_datas=[
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['补水量', '补水量限值'],
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
                left: 65,
                right: 70,
                // height: '35%'
            }, {
                left: 65,
                right: 70,
                top: '55%',
                // height: '35%'
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '补水量(m³)',
                    type: 'value',
                    // max: 12
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
                        name: '补水量',
                        type: 'bar',
                        data: 'water_replenishment'
                    },
                    {
                        name: '补水量限值',
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
                        data: 'water_replenishment_limit'
                    },
                ]
            }

        },
    ]
).data_render();