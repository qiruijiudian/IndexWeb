//***************获取元素*************************
var pool_available_heat_dom = document.getElementById("pool_available_heat");
var high_heat_equal_supply_days_dom = document.getElementById("high_heat_equal_supply_days");
var kamba_system_cop_dom = document.getElementById("kamba_system_cop_pie");
var kamba_system_cop_chart_dom = document.getElementById("kamba_system_cop_chart");
var kamba_wshp_cop_dom = document.getElementById("kamba_wshp_cop_pie");
var kamba_wshp_cop_chart_dom = document.getElementById("kamba_wshp_cop_chart");
var pool_temp_dom = document.getElementById("heat_map_of_temp");
var last_week_solar_collector_dom = document.getElementById("last_week_solar_collector");
var last_week_heat_storage_replenishment_dom = document.getElementById("last_week_heat_storage_replenishment");

var last_week_heat_water_replenishment_dom = document.getElementById("last_week_heat_water_replenishment");
var last_week_solar_side_replenishment_dom = document.getElementById("last_week_solar_side_replenishment");

var solar_matrix_supply_and_return_water_temp_dom = document.getElementById("solar_matrix_supply_and_return_water_temp");

var last_week_solar_collector_by_days_dom = document.getElementById("last_week_solar_collector_by_days");

var load_by_days_dom = document.getElementById("load_by_days");

var supply_and_return_water_temp_diff_with_temp_dom = document.getElementById("supply_and_return_water_temp_diff_with_temp");
var supply_water_temp_with_temp_dom = document.getElementById("supply_water_temp_with_temp");
var return_water_temp_with_temp_dom = document.getElementById("return_water_temp_with_temp");

var end_supply_and_return_water_temp_dom = document.getElementById("end_supply_and_return_water_temp");

var last_year_supply_return_water_temp_dom = document.getElementById("last_year_supply_return_water_temp");

var calories_by_days_dom = document.getElementById("calories_by_days");
var heat_supply_analysis_dom = document.getElementById("heat_supply_analysis");
var power_rate_dom = document.getElementById("power_rate");

var cost_saving_dom = document.getElementById("cost_saving");

//***************初始化图表***********************************

var pool_available_heat_chart = echarts.init(pool_available_heat_dom);
var high_heat_equal_supply_days_chart = echarts.init(high_heat_equal_supply_days_dom);
var kamba_system_cop_chart = echarts.init(kamba_system_cop_dom);
var kamba_system_cop_chart_chart = echarts.init(kamba_system_cop_chart_dom);
var kamba_wshp_cop_chart = echarts.init(kamba_wshp_cop_dom);
var kamba_wshp_cop_chart_chart = echarts.init(kamba_wshp_cop_chart_dom);

var pool_temp_chart = echarts.init(pool_temp_dom);
var last_week_solar_collector_chart = echarts.init(last_week_solar_collector_dom);
var last_week_heat_storage_replenishment_chart = echarts.init(last_week_heat_storage_replenishment_dom);

var last_week_heat_water_replenishment_chart = echarts.init(last_week_heat_water_replenishment_dom);
var last_week_solar_side_replenishment_chart = echarts.init(last_week_solar_side_replenishment_dom);

var solar_matrix_supply_and_return_water_temp_chart = echarts.init(solar_matrix_supply_and_return_water_temp_dom);

var last_week_solar_collector_by_days_chart = echarts.init(last_week_solar_collector_by_days_dom);

var load_by_days_chart = echarts.init(load_by_days_dom);

var supply_and_return_water_temp_diff_with_temp_chart = echarts.init(supply_and_return_water_temp_diff_with_temp_dom);
var supply_water_temp_with_temp_chart = echarts.init(supply_water_temp_with_temp_dom);
var return_water_temp_with_temp_chart = echarts.init(return_water_temp_with_temp_dom);

var end_supply_and_return_water_temp_chart = echarts.init(end_supply_and_return_water_temp_dom);

var last_year_supply_return_water_temp_chart = echarts.init(last_year_supply_return_water_temp_dom);

var calories_by_days_chart = echarts.init(calories_by_days_dom);
var heat_supply_analysis_chart = echarts.init(heat_supply_analysis_dom);
var power_rate_chart = echarts.init(power_rate_dom);

var cost_saving_chart = echarts.init(cost_saving_dom);

loading_all(
    [
        pool_available_heat_chart,
        high_heat_equal_supply_days_chart,
        kamba_system_cop_chart,
        kamba_system_cop_chart_chart,
        kamba_wshp_cop_chart,
        kamba_wshp_cop_chart_chart,
        last_week_solar_collector_chart,
        last_week_heat_storage_replenishment_chart,
        last_week_heat_water_replenishment_chart,
        last_week_solar_side_replenishment_chart,
        solar_matrix_supply_and_return_water_temp_chart,
        last_week_solar_collector_by_days_chart,
        load_by_days_chart,
        supply_and_return_water_temp_diff_with_temp_chart,
        supply_water_temp_with_temp_chart,
        return_water_temp_with_temp_chart,
        end_supply_and_return_water_temp_chart,
        last_year_supply_return_water_temp_chart,
        calories_by_days_chart,
        power_rate_chart,
        cost_saving_chart
    ]
);

if (is_large){
    $("#max_load_title").text("最大负荷");
    $("#min_load_title").text("最小负荷");
    $("#kamba_cost_saving_title").text("节省供暖总费用");
}

//*************绑定数据************************************
function get_cop_pie_options(value){
    var options = {
        series: [{
            type: 'gauge',
            min:0,//最小值
            max:50,//最大值
            splitNumber:5, //刻度的个数
            axisLine: {
                lineStyle: {
                    width: 20,
                    color: [
                        [0.08, '#fd666d'],
                        [0.12, '#FFD700'],
                        [1, '#7FFF00']
                    ]
                }
            },
            pointer: {
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                distance: -60,
                length: 8,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            splitLine: {
                distance: -30,
                length: 30,
                lineStyle: {
                    color: '#fff',
                    width: 4
                }
            },
            axisLabel: {
                color: 'auto',
                distance: 30,
                fontSize: 15
            },
            detail: {
                show: true,
                valueAnimation: true,
                formatter: '{value} ',
                color: 'auto',
                borderRadius: 3,
            },
            data: [{
                value: value,
                name: 'COP',
                title: {
                    show: 'true',
                    offsetCenter: ['0%', '-30%'],
                    fontSize: 20,
                    fontWeight: 'bold'

                }
            }]
        }]
    };
    return options
} //cop数据通用函数

function get_water_provider_options(data, hint, delta_hint){
    var common = "";
    if (hint.includes("供回水")){
        common = "温差"
    }else if (hint.includes("供水")){
        common = "供水温度";
    }else {
        common = "回水温度";
    }

    var options = {
        color: ["green", "red"],
        grid: {
            left: 80,
            right: 80
        },
        legend: {
            right: 50,
            top: 18,
            data: [common, delta_hint + common]
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
                return '温度：' + value[0] + '℃' + '<br/>' + common + '：' + value[1] + '℃' + '<br/>' + delta_hint + common + '：' + value[1] + '℃';
            }
        },
        series: [
            {
                name: common,
                symbolSize: 11,
                data: data[0],
                type: 'scatter'
            },
            {
                name: delta_hint + common,
                symbolSize: 11,
                data: data[1],
                type: 'scatter'
            }
        ]
    };
    return options
}



String.prototype.format = function () {
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};

try {
    // heat_storage_heat
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_heat_storage_heat",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                // $('#pool_available_heat_heat_date').text('蓄热水池可用热量  [' +  start.split(" ")[0] + '   ——  ' + end.split(" ")[0] + ']');
                set_time_range("pool_available_heat_heat_date", start, end);
                pool_available_heat_chart.hideLoading();
                if (is_large){
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
                                data: ['低温热量', '高温热量']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '时间段',
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
                                    min: 0
                                    // max: 5000000
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
                }else {
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
                                    min: 0
                                    // max: 5000000
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
                }


                // $('#high_heat_equal_supply_days_heat_date').text('蓄热水池可用高温热量及电锅炉替换供热天数  [' +  start.split(" ")[0] + '   ——  ' + end.split(" ")[0] + ']');
                set_time_range("high_heat_equal_supply_days_heat_date", start, end);
                high_heat_equal_supply_days_chart.hideLoading();
                if (is_large){
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
                                data: ['2000kW电锅炉供热天数', '高温热量']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '时间段',
                                    data: data['time_data'],
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
                }else {
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
                                    data: data['time_data'],
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
                                    // max: 100,
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
                }


            },
            error: function (xhr) {
                console.log("post pool_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax pool_temperature error：", e);
}


try {
    // pool_temperature
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_pool_temperature",
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                set_time_range("pool_temp_status", null, end);
                for (var i=0;i<data['pool_temperature'].length;i++){

                    if (i % 2 == 0){
                        var tr_html = '<tr class="info">' +
                            '<td  style="text-align:center;vertical-align:middle;">{0}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{1}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{2}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{3}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{4}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{5}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{6}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{7}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{8}</td>' +
                            '</tr>';
                        tr_html = tr_html.format(
                            data['pool_temperature'][i][0],
                            data['pool_temperature'][i][1],
                            data['pool_temperature'][i][2],
                            data['pool_temperature'][i][3],
                            data['pool_temperature'][i][4],
                            data['pool_temperature'][i][5],
                            data['pool_temperature'][i][6],
                            data['pool_temperature'][i][7],
                            data['pool_temperature'][i][8]
                        );

                    } else {
                        var tr_html = '<tr class="success">' +
                            '<td  style="text-align:center;vertical-align:middle;">{0}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{1}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{2}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{3}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{4}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{5}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{6}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{7}</td>' +
                            '<td  style="text-align:center;vertical-align:middle;">{8}</td>' +
                            '</tr>';
                        tr_html = tr_html.format(
                            data['pool_temperature'][i][0],
                            data['pool_temperature'][i][1],
                            data['pool_temperature'][i][2],
                            data['pool_temperature'][i][3],
                            data['pool_temperature'][i][4],
                            data['pool_temperature'][i][5],
                            data['pool_temperature'][i][6],
                            data['pool_temperature'][i][7],
                            data['pool_temperature'][i][8]
                        );
                    }
                    $("#tbody_pool").append(tr_html);
                }

            },
            error: function (xhr) {
                console.log("post pool_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax pool_temperature error：", e);
}


try {
    // heat_map
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_pool_temperature",
                "start": start,
                "end": end,
                "by": 'h',
                "heat_map": true
            },
            cache: true,
            success: function (data) {
                set_time_range("heat_map_title_of_temp", null, end);
                pool_temp_chart.hideLoading();
                pool_temp_chart.setOption(
                    {
                        tooltip: {
                            position: 'top'
                        },
                        grid: {
                            height: '60%',
                            top: '10%',
                            left: "10%",
                            right: "10%"
                        },
                        xAxis: {
                            type: 'category',
                            data: data["sizes"],
                            splitArea: {
                                show: true
                            }
                        },
                        yAxis: {
                            type: 'category',
                            data: data["heat_time_period"],
                            splitArea: {
                                show: true
                            }
                        },
                        visualMap: {
                            min: data["min"],
                            max: data["max"],
                            calculable: true,
                            orient: 'horizontal',
                            left: 'center',
                            bottom: '10%'
                        },
                        series: [
                            {
                                name: 'Punch Card',
                                type: 'heatmap',
                                data: data["values"],
                                label: {
                                    show: true
                                },
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
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

try {
    //system_cop
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_system_cop",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                if (!data["status"].includes("正常")) $("#com_cop_title").text(`系统综合COP（${data["status"]}）`);
                kamba_system_cop_chart.hideLoading();
                kamba_system_cop_chart.setOption(
                    get_cop_pie_options(data['kamba_system_cop'][data['kamba_system_cop'].length-1])
                );

                set_time_range("sys_cop_title", start, end);
                kamba_system_cop_chart_chart.hideLoading();
                kamba_system_cop_chart_chart.setOption(
                    {
                        color: ['#32CD32', '#0000FF', '#FF0000'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                animation: false
                            }
                        },
                        legend: {
                            data: ['COP', 'Target Miniumum', 'Low Threshold'],
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
                                name: 'COP',
                                type: 'value',
                                max: data['max_cop']
                            }
                        ],
                        series: [
                            {
                                name: 'COP',
                                type: 'line',
                                symbol: 'none',
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#32CD32'
                                        }
                                    }
                                },
                                data: data['kamba_system_cop']
                            },
                            {
                                name: 'Target Miniumum',
                                type: 'line',
                                symbol: 'none',
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#0000FF'
                                        }
                                    }
                                },
                                data: data['target_minimum']
                            },
                            {
                                name: 'Low Threshold',
                                type: 'line',
                                symbol: 'none',
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#FF0000'
                                        }
                                    }
                                },
                                data: data['low_threshold']
                            }
                        ]
                    }
                );

                kamba_system_cop_chart_chart.getZr().on('click', function (params) {
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (kamba_system_cop_chart_chart.containPixel('grid',pointInPixel)) {
                        /*此处添加具体执行代码*/

                        var pointInGrid=kamba_system_cop_chart_chart.convertFromPixel({seriesIndex:0},pointInPixel);
                        //X轴序号
                        var xIndex=pointInGrid[0];

                        //获取当前图表的option
                        var op=kamba_system_cop_chart_chart.getOption();

                        //获得图表中我们想要的数据
                        var month = op.xAxis[0].data[xIndex];
                        var value = op.series[0].data[xIndex];
                        var tmp_options = get_cop_pie_options(value);
                        kamba_system_cop_chart.setOption(tmp_options);

                        console.log(month+"："+value);

                    }
                });

            },
            error: function (xhr) {
                console.log("post system_cop error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax system_cop error：", e);
}

try {
    //wshp_cop
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_wshp_cop",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                if (!data["status"].includes("正常")) $("#wshp_cop_title").text(`水源热泵COP（${data["status"]}）`);
                kamba_wshp_cop_chart.hideLoading();
                kamba_wshp_cop_chart.setOption(
                    get_cop_pie_options(data['kamba_wshp_cop'][data['kamba_wshp_cop'].length-1])
                );

                set_time_range("wp_cop_title", start, end);
                kamba_wshp_cop_chart_chart.hideLoading();
                kamba_wshp_cop_chart_chart.setOption(
                    {
                        color: ['#32CD32', '#0000FF', '#FF0000'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                animation: false
                            }
                        },
                        legend: {
                            data: ['COP', 'Target Miniumum', 'Low Threshold'],
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
                                name: 'COP',
                                type: 'value',
                                max: data['max_cop']
                            }
                        ],
                        series: [
                            {
                                name: 'COP',
                                type: 'line',
                                symbol: 'none',
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#32CD32'
                                        }
                                    }
                                },
                                data: data['kamba_wshp_cop']
                            },
                            {
                                name: 'Target Miniumum',
                                type: 'line',
                                symbol: 'none',
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#0000FF'
                                        }
                                    }
                                },
                                data: data['target_minimum']
                            },
                            {
                                name: 'Low Threshold',
                                type: 'line',
                                symbol: 'none',
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#FF0000'
                                        }
                                    }
                                },
                                data: data['low_threshold']
                            }
                        ]
                    }
                );

                kamba_wshp_cop_chart_chart.getZr().on('click', function (params) {
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (kamba_wshp_cop_chart_chart.containPixel('grid',pointInPixel)) {
                        /*此处添加具体执行代码*/

                        var pointInGrid=kamba_wshp_cop_chart_chart.convertFromPixel({seriesIndex:0},pointInPixel);
                        //X轴序号
                        var xIndex=pointInGrid[0];

                        //获取当前图表的option
                        var op=kamba_wshp_cop_chart_chart.getOption();

                        //获得图表中我们想要的数据
                        var month = op.xAxis[0].data[xIndex];
                        var value = op.series[0].data[xIndex];
                        var tmp_options = get_cop_pie_options(value);
                        kamba_wshp_cop_chart.setOption(tmp_options);

                        console.log(month+"："+value);

                    }
                });
            },
            error: function (xhr) {
                console.log("post wshp_cop error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax wshp_cop error：", e);
}

try {
    //solar_collector
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_solar_collector",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                last_week_solar_collector_chart.hideLoading();
                set_time_range("solar_heat_collector_title", start, end);
                if (is_large){
                    last_week_solar_collector_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['太阳能集热量'],
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
                                    name: '太阳能集热量(kWh)',
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '太阳能集热量',
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
                                    data: data['values']
                                },
                            ]
                        }
                    );
                }else {
                    last_week_solar_collector_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['过去一周太阳能集热量'],
                                left: 'center'
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
                                    name: '太阳能集热量(kWh)',
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '过去一周太阳能集热量',
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
                                    data: data['values']
                                },
                            ]
                        }
                    );
                }

            },
            error: function (xhr) {
                console.log("post solar_collector error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax solar_collector error：", e);
}

try {
    //hydration
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_hydration",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                var ids = ["heat_storage_rep_title", "heat_rep_title", "solar_rep_title"];
                for(var i=0;i<ids.length;i++){
                    set_time_range(ids[i], start, end);
                }
                last_week_heat_storage_replenishment_chart.hideLoading();
                last_week_heat_water_replenishment_chart.hideLoading();
                last_week_solar_side_replenishment_chart.hideLoading();
                if (is_large){
                    last_week_heat_storage_replenishment_chart.setOption(
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
                                // height: '35%'
                            }, {
                                left: 80,
                                right: 80,
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
                                    name: '蓄热水池补水量(m³)',
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
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
                                    data: data['heat_storage_tank_replenishment']
                                },
                            ]
                        }
                    );


                    last_week_heat_water_replenishment_chart.setOption(
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
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '供热端补水量',
                                    type: 'bar',
                                    data: data['heat_water_replenishment']
                                },
                                {
                                    name: '供热端补水限值',
                                    type: 'line',
                                    symbolSize: 5,
                                    hoverAnimation: false,
                                    data: data['heat_water_replenishment_limit']
                                },
                            ]
                        }
                    );


                    last_week_solar_side_replenishment_chart.setOption(
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
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '太阳能侧补水量',
                                    type: 'bar',
                                    data: data['solar_side_replenishment']
                                },
                                {
                                    name: '太阳能矩阵补水限值',
                                    type: 'line',
                                    symbolSize: 5,
                                    hoverAnimation: false,
                                    data: data['solar_matrix_replenishment_limit']
                                },
                            ]
                        }
                    );
                }else {
                    last_week_heat_storage_replenishment_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['过去一周蓄热水池补水量'],
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
                                    name: '蓄热水池补水量(m³)',
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '过去一周蓄热水池补水量',
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
                                    data: data['heat_storage_tank_replenishment']
                                },
                            ]
                        }
                    );


                    last_week_heat_water_replenishment_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['过去一周供热端补水量', '供热端补水限值'],
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
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '过去一周供热端补水量',
                                    type: 'bar',
                                    data: data['heat_water_replenishment']
                                },
                                {
                                    name: '供热端补水限值',
                                    type: 'line',
                                    symbolSize: 5,
                                    hoverAnimation: false,
                                    data: data['heat_water_replenishment_limit']
                                },
                            ]
                        }
                    );


                    last_week_solar_side_replenishment_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            legend: {
                                data: ['过去一周太阳能侧补水量', '太阳能矩阵补水限值'],
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
                                    type: 'value'
//            max: 12
                                }
                            ],
                            series: [
                                {
                                    name: '过去一周太阳能侧补水量',
                                    type: 'bar',
                                    data: data['solar_side_replenishment']
                                },
                                {
                                    name: '太阳能矩阵补水限值',
                                    type: 'line',
                                    symbolSize: 5,
                                    hoverAnimation: false,
                                    data: data['solar_matrix_replenishment_limit']
                                },
                            ]
                        }
                    );
                }

            },
            error: function (xhr) {
                console.log("post hydration error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax hydration error：", e);
}

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
                set_time_range("solar_matrix_title", start, end);
                solar_matrix_supply_and_return_water_temp_chart.hideLoading();

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
    //load
    $.ajax(
        {
            url: kamba_url,
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
                load_by_days_chart.hideLoading();
                set_time_range("load_title", start, end);
                if (is_large){
                    set_time_range("solar_matrix_title", start, end);
                    // $("#load_title").text("负荷量");
                    load_by_days_chart.setOption(
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
                                    saveAsImage: {show: true},
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    }
                                }
                            },
                            legend: {
                                data: ['最小负荷', '平均负荷', '最大负荷']
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
//            min: 0,
                                    axisLabel: {
                                        formatter: '{value} kW'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '最小负荷',
                                    type: 'line',
                                    data: data['min_loads'],
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
                }else {
                    load_by_days_chart.setOption(
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
//            min: 0,
                                    axisLabel: {
                                        formatter: '{value} kW'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '最小负荷',
                                    type: 'line',
                                    data: data['min_loads'],
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
                }

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
                var ids = ["re_with_temp_title","sup_with_temp_title","diff_with_temp_title", "diff_temp"];
                for(var i=0;i<ids.length;i++){
                    set_time_range(ids[i], start, end);
                }

                supply_and_return_water_temp_diff_with_temp_chart.hideLoading();
                supply_and_return_water_temp_diff_with_temp_chart.setOption(
                    get_water_provider_options(
                        [
                            data['end_supply_and_return_water_temp_diff_with_temp'],
                            data['last_end_supply_and_return_water_temp_diff_with_temp']
                        ], '末端供回水温差', data["hint"]
                    )
                );


                supply_water_temp_with_temp_chart.hideLoading();
                supply_water_temp_with_temp_chart.setOption(
                    get_water_provider_options(
                        [
                            data['supply_water_temp_with_temp'],
                            data['last_supply_water_temp_with_temp'],
                        ], '末端供水温度', data["hint"]
                    )
                );


                return_water_temp_with_temp_chart.hideLoading();
                return_water_temp_with_temp_chart.setOption(
                    get_water_provider_options(
                        [
                            data['return_water_temp_with_temp'],
                            data['last_return_water_temp_with_temp']
                        ], '末端回水温度', data["hint"]
                    )
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

try {
    //end_supply_and_return_water_temp for year

    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_end_supply_and_return_water_temp",
                "start": start,
                "end": end,
                "by": 'y'
            },
            cache: true,
            success: function (data) {
                $('#last_year_supply_return_water_temp_time_delta').text(

                    '供回水温度温差分析(' + data['last_year_start'] + '——' + data['last_year_end'] + ')'
                );
                last_year_supply_return_water_temp_chart.hideLoading();
                var series_name = ['供水温度', '回水温度', '温差', '去年供水温度', '去年回水温度', '去年温差'];
                // set_time_range("last_year_supply_return_water_temp_time_delta", start, end);
                if (is_large){

                    last_year_supply_return_water_temp_chart.setOption(
                        {
                            // color: ['red', 'green', 'blue'],
                            legend: {
                                left: 50,
                                top: 18,
                                data: ['供水温度', '回水温度', '温差', '去年供水温度', '去年回水温度', '去年温差']
                            },
                            toolbox: {  //配置工具箱组件
                                show: true,
                                right: 50,
                                top: 18,
                                feature: {
                                    mark: { show: true },
                                    dataZoom: { show: true },
                                    dataView: { show: true, readOnly: false },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            xAxis: [
                                {
                                    type: 'value',
                                    scale: true
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    scale: true
                                }
                            ],
                            tooltip: {
                                formatter: function(param) {
                                    if(param.name == '平均值'){
                                        // console.log(param);
                                        return series_name[param.seriesIndex] + '平均值：' + param.value + '℃';
                                    }else if(param.name == '最大值'){
                                        return series_name[param.seriesIndex] + '最大值：' + param.value + '℃';
                                    }else if(param.name == '最小值'){
                                        return series_name[param.seriesIndex] + '最小值：' + param.value + '℃';
                                    }else{
                                        return '温度：' + param.value[0] + '℃' + '<br/>' + param.seriesName + '：' + param.value[1] + '℃';
                                    }
                                }
                            },
                            series: [
                                {
                                    name: '供水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['end_supply_water_temp'],
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {   //设置男性数据
                                    name: '回水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['end_return_water_temp'],
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: '温差',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['end_supply_and_return_water_temp_diff'],
                                    markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: '去年供水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['last_end_supply_water_temp'],
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {   //设置男性数据
                                    name: '去年回水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['last_end_return_water_temp'],
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: '去年温差',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['last_end_supply_and_return_water_temp_diff'],
                                    markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                            ]
                        }
                    );
                }else {
                    last_year_supply_return_water_temp_chart.setOption(
                        {
                            color: ['red', 'green', 'blue'],
                            legend: {
                                left: 50,
                                top: 18,
                                data: ['供水温度', '回水温度', '温差']
                            },
                            toolbox: {  //配置工具箱组件
                                show: true,
                                right: 50,
                                top: 18,
                                feature: {
                                    mark: { show: true },
                                    dataZoom: { show: true },
                                    dataView: { show: true, readOnly: false },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            xAxis: [
                                {
                                    type: 'value',
                                    scale: true
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    scale: true
                                }
                            ],
                            tooltip: {
                                formatter: function(param) {
                                    if(param.name == '平均值'){
                                        // console.log(param);
                                        return series_name[param.seriesIndex] + '平均值：' + param.value + '℃';
                                    }else if(param.name == '最大值'){
                                        return series_name[param.seriesIndex] + '最大值：' + param.value + '℃';
                                    }else if(param.name == '最小值'){
                                        return series_name[param.seriesIndex] + '最小值：' + param.value + '℃';
                                    }else{
                                        return '温度：' + param.value[0] + '℃' + '<br/>' + param.seriesName + '：' + param.value[1] + '℃';
                                    }
                                }
                            },
                            series: [
                                {
                                    name: '供水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['end_supply_water_temp'],
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {   //设置男性数据
                                    name: '回水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['end_return_water_temp'],
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: '温差',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: data['end_supply_and_return_water_temp_diff'],
                                    markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
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

try {
    //solar_analysis
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_solar_heat_supply",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {

                last_week_solar_collector_by_days_chart.hideLoading();
                set_time_range("solar_analysis_title", start, end);
                if (is_large){
                    last_week_solar_collector_by_days_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                zlevel: 0,
                                z: 60,
                                show: true,
                                showContent: true,
                                triggerOn: 'mousemove|click',
                                alwaysShowContent: false,
                                displayMode: 'single',
                                renderMode: 'auto',
                                confine: null,
                                showDelay: 0,
                                hideLay: 100,
                                transitionDuration: 0.4,
                                enterable: false,
                                backgroundColor: '#F8F8FF',
                                shadowBlur: 10,
                                shadowColor: '#fff',
                                shadowOffsetX: 1,
                                shadowOffsetY: 2,
                                boderRadius: 4,
                                boderWidth: 1,
                                padding: null,
                                textStyle: {
                                    'align': 'left'
                                },
                                axisPointer: {
                                    type: 'cross',
                                    axis: 'auto',
                                    animation: 'auto',
                                    animationDurationUpdate: 200,
                                    animationEasingUpdate: 'exponentialOut',
                                    crossStyle:{
                                        color: '#999',
                                        width: 1,
                                        type: 'dashed'
                                    },
                                    textStyle: {
                                        color: '#666',
                                        fontSize: 14,
                                        align: 'right'
                                    },
                                },
                                formatter: function(params){
                                    var res = params[0].name + '<br/>', val;
                                    res += params[0].marker + " " + params[0].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].value + ' kWh' + '<br/>' +
                                        params[1].marker + " " + params[1].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[1].value + ' kWh' + '<br/>' +
                                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>';
                                        // params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
                                    return res;
                                }
                            },

                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true},
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    }
                                }
                            },
                            legend: {
                                data: ['供热量', '太阳能集热量', '短期太阳能保证率']
                            },
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
                                // {
                                //     type: 'inside',
                                //     realtime: true,
                                //     start: 30,
                                //     end: 70,
                                //     xAxisIndex: [0, 1]
                                // }
                            ],
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data['time_data']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '热量',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '太阳能保证率',
                                    min: 0,
                                    max: 500,
                                    position: 'right',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                }
                                // {
                                //     type: 'value',
                                //     name: '供暖保证率',
                                //     min: 0,
                                //     position: 'right',
                                //     offset: 80,
                                //     axisLine: {
                                //         show: true
                                //     },
                                //     axisLabel: {
                                //         formatter: '{value} %'
                                //     }
                                // }

                            ],
                            series: [
                                {
                                    name: '供热量',
                                    type: 'bar',
                                    data: data['heat_supply']
                                },
                                {
                                    name: '太阳能集热量',
                                    type: 'bar',
                                    data: data['solar_collector_heat']
                                },
                                {
                                    name: '短期太阳能保证率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: data['rate']
                                }

                            ],
                            grid: {
                                x: 130,
                                y: 70,
                                x2: 150,
                                y2: 80
                            }
                        }
                    );
                }else {
                    last_week_solar_collector_by_days_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                zlevel: 0,
                                z: 60,
                                show: true,
                                showContent: true,
                                triggerOn: 'mousemove|click',
                                alwaysShowContent: false,
                                displayMode: 'single',
                                renderMode: 'auto',
                                confine: null,
                                showDelay: 0,
                                hideLay: 100,
                                transitionDuration: 0.4,
                                enterable: false,
                                backgroundColor: '#F8F8FF',
                                shadowBlur: 10,
                                shadowColor: '#fff',
                                shadowOffsetX: 1,
                                shadowOffsetY: 2,
                                boderRadius: 4,
                                boderWidth: 1,
                                padding: null,
                                textStyle: {
                                    'align': 'left'
                                },
                                axisPointer: {
                                    type: 'cross',
                                    axis: 'auto',
                                    animation: 'auto',
                                    animationDurationUpdate: 200,
                                    animationEasingUpdate: 'exponentialOut',
                                    crossStyle:{
                                        color: '#999',
                                        width: 1,
                                        type: 'dashed'
                                    },
                                    textStyle: {
                                        color: '#666',
                                        fontSize: 14,
                                        align: 'right'
                                    },
                                },
                                formatter: function(params){
                                    var res = params[0].name + '<br/>', val;
                                    res += params[0].marker + " " + params[0].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].value + ' kWh' + '<br/>' +
                                        params[1].marker + " " + params[1].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[1].value + ' kWh' + '<br/>' +
                                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>';
                                        // params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
                                    return res;
                                }
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['供热量', '太阳能集热量', '短期太阳能保证率']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data['time_data']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '热量',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '太阳能保证率',
                                    min: 0,
                                    max: 500,
                                    position: 'right',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                }
                                // {
                                //     type: 'value',
                                //     name: '供暖保证率',
                                //     min: 0,
                                //     position: 'right',
                                //     offset: 80,
                                //     axisLine: {
                                //         show: true
                                //     },
                                //     axisLabel: {
                                //         formatter: '{value} %'
                                //     }
                                // }

                            ],
                            series: [
                                {
                                    name: '供热量',
                                    type: 'bar',
                                    data: data['heat_supply']
                                },
                                {
                                    name: '太阳能集热量',
                                    type: 'bar',
                                    data: data['solar_collector_heat']
                                },
                                {
                                    name: '短期太阳能保证率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: data['rate']
                                }
                            ],
                            grid: {
                                x: 130,
                                y: 70,
                                x2: 150,
                                y2: 50
                            }
                        }
                    );
                }

            },
            error: function (xhr) {
                console.log("post solar_analysis error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax solar_analysis error：", e);
}

try {
    //solar_analysis
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_heat_supply",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {

                heat_supply_analysis_chart.hideLoading();
                set_time_range("heat_supply_analysis_title", start, end);
                if (is_large){
                    heat_supply_analysis_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                zlevel: 0,
                                z: 60,
                                show: true,
                                showContent: true,
                                triggerOn: 'mousemove|click',
                                alwaysShowContent: false,
                                displayMode: 'single',
                                renderMode: 'auto',
                                confine: null,
                                showDelay: 0,
                                hideLay: 100,
                                transitionDuration: 0.4,
                                enterable: false,
                                backgroundColor: '#F8F8FF',
                                shadowBlur: 10,
                                shadowColor: '#fff',
                                shadowOffsetX: 1,
                                shadowOffsetY: 2,
                                boderRadius: 4,
                                boderWidth: 1,
                                padding: null,
                                textStyle: {
                                    'align': 'left'
                                },
                                axisPointer: {
                                    type: 'cross',
                                    axis: 'auto',
                                    animation: 'auto',
                                    animationDurationUpdate: 200,
                                    animationEasingUpdate: 'exponentialOut',
                                    crossStyle:{
                                        color: '#999',
                                        width: 1,
                                        type: 'dashed'
                                    },
                                    textStyle: {
                                        color: '#666',
                                        fontSize: 14,
                                        align: 'right'
                                    },
                                },
                                formatter: function(params){
                                    var res = params[0].name + '<br/>', val;
                                    res += params[0].marker + " " + params[0].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].value + ' kWh' + '<br/>' +
                                        params[1].marker + " " + params[1].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[1].value + ' kWh' + '<br/>' +
                                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>';
                                    // params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
                                    return res;
                                }
                            },

                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true},
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    }
                                }
                            },
                            legend: {
                                data: ['供热量', '水源热泵耗电量', '供热率']
                            },
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
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data['time_data']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '热量',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '供热率',
                                    min: 0,
                                    position: 'right',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                }

                            ],
                            series: [
                                {
                                    name: '供热量',
                                    type: 'bar',
                                    data: data['heat_supply']
                                },
                                {
                                    name: '水源热泵耗电量',
                                    type: 'bar',
                                    data: data['power_consume']
                                },
                                {
                                    name: '供热率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: data['rate']
                                }

                            ],
                            grid: {
                                x: 130,
                                y: 70,
                                x2: 150,
                                y2: 80
                            }
                        }
                    );
                }else {
                    heat_supply_analysis_chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis',
                                zlevel: 0,
                                z: 60,
                                show: true,
                                showContent: true,
                                triggerOn: 'mousemove|click',
                                alwaysShowContent: false,
                                displayMode: 'single',
                                renderMode: 'auto',
                                confine: null,
                                showDelay: 0,
                                hideLay: 100,
                                transitionDuration: 0.4,
                                enterable: false,
                                backgroundColor: '#F8F8FF',
                                shadowBlur: 10,
                                shadowColor: '#fff',
                                shadowOffsetX: 1,
                                shadowOffsetY: 2,
                                boderRadius: 4,
                                boderWidth: 1,
                                padding: null,
                                textStyle: {
                                    'align': 'left'
                                },
                                axisPointer: {
                                    type: 'cross',
                                    axis: 'auto',
                                    animation: 'auto',
                                    animationDurationUpdate: 200,
                                    animationEasingUpdate: 'exponentialOut',
                                    crossStyle:{
                                        color: '#999',
                                        width: 1,
                                        type: 'dashed'
                                    },
                                    textStyle: {
                                        color: '#666',
                                        fontSize: 14,
                                        align: 'right'
                                    },
                                },
                                formatter: function(params){
                                    var res = params[0].name + '<br/>', val;
                                    res += params[0].marker + " " + params[0].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].value + ' kWh' + '<br/>' +
                                        params[1].marker + " " + params[1].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[1].value + ' kWh' + '<br/>' +
                                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>';
                                    // params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
                                    return res;
                                }
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['供热量', '水源热泵耗电量', '供热率']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data['time_data']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '热量',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '供热率',
                                    min: 0,
                                    position: 'right',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                }


                            ],
                            series: [
                                {
                                    name: '供热量',
                                    type: 'bar',
                                    data: data['heat_supply']
                                },
                                {
                                    name: '水源热泵耗电量',
                                    type: 'bar',
                                    data: data['power_consume']
                                },
                                {
                                    name: '供热率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: data['rate']
                                }
                            ],
                            grid: {
                                x: 130,
                                y: 70,
                                x2: 150,
                                y2: 50
                            }
                        }
                    );
                }

            },
            error: function (xhr) {
                console.log("post solar_analysis error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax solar_analysis error：", e);
}

try {
    //api_calories
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_calories",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                calories_by_days_chart.hideLoading();
                set_time_range("heat_make_title", start, end);


                if (is_large){
                    calories_by_days_chart.setOption(
                        {

                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                }
                            },
                            // grid: {
                            //     right: '20%'
                            // },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true},
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    }
                                }
                            },
                            legend: {
                                data: ['高温板换制热量', '水源热泵制热量']
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    type: 'slider',
                                    start: 30,
                                    end: 70
                                }
                                // {
                                //     type: 'inside',
                                //     realtime: true,
                                //     start: 30,
                                //     end: 70,
                                //     xAxisIndex: [0, 1]
                                // },
                            ],
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data['time_data']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '制热量',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                }
                                // {
                                //     type: 'value',
                                //     name: '水源热泵制热量',
                                //     min: 0,
                                //     position: 'right',
                                //     axisLine: {
                                //         show: true
                                //     },
                                //
                                //     axisLabel: {
                                //         formatter: '{value} kWh'
                                //     }
                                // }
                            ],
                            series: [
                                {
                                    name: '高温板换制热量',
                                    type: 'bar',
                                    data: data['high_temperature_plate_exchange_heat']
                                },
                                {
                                    name: '水源热泵制热量',
                                    type: 'bar',
                                    data: data['wshp_heat']
                                    // yAxisIndex: 1,
                                }
                            ]
                            ,
                            grid: {
                                x: 140,
                                y: 80,
                                x2: 115,
                                y2: 75
                            }
                        }
                    );
                }else {
                    calories_by_days_chart.setOption(
                        {

                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                }
                            },
                            // grid: {
                            //     right: '20%'
                            // },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['高温板换制热量', '水源热泵制热量']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data['time_data']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '制热量',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} kWh'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '高温板换制热量',
                                    type: 'bar',
                                    data: data['high_temperature_plate_exchange_heat']
                                },
                                {
                                    name: '水源热泵制热量',
                                    type: 'bar',
                                    data: data['wshp_heat']
                                    // yAxisIndex: 1,
                                }
                            ]
                            ,
                            grid: {
                                x: 140,
                                y: 80,
                                x2: 115,
                                y2: 50
                            }
                        }
                    );
                }


                power_rate_chart.hideLoading();
                set_time_range("high_power_title", start, end);
                power_rate_chart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                animation: false
                            }
                        },
                        legend: {
                            data: ['高温板换制热功率'],
                            left: 'center'
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
                        }, {
                            left: 70,
                            right: 70,
                            top: '55%',
                        }],
                        xAxis: [
                            {
                                type: 'category',
                                name: '日期',
                                boundaryGap: false,
                                axisLine: {onZero: true},
                                data: data['rate_time']
                            }
                        ],
                        yAxis: [
                            {
                                name: '制热功率(kW)',
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '高温板换制热功率',
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
                                data: data['high_temperature_plate_exchange_heat_rate']
                            },
                        ]
                    }
                );
            },
            error: function (xhr) {
                console.log("post solar_analysis error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax solar_analysis error：", e);
}

try {
    //cost_saving
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_cost_saving",
                "start": last_month_date,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                $('#cost_saving_sum').text(data['cost_saving_total'] + '万元');
                cost_saving_chart.hideLoading();
                set_time_range("cost_saving_title", start, end);

                cost_saving_chart.setOption(
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
                        xAxis: [
                            {
                                type: 'category',
//            name: '时间段',
                                data: data['time_data'],
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisPointer: {
                                    type: 'shadow'
                                }

                            }
                        ],
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
                        series: [
                            {
                                name: '节省电费',
                                type: 'bar',
                                data: data['cost_saving']
                            },
                            {
                                name: '耗电量',
                                type: 'bar',
                                yAxisIndex: 1,
                                data: data['power_consumption']
                            }
                        ]
                    }
                );
            },
            error: function (xhr) {
                console.log("post cost_saving error：", xhr);
            }
        }
    );

}catch (e) {
    console.log("ajax cost_saving error：", e);
}

resize_chart(
    [
        pool_available_heat_chart,
        high_heat_equal_supply_days_chart,
        kamba_system_cop_chart,
        kamba_system_cop_chart_chart,
        kamba_wshp_cop_chart,
        kamba_wshp_cop_chart_chart,
        pool_temp_chart,
        last_week_solar_collector_chart,
        last_week_heat_storage_replenishment_chart,
        last_week_heat_water_replenishment_chart,
        last_week_solar_side_replenishment_chart,
        solar_matrix_supply_and_return_water_temp_chart,
        last_week_solar_collector_by_days_chart,
        heat_supply_analysis_chart,
        load_by_days_chart,
        supply_and_return_water_temp_diff_with_temp_chart,
        supply_water_temp_with_temp_chart,
        return_water_temp_with_temp_chart,
        end_supply_and_return_water_temp_chart,
        last_year_supply_return_water_temp_chart,
        calories_by_days_chart,
        power_rate_chart,
        cost_saving_chart
    ]
);


