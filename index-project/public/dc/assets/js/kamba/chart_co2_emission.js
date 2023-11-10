new DataChart(
    request_data={"key": "co2_emission", "start": last_month_date, "end": end, "by": 'd'},
    time_ids=["co2_emission_reduction_title", "co2_equal_num_title"],
    funcs=[false, false],
    chart_objs=["co2_emission_reduction", "co2_equal_num"],
    option_datas=[
        {
            grid: {
                right: 110,
                left: 110
            },
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
                    saveAsImage: {show: true},
                    dataZoom: {
                        yAxisIndex: 'none'
                    }
                }
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
            legend: {
                data: ['co2减排量', '耗电量']
            },
            xAxis: [],
            yAxis: [],
            series: []
        },
        {
            grid: {
                right: 110,
                left: 110
            },
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
                    saveAsImage: {show: true},
                    dataZoom: {
                        yAxisIndex: 'none'
                    }
                }
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
            legend: {
                data: ['co2减排量', '等效种植树木数量']
            },
            xAxis: [],
            yAxis: [],
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
                        name: '时间段',
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
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        type: 'value',
                        name: '减排量',
                        min: 0,
                        max: 'max',
                        position: 'left',
                        axisLine: {
                            show: true

                        },
                        axisLabel: {
                            formatter: '{value} Kg'
                        }
                    },
                    {
                        type: 'value',
                        name: '耗电量',
                        min: 0,
                        position: 'right',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'co2减排量',
                        type: 'line',
                        smooth: true,
                        data: 'co2_emission_reduction',
                        itemStyle:{
                            normal: {
                                color: '#7083db',
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: '#7083db',
                                opacity: 0.16,
                            },
                        },
                    },
                    {
                        name: '耗电量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'power_consume',
                        itemStyle:{
                            normal: {
                                color: '#ff6600',
                            },
                        },
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
                        name: '时间段',
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
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        type: 'value',
                        name: '减排量',
                        max: "max",
                        position: 'left',
                        axisLine: {
                            show: true

                        },
                        axisLabel: {
                            formatter: '{value} Kg'
                        }
                    },
                    {
                        type: 'value',
                        name: '等效种植树木数量',
                        position: 'right',
                        axisLine: {
                            show: true

                        },
                        axisLabel: {
                            formatter: '{value} 棵'
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'co2减排量',
                        type: 'line',
                        smooth: true,
                        data: 'co2_emission_reduction',
                        itemStyle:{
                            normal: {
                                color: '#7083db',
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: '#7083db',
                                opacity: 0.16,
                            },
                        },
                    },

                    {
                        name: '等效种植树木数量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'co2_equal_num'
                    }
                ]
            }
        }
    ],
    dataZooms=[false, false]
).data_render();