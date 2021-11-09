//***************获取元素*************************
var load_by_days_dom = document.getElementById("load_by_days");

var last_week_solar_collector_dom = document.getElementById("last_week_solar_collector");
var last_week_heat_storage_replenishment_dom = document.getElementById("last_week_heat_storage_replenishment");

var last_week_heat_water_replenishment_dom = document.getElementById("last_week_heat_water_replenishment");
var last_week_solar_side_replenishment_dom = document.getElementById("last_week_solar_side_replenishment");

var last_week_solar_collector_by_days_dom = document.getElementById("last_week_solar_collector_by_days");

var calories_by_days_dom = document.getElementById("calories_by_days");
var power_rate_dom = document.getElementById("power_rate");

//***************初始化图表***********************************
var load_by_days_chart = echarts.init(load_by_days_dom);
var last_week_solar_collector_chart = echarts.init(last_week_solar_collector_dom);
var last_week_heat_storage_replenishment_chart = echarts.init(last_week_heat_storage_replenishment_dom);
var last_week_heat_water_replenishment_chart = echarts.init(last_week_heat_water_replenishment_dom);
var last_week_solar_side_replenishment_chart = echarts.init(last_week_solar_side_replenishment_dom);
var last_week_solar_collector_by_days_chart = echarts.init(last_week_solar_collector_by_days_dom);
var calories_by_days_chart = echarts.init(calories_by_days_dom);
var power_rate_chart = echarts.init(power_rate_dom);


loading_all(
    [
        load_by_days_chart,
        last_week_solar_collector_chart,
        last_week_heat_storage_replenishment_chart,
        last_week_heat_water_replenishment_chart,
        last_week_solar_side_replenishment_chart,
        last_week_solar_collector_by_days_chart,
        calories_by_days_chart,
        power_rate_chart
    ]
);

if (is_large){
    $("#max_load_title").text("最大负荷");
    $("#min_load_title").text("最小负荷");
    $("#avg_load_title").text("平均负荷");
}

//*************定义数据************************************

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
                $('#avg_load').text(data['avg_load'] + 'KW');
                load_by_days_chart.hideLoading();
                if (is_large){
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
    //solar_analysis
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_solar_analysis",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {

                last_week_solar_collector_by_days_chart.hideLoading();
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
                                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>' +
                                        params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
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
                                data: ['可用太阳能', '太阳能集热量', '太阳能集热效率', '太阳能供暖保证率']
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
                                    name: '集热效率',
                                    min: 0,
                                    position: 'right',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '供暖保证率',
                                    min: 0,
                                    position: 'right',
                                    offset: 80,
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
                                    name: '可用太阳能',
                                    type: 'bar',
                                    data: data['available_solar']
                                },
                                {
                                    name: '太阳能集热量',
                                    type: 'bar',
                                    data: data['solar_collector_heat']
                                },
                                {
                                    name: '太阳能集热效率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: data['solar_collector_efficiency']
                                },
                                {
                                    name: '太阳能供暖保证率',
                                    type: 'line',
                                    yAxisIndex: 2,
                                    data: data['solar_heating_guarantee_rate']
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
                                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>' +
                                        params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
                                    return res;
                                }
                            },
//    grid: {
//        right: '20%'
//    },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['可用太阳能', '太阳能集热量', '太阳能集热效率', '太阳能供暖保证率']
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
                                    name: '集热效率',
                                    min: 0,
                                    position: 'right',
                                    axisLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '供暖保证率',
                                    min: 0,
                                    position: 'right',
                                    offset: 80,
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
                                    name: '可用太阳能',
                                    type: 'bar',
                                    data: data['available_solar']
                                },
                                {
                                    name: '太阳能集热量',
                                    type: 'bar',
                                    data: data['solar_collector_heat']
                                },
                                {
                                    name: '太阳能集热效率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: data['solar_collector_efficiency']
                                },
                                {
                                    name: '太阳能供暖保证率',
                                    type: 'line',
                                    yAxisIndex: 2,
                                    data: data['solar_heating_guarantee_rate']
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
                                },
                                {
                                    type: 'inside',
                                    realtime: true,
                                    start: 30,
                                    end: 70,
                                    xAxisIndex: [0, 1]
                                },
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
                                    name: '高温板换制热量',
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
                                    name: '水源热泵制热量',
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
                            series: [
                                {
                                    name: '高温板换制热量',
                                    type: 'bar',
                                    data: data['high_temperature_plate_exchange_heat']
                                },
                                {
                                    name: '水源热泵制热量',
                                    type: 'bar',
                                    data: data['wshp_heat'],
                                    yAxisIndex: 1,
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
                                    name: '高温板换制热量',
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
                                    name: '水源热泵制热量',
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
                            series: [
                                {
                                    name: '高温板换制热量',
                                    type: 'bar',
                                    data: data['high_temperature_plate_exchange_heat']
                                },
                                {
                                    name: '水源热泵制热量',
                                    type: 'bar',
                                    data: data['wshp_heat'],
                                    yAxisIndex: 1,
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




resize_chart(
    [
        load_by_days_chart,
        last_week_solar_collector_chart,
        last_week_heat_storage_replenishment_chart,
        last_week_heat_water_replenishment_chart,
        last_week_solar_side_replenishment_chart,
        last_week_solar_collector_by_days_chart,
        calories_by_days_chart,
        power_rate_chart
    ]
);
