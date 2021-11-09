//***************获取元素*************************
var load_data_dom = document.getElementById("load_data_chart");
var load_pie_dom = document.getElementById("load_pie");
var geothermal_wells_heat_provide_dom = document.getElementById("geothermal_wells_heat_provide");
var com_cop_pie_dom = document.getElementById("com_cop_pie");
var com_cop_chart_dom = document.getElementById("com_cop_chart");
var water_replenishment_dom = document.getElementById("water_replenishment");
var cost_saving_dom = document.getElementById("cost_saving");
var cost_saving_high_low_pie_dom = document.getElementById("cost_saving_high_low_pie");
var supply_return_water_temp_dom = document.getElementById("supply_return_water_temp");

//***************初始化图表***********************************
var load_data_chart = echarts.init(load_data_dom);
var load_pie_chart = echarts.init(load_pie_dom);
var geothermal_wells_heat_provide_chart = echarts.init(geothermal_wells_heat_provide_dom);
var com_cop_chart_chart = echarts.init(com_cop_chart_dom);
var com_cop_pie_chart = echarts.init(com_cop_pie_dom);
var water_replenishment_chart = echarts.init(water_replenishment_dom);
var cost_saving_chart = echarts.init(cost_saving_dom);
var cost_saving_high_low_pie_chart = echarts.init(cost_saving_high_low_pie_dom);
var supply_return_water_temp_chart = echarts.init(supply_return_water_temp_dom);

loading_all([load_data_chart, load_pie_chart, geothermal_wells_heat_provide_chart, com_cop_chart_chart, com_cop_pie_chart, water_replenishment_chart, cost_saving_chart, cost_saving_high_low_pie_chart, supply_return_water_temp_chart]);

if (is_large){
    $("#core_max_load").text("最大负荷");
    $("#core_min_load").text("最小负荷");
    $("#core_cost_saving").text("节省供暖总费用");
}


//*************绑定数据************************************
function get_cop_pie_options(value){
    var options = {
        series: [{
            type: 'gauge',
            min:0,//最小值
            max:20,//最大值
            splitNumber:10, //刻度的个数
            axisLine: {
                lineStyle: {
                    width: 20,
                    color: [
                        [0.2, '#fd666d'],
                        [0.3, '#FFD700'],
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
                load_pie_chart.hideLoading();
                if (is_large){
                    $("#core_load_title").text("负荷值");
                    load_data_chart.setOption(
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
                                    dataZoom: {yAxisIndex: 'none'},
                                }
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
                                    name: '负荷量（kWh）',
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
                }else {

                    load_data_chart.setOption(
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
                                    name: '负荷量（kWh）',
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
                }
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
    //geothermal_wells_heat_provide
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
                            grid: {
                                x: 110,
                                x2: 80,
                                bottom: "35%"
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
                                    dataZoom: {yAxisIndex: 'none'}
                                },
                                y: 30
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
                                        formatter: '{value}' + ' kWh'
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
//            yAxisIndex: 1,
                                    data: data['geothermal_wells_high_heat_provide']
                                },
                                {
                                    name: '地热井可提供低温热量',
                                    type: 'line',
//            yAxisIndex: 1,
                                    data: data['geothermal_wells_low_heat_provide']
                                }
                            ]
                        }
                    );
                }else {
                    geothermal_wells_heat_provide_chart.setOption(
                        {
                            grid: {
                                x: 110,
                                x2: 80,
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
                                        formatter: '{value}' + ' kWh'
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
//            yAxisIndex: 1,
                                    data: data['geothermal_wells_high_heat_provide']
                                },
                                {
                                    name: '地热井可提供低温热量',
                                    type: 'line',
//            yAxisIndex: 1,
                                    data: data['geothermal_wells_low_heat_provide']
                                }
                            ]
                        }
                    );
                }

            },
            error: function (xhr) {
                console.log("post geothermal_wells_heat_provide error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax geothermal_wells_heat_provide error：", e);
}

try {
    //com_cop
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_com_cop",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                com_cop_chart_chart.hideLoading();
                if (!data["status"].includes("正常")) $("#core_cop_title").text(`系统综合COP（${data["status"]}）`);


                com_cop_chart_chart.setOption(
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
                            left: 50,
                            right: 65,
                            // height: '35%'
                        }, {
                            left: 50,
                            right: 65,
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
                                data: data['values']
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
                com_cop_pie_chart.hideLoading();
                com_cop_pie_chart.setOption(
                    get_cop_pie_options(
                        data["values"][data["values"].length-1]
                    )
                );
            },
            error: function (xhr) {
                console.log("post com_cop error：", xhr);
            }
        }
    );
    com_cop_chart_chart.getZr().on('click', function (params) {
        var pointInPixel= [params.offsetX, params.offsetY];
        if (com_cop_chart_chart.containPixel('grid',pointInPixel)) {
            /*此处添加具体执行代码*/

            var pointInGrid=com_cop_chart_chart.convertFromPixel({seriesIndex:0},pointInPixel);
            //X轴序号
            var xIndex=pointInGrid[0];

            //获取当前图表的option
            var op=com_cop_chart_chart.getOption();

            //获得图表中我们想要的数据
            var month = op.xAxis[0].data[xIndex];
            var value = op.series[0].data[xIndex];
            var tmp_options = get_cop_pie_options(value);
//			com_cop_pie_chart.clear();
            com_cop_pie_chart.setOption(tmp_options);

            console.log(month+"："+value);

        }
    });
}catch (e) {
    console.log("ajax com_cop error：", e);
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
                if (is_large) $("#core_water_replenishment_title").text("补水量及补水量限值");
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
                            left: 65,
                            right: 70,
                            // height: '35%'
                        }, {
                            left: 65,
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
    //cost_saving
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_cost_saving",
                "start": last_month_date,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                cost_saving_chart.hideLoading();
                cost_saving_high_low_pie_chart.hideLoading();
                if (is_large){
                    $('#cost_saving_sum').text(data['charge_sum'] + '万元');
                    $('#core_charge_sum_title').text('节省供暖费用情况（总计：' + data['charge_sum'] + '万元）');
                    $("#core_cost_saving_pie_title").text("节省高低温供暖总费用对比");
                }else {
                    $('#cost_saving_sum').text(data['charge_sum'] + '万元');
                    $('#core_charge_sum_title').text('上月节省供暖费用情况（总计：' + data['charge_sum'] + '万元）');
                    $("#core_cost_saving_pie_title").text("上月节省高低温供暖总费用对比");
                }
                cost_saving_chart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        toolbox: {
                            feature: {
                                dataZoom: {yAxisIndex: 'none'},
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
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
                        grid: {
                            left: '5%',
                            right: '10%',
                            bottom: '12%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                name: '日期',
                                data: data['time_data'],
                                axisTick: {
                                    alignWithLabel: true
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
                                name: '节省供暖费用（元）'
                            }
                        ],

                        series: [
                            {
                                name: '当日节省供暖费用/元',
                                type: 'bar',
                                barWidth: '40%',
                                data: data['cost_saving']
                            }
                        ]
                    }
                );
                cost_saving_high_low_pie_chart.setOption(
                    {
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'right',
                        },
                        series: [
                            {
                                name: '高低温节省供暖费用对比',
                                type: 'pie',
                                radius: '50%',
                                data: data['cost_saving_high_low'],

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
                console.log("post cost_saving error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax cost_saving error：", e);
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
                supply_return_water_temp_chart.hideLoading();
                if (is_large){
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
                }else {
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
                }

            },
            error: function (xhr) {
                console.log("post water_supply_return_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax water_supply_return_temperature error：", e);
}

resize_chart([load_data_chart, load_pie_chart, geothermal_wells_heat_provide_chart, com_cop_chart_chart, com_cop_pie_chart, water_replenishment_chart, cost_saving_chart, cost_saving_high_low_pie_chart, supply_return_water_temp_chart]);
