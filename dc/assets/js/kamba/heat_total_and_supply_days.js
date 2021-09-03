var pool_available_heat_dom = document.getElementById("pool_available_heat");
var high_heat_equal_supply_days_dom = document.getElementById("high_heat_equal_supply_days");

var pool_available_heat_chart = echarts.init(pool_available_heat_dom);
var high_heat_equal_supply_days_chart = echarts.init(high_heat_equal_supply_days_dom);
loading_all(
    [
        pool_available_heat_chart,
        high_heat_equal_supply_days_chart
    ]
);


try {
    // pool_temperature
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_pool_temperature",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                $('#pool_available_heat_heat_date').text('蓄热水池分时可用低温/高温热量 （' +  data['heat_date'] + '）');
                pool_available_heat_chart.hideLoading();
                pool_available_heat_chart.setOption(
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
                        xAxis: [
                            {
                                type: 'category',
                                name: '时间段',
                                data: data['heat_time_period'],
                                axisPointer: {
                                    type: 'shadow'
                                },
                                axisLabel: {
                                    interval:0,
                                    rotate:40
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '热量(kWh)',
                                min: 0,
                                max: 5000000
                            }
                        ],
                        series: [
                            {
                                name: '低温热量',
                                type: 'bar',
                                stack: '可用热量',
                                data: data['low_heat_total']
                            },
                            {
                                name: '高温热量',
                                type: 'bar',
                                stack: '可用热量',
                                data: data['high_heat_total']
                            }
                        ]
                    }
                );


                $('#pool_temp_status').text('水池温度情况（' + data['heat_date'] + '）');


                $('#high_heat_equal_supply_days_heat_date').text('\n' +
                    '蓄热水池可用高温热量及电锅炉替换供热天数 （' +  data['heat_date'] + '）');
                high_heat_equal_supply_days_chart.hideLoading();
                high_heat_equal_supply_days_chart.setOption(
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
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        legend: {
                            data: ['2000kW电锅炉供热天数', '高温热量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                name: '时间段',
                                data: data['heat_time_period'],
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisPointer: {
                                    type: 'shadow'
                                },

                                axisLabel: {
                                    interval:0,
                                    rotate:40
                                }

                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '供热天数（天）',
                                min: 0,
                                max: 100,
                                position: 'left',
                                axisLine: {
                                    show: true

                                },
                                axisLabel: {
                                    formatter: '{value} '
                                }
                            },
                            {
                                type: 'value',
                                name: '高温热量（kWh）',
                                min: 0,
                                position: 'right',
                                axisLine: {
                                    show: true
                                },
                                axisLabel: {
                                    formatter: '{value} '
                                }
                            }

                        ],
                        series: [
                            {
                                name: '2000kW电锅炉供热天数',
                                type: 'bar',
                                data: data['heat_supply_days']
                            },
                            {
                                name: '高温热量',
                                type: 'line',
                                yAxisIndex: 1,
                                data: data['high_heat_total']
                            }
                        ]
                    }
                );

            },
            error: function (xhr) {
                console.log("post pool_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax pool_temperature error：", e);
}


resize_chart(
    [
        pool_available_heat_chart,
        high_heat_equal_supply_days_chart
    ]
);
