//***************获取元素*************************
var geothermal_wells_heat_provide_dom = document.getElementById("geothermal_wells_heat_provide");

//***************初始化图表***********************************
var geothermal_wells_heat_provide_chart = echarts.init(geothermal_wells_heat_provide_dom);

loading_all([geothermal_wells_heat_provide_chart]);

//*************绑定数据************************************

try {
    //sub_geothermal_wells_heat_provide
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_geothermal_wells_heat_provide",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                geothermal_wells_heat_provide_chart.hideLoading();
                if (is_large){
                    geothermal_wells_heat_provide_chart.setOption(
                        {
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
                                    saveAsImage: {show: true},
                                    dataZoom: {yAxisIndex: 'none'},
                                }
                            },
                            legend: {
                                data: ['高温板换制热量', '水源热泵制热量', '地热井可提供高温热量', '地热井可提供低温热量']
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    type: 'slider',
                                    start: 10,
                                    end: 40
                                }
                            ],
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '日期',
                                    data: data['time_data'],
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '热量(kWh)',
                                    min: 0,
                                    max: 150000,
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '高温板换制热量',
                                    type: 'bar',
                                    stack: '制热量',
                                    data: data['high_temp_plate_exchange_heat_production']
                                },
                                {
                                    name: '水源热泵制热量',
                                    type: 'bar',
                                    stack: '制热量',
                                    data: data['water_heat_pump_heat_production']
                                },
                                {
                                    name: '地热井可提供高温热量',
                                    type: 'line',
                                    data: data['geothermal_wells_high_heat_provide']
                                },
                                {
                                    name: '地热井可提供低温热量',
                                    type: 'line',
                                    data: data['geothermal_wells_low_heat_provide']
                                }
                            ]
                        }
                    );

                }else {
                    geothermal_wells_heat_provide_chart.setOption(
                        {
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
                                data: ['高温板换制热量', '水源热泵制热量', '地热井可提供高温热量', '地热井可提供低温热量']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '日期',
                                    data: data['time_data'],
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
                                    max: 150000,
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '高温板换制热量',
                                    type: 'bar',
                                    stack: '制热量',
                                    data: data['high_temp_plate_exchange_heat_production']
                                },
                                {
                                    name: '水源热泵制热量',
                                    type: 'bar',
                                    stack: '制热量',
                                    data: data['water_heat_pump_heat_production']
                                },
                                {
                                    name: '地热井可提供高温热量',
                                    type: 'line',
                                    data: data['geothermal_wells_high_heat_provide']
                                },
                                {
                                    name: '地热井可提供低温热量',
                                    type: 'line',
                                    data: data['geothermal_wells_low_heat_provide']
                                }
                            ]
                        }
                    );
                }

            },
            error: function (xhr) {
                console.log("post sub_geothermal_wells_heat_provide error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax sub_geothermal_wells_heat_provide error：", e);
}

geothermal_wells_heat_provide_chart.setOption(geothermal_wells_heat_provide_option);

resize_chart([geothermal_wells_heat_provide_chart]);




