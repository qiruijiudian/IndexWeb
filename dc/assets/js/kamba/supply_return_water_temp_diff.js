//***************获取元素*************************
var solar_matrix_supply_and_return_water_temp_dom = document.getElementById("solar_matrix_supply_and_return_water_temp");
var last_week_solar_collector_by_days_dom = document.getElementById("last_week_solar_collector_by_days");
var supply_and_return_water_temp_diff_with_temp_dom = document.getElementById("supply_and_return_water_temp_diff_with_temp");
var supply_water_temp_with_temp_dom = document.getElementById("supply_water_temp_with_temp");
var return_water_temp_with_temp_dom = document.getElementById("return_water_temp_with_temp");
var end_supply_and_return_water_temp_dom = document.getElementById("end_supply_and_return_water_temp");

//***************初始化图表***********************************
var solar_matrix_supply_and_return_water_temp_chart = echarts.init(solar_matrix_supply_and_return_water_temp_dom);
var supply_and_return_water_temp_diff_with_temp_chart = echarts.init(supply_and_return_water_temp_diff_with_temp_dom);
var supply_water_temp_with_temp_chart = echarts.init(supply_water_temp_with_temp_dom);
var return_water_temp_with_temp_chart = echarts.init(return_water_temp_with_temp_dom);
var end_supply_and_return_water_temp_chart = echarts.init(end_supply_and_return_water_temp_dom);

loading_all(
    [
        solar_matrix_supply_and_return_water_temp_chart,
        supply_and_return_water_temp_diff_with_temp_chart,
        supply_water_temp_with_temp_chart,
        return_water_temp_with_temp_chart,
        end_supply_and_return_water_temp_chart
    ]
);
//*************定义数据************************************
function get_water_provider_options(data, hint){

    var options = {
        grid: {
                left: 80,
                right: 80
        },
        xAxis: {
            name: '温度（℃）'
        },
        yAxis: {
            name: hint + '（℃）'
        },
        tooltip: {
            formatter: function(param) {
                var value = param.value;
                return '温度：' + value[0] + '℃' + '<br/>' + hint + '：' + value[1] + '℃';
            }
        },
        series: [{
            symbolSize: 15,
            data: data,
            type: 'scatter'
        }]
    };
    return options
};

set_time_range("date", start, end);

try {
    //solar_matrix_supply_and_return_water_temperature
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_solar_matrix_supply_and_return_water_temperature",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                solar_matrix_supply_and_return_water_temp_chart.hideLoading();
                if (is_large) $("#solar_matrix_title").text("太阳能矩阵供回水温度");
                solar_matrix_supply_and_return_water_temp_chart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                animation: false
                            }
                        },
                        legend: {
                            data: ['太阳能矩阵供水温度', '太阳能矩阵回水温度'],
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
                            left: 70,
                            right: 70,
                            // height: '35%'
                        }, {
                            left: 70,
                            right: 70,
                            top: '55%',
                            // height: '35%'
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                name: '日期',
                                boundaryGap: false,
                                axisLine: {onZero: true},
                                data: data['time_data']
                            }
                        ],
                        yAxis: [
                            {
                                name: '温度(℃)',
                                type: 'value'
//            max: 12
                            }
                        ],
                        series: [
                            {
                                name: '太阳能矩阵供水温度',
                                type: 'line',
                                data: data['solar_matrix_supply_water_temp']
                            },
                            {
                                name: '太阳能矩阵回水温度',
                                type: 'line',
                                symbolSize: 5,
                                hoverAnimation: false,
                                data: data['solar_matrix_return_water_temp']
                            },
                        ]
                    }
                );
            },
            error: function (xhr) {
                console.log("post solar_matrix_supply_and_return_water_temperature error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax solar_matrix_supply_and_return_water_temperature error：", e);
}

