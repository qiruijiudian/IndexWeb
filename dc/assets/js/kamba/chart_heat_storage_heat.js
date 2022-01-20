new DataChart(
    request_data={"key": "api_heat_storage_heat", "start": start, "end": end, "by": 'd'},
    time_ids=["pool_available_heat_heat_date", "high_heat_equal_supply_days_heat_date"],
    funcs=[false, false],
    chart_objs=["pool_available_heat", "high_heat_equal_supply_days"],
    option_datas=[
        {
            grid: {
                left: 110,
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
                data: ['低温热量', '高温热量']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '热量',
                    min: 0,
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} kWh'
                    }
                }
            ],
            series: []
        },
        {
            grid: {
                right: 110,
                left: 80
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
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['2000kW电锅炉供热天数', '高温热量']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '供热天数',
                    min: 0,
                    position: 'left',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} 天'
                    }
                },
                {
                    type: 'value',
                    name: '高温热量',
                    min: 0,
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
                        name: '时间段',
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
                        name: '低温热量',
                        type: 'bar',
                        stack: '可用热量',
                        data: 'low_heat_total'
                    },
                    {
                        name: '高温热量',
                        type: 'bar',
                        stack: '可用热量',
                        data: 'high_heat_total'
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

            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '2000kW电锅炉供热天数',
                        type: 'bar',
                        data: 'heat_supply_days'
                    },
                    {
                        name: '高温热量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'high_heat_total'
                    }
                ]
            }
        },
    ],
    dataZooms=[1, 1]
).data_render();