// 补水量

new DataChart(
    request_data={"key": "api_hydration", "start": start, "end": end, "by": 'h'},
    time_ids=["heat_storage_rep_title", "heat_rep_title", "solar_rep_title"],
    funcs=undefined,
    chart_objs=["last_week_heat_storage_replenishment", "last_week_heat_water_replenishment", "last_week_solar_side_replenishment"],
    option_datas=[
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['蓄热水池补水量'],
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
                left: 80,
                right: 80,
            }, {
                left: 80,
                right: 80,
                top: '55%',
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '蓄热水池补水量',
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} m³'
                    }
                }
            ],
            series: []
        },
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['供热端补水量', '供热端补水限值'],
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
                left: 80,
                right: 80,
                // height: '35%'
            }, {
                left: 80,
                right: 80,
                top: '55%',
                // height: '35%'
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '补水量',
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} m³'
                    }
                }
            ],
            series: []
        },
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['太阳能侧补水量', '太阳能矩阵补水限值'],
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
                left: 80,
                right: 80,
                // height: '35%'
            }, {
                left: 80,
                right: 80,
                top: '55%',
                // height: '35%'
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '补水量',
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} m³'
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
                    name: '蓄热水池补水量',
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
                    data: 'heat_storage_tank_replenishment'
                },]

            }
        },
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
                    name: '供热端补水量',
                    type: 'bar',
                    data: 'heat_water_replenishment'
                },
                    {
                        name: '供热端补水限值',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        data: 'heat_water_replenishment_limit'
                    }]

            }
        },
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
                "values": [
                    {
                        name: '太阳能侧补水量',
                        type: 'bar',
                        data: 'solar_side_replenishment'
                    },
                    {
                        name: '太阳能矩阵补水限值',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        data: 'solar_matrix_replenishment_limit'
                    },
                ]

            }
        }
    ],
    dataZooms=[1, 1, 1]
).data_render();