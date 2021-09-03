//***************获取元素*************************
var water_replenishment_dom = document.getElementById("water_replenishment");
var load_data_dom = document.getElementById("load_data_chart");
var load_pie_dom = document.getElementById("load_pie");
var supply_return_water_temp_dom = document.getElementById("supply_return_water_temp");

//***************初始化图表***********************************

var water_replenishment_chart = echarts.init(water_replenishment_dom);
var load_data_chart = echarts.init(load_data_dom);
var load_pie_chart = echarts.init(load_pie_dom);
var supply_return_water_temp_chart = echarts.init(supply_return_water_temp_dom);

loading_all([water_replenishment_chart, load_data_chart, load_pie_chart, supply_return_water_temp_chart]);

//*************定义数据************************************
String.prototype.format = function () {
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};

try {
    //load
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_load",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                $('#max_load').text(data['max_load'] + 'KW');
                $('#min_load').text(data['min_load'] + 'KW');
                load_data_chart.hideLoading();
                load_data_chart.setOption(
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
                            data: ['最小负荷', '平均负荷', '最大负荷']
                        },
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
                                name: '负荷量（kW）',
                                min: 0,
                                max: 7000,
                                axisLabel: {
                                    formatter: '{value} kW'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '最小负荷',
                                type: 'bar',
                                data: data['min_loads']
                            },
                            {
                                name: '平均负荷',
                                type: 'bar',
                                data: data['avg_loads']
                            },
                            {
                                name: '最大负荷',
                                type: 'line',
                                yAxisIndex: 0,
                                data: data['max_loads']
                            }
                        ]
                    }
                );
                load_pie_chart.hideLoading();
                load_pie_chart.setOption(
                    {

                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                        },
                        series: [
                            {
                                name: '负荷值',
                                type: 'pie',
                                radius: '50%',
                                data: data['load_pie_data'],
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
                );

            },
            error: function (xhr) {
                console.log("post load error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax load error：", e);
}

try {
    //heat_supply
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_heat_supply",
                "start": start,
                "end": end,
                "by": 'd',
                'avg_need': true
            },
            cache: true,
            success: function (data) {
                $('#avg_heat').text(data['avg_heat_network'] + 'KW');
                for (var i=0;i<data['heat_pipe_network_data'].length;i++){
                    if (data['heat_pipe_network_data'][i][0] > 0){
                        var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['heat_pipe_network_data'][i][1],
                            data['heat_pipe_network_data'][i][2],
                            data['heat_pipe_network_data'][i][3],
                        );

                    } else {
                        var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['heat_pipe_network_data'][i][1],
                            data['heat_pipe_network_data'][i][2],
                            data['heat_pipe_network_data'][i][3],
                        );
                    }
                    $("#heat_supply").append(tr_html);
                }
            },
            error: function (xhr) {
                console.log("post heat_supply error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax heat_supply error：", e);
}

try {
    //water_replenishment
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_water_replenishment",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                water_replenishment_chart.hideLoading();
                water_replenishment_chart.setOption(
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
                                name: '补水量(m³)',
                                type: 'value',
                                max: 12
                            }
                        ],
                        series: [
                            {
                                name: '补水量',
                                type: 'bar',
                                data: data['water_replenishment']
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
                                data: data['water_replenishment_limit']
                            },
                        ]
                    }
                );
            },
            error: function (xhr) {
                console.log("post water_replenishment error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax water_replenishment error：", e);
}

try {
    //water_supply_return_temperature
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_water_supply_return_temperature",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                for (var i=0;i<data['supply_return_water_temp_table_data'].length;i++){
                    if (data['supply_return_water_temp_table_data'][i][0] > 0){
                        var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['supply_return_water_temp_table_data'][i][1],
                            data['supply_return_water_temp_table_data'][i][2],
                            data['supply_return_water_temp_table_data'][i][3],
                            data['supply_return_water_temp_table_data'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['supply_return_water_temp_table_data'][i][1],
                            data['supply_return_water_temp_table_data'][i][2],
                            data['supply_return_water_temp_table_data'][i][3],
                            data['supply_return_water_temp_table_data'][i][4],
                        );
                    }
                    $("#supply_return_water_temp_table_data").append(tr_html);
                }

                supply_return_water_temp_chart.hideLoading();
                supply_return_water_temp_chart.setOption(
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
                                type: 'value',
                                max: 50,
                                min: 20
                            },
                            {
                                gridIndex: 1,
                                name: '温差(℃)',
                                type: 'value',
                                max: 5,
                                inverse: true
                            }
                        ],
                        series: [
                            {
                                name: '平均供水温度',
                                type: 'line',
                                symbolSize: 8,
                                hoverAnimation: false,
                                data: data['water_supply_temperature']
                            },
                            {
                                name: '平均回水温度',
                                type: 'line',
                                symbolSize: 8,
                                hoverAnimation: false,
                                data: data['return_water_temperature']
                            },
                            {
                                name: '平均供回水温差',
                                type: 'line',
                                xAxisIndex: 1,
                                yAxisIndex: 1,
                                symbolSize: 8,
                                hoverAnimation: false,
                                data: data['supply_return_water_temp_diff']
                            }
                        ]
                    }
                );
            },
            error: function (xhr) {
                console.log("post water_supply_return_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax water_supply_return_temperature error：", e);
}

resize_chart([water_replenishment_chart, load_data_chart, load_pie_chart, supply_return_water_temp_chart]);