try {
    //end_supply_and_return_water_temp
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_end_supply_and_return_water_temp",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                supply_and_return_water_temp_diff_with_temp_chart.hideLoading();
                supply_and_return_water_temp_diff_with_temp_chart.setOption(
                    get_water_provider_options(data['end_supply_and_return_water_temp_diff_with_temp'], '末端供回水温差')
                );


                supply_water_temp_with_temp_chart.hideLoading();
                supply_water_temp_with_temp_chart.setOption(
                    get_water_provider_options(data['supply_water_temp_with_temp'], '末端供水温度')
                );


                return_water_temp_with_temp_chart.hideLoading();
                return_water_temp_with_temp_chart.setOption(
                    get_water_provider_options(data['return_water_temp_with_temp'], '末端回水温差')
                );

                end_supply_and_return_water_temp_chart.hideLoading();
                if (is_large){
                    end_supply_and_return_water_temp_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['平均供水温度', '平均回水温度', '平均供回水温差'],
                                left: 10
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore: {show: true},
                                    saveAsImage: {show: true},
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    }
                                }
                            },

                            axisPointer: {
                                link: {xAxisIndex: 'all'}
                            },

                            grid: [{
                                left: 70,
                                right: 70,
                                height: '25%'
                            }, {
                                left: 70,
                                right: 70,
                                top: '60%',
                                height: '25%'
                            }],
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 30,
                                    end: 70,
                                    xAxisIndex: [0, 1]
                                },
                                {
                                    type: 'inside',
                                    realtime: true,
                                    start: 30,
                                    end: 70,
                                    xAxisIndex: [0, 1]
                                }
                            ],
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '日期',
                                    boundaryGap: false,
                                    axisLine: {onZero: true},
                                    data: data['time_data']
                                },
                                {
                                    gridIndex: 1,
                                    type: 'category',
                                    boundaryGap: false,
                                    axisLine: {onZero: true},
                                    data: data['time_data'],
                                    position: 'top'
                                }
                            ],
                            yAxis: [
                                {
                                    name: '温度(℃)',
                                    type: 'value'
//            min: 20
                                },
                                {
                                    gridIndex: 1,
                                    name: '温差(℃)',
                                    type: 'value',
                                    inverse: true
                                }
                            ],
                            series: [
                                {
                                    name: '平均供水温度',
                                    type: 'line',
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                    data: data['end_supply_water_temp']
                                },
                                {
                                    name: '平均回水温度',
                                    type: 'line',
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                    data: data['end_return_water_temp'],
                                    itemStyle : {
                                        normal : {
                                            lineStyle:{
                                                color:'#556B2F'
                                            }
                                        }
                                    }
                                },
                                {
                                    name: '平均供回水温差',
                                    type: 'line',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                    data: data['end_supply_and_return_water_temp_diff']
                                }
                            ]
                        }
                    );
                }else {
                    end_supply_and_return_water_temp_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['平均供水温度', '平均回水温度', '平均供回水温差'],
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

                            grid: [{
                                left: 70,
                                right: 70,
                                height: '30%'
                            }, {
                                left: 70,
                                right: 70,
                                top: '60%',
                                height: '30%'
                            }],
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '日期',
                                    boundaryGap: false,
                                    axisLine: {onZero: true},
                                    data: data['time_data']
                                },
                                {
                                    gridIndex: 1,
                                    type: 'category',
                                    boundaryGap: false,
                                    axisLine: {onZero: true},
                                    data: data['time_data'],
                                    position: 'top'
                                }
                            ],
                            yAxis: [
                                {
                                    name: '温度(℃)',
                                    type: 'value'
//            min: 20
                                },
                                {
                                    gridIndex: 1,
                                    name: '温差(℃)',
                                    type: 'value',
                                    inverse: true
                                }
                            ],
                            series: [
                                {
                                    name: '平均供水温度',
                                    type: 'line',
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                    data: data['end_supply_water_temp']
                                },
                                {
                                    name: '平均回水温度',
                                    type: 'line',
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                    data: data['end_return_water_temp'],
                                    itemStyle : {
                                        normal : {
                                            lineStyle:{
                                                color:'#556B2F'
                                            }
                                        }
                                    }
                                },
                                {
                                    name: '平均供回水温差',
                                    type: 'line',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                    data: data['end_supply_and_return_water_temp_diff']
                                }
                            ]
                        }
                    );
                }


            },
            error: function (xhr) {
                console.log("post end_supply_and_return_water_temp error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax end_supply_and_return_water_temp error：", e);
}


resize_chart(
    [
        solar_matrix_supply_and_return_water_temp_chart,
        supply_and_return_water_temp_diff_with_temp_chart,
        supply_water_temp_with_temp_chart,
        return_water_temp_with_temp_chart,
        end_supply_and_return_water_temp_chart
    ]
);