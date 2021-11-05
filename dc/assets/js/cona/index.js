//***************获取元素*************************
var com_cop_pie_dom = document.getElementById("com_cop_pie");
var com_cop_chart_dom = document.getElementById("com_cop_chart");
var water_provide_temp_chart_dom = document.getElementById("water_provide_temp_chart");
var heat_well_heating_chart_dom = document.getElementById("heat_well_heating_chart");
var heat_pipe_network_heating_chart_dom = document.getElementById("heat_pipe_network_heating_chart");
var water_heat_pump_heat_production_chart_dom = document.getElementById("water_heat_pump_heat_production_chart");
var high_temp_plate_exchange_heat_production_chart_dom = document.getElementById("high_temp_plate_exchange_heat_production_chart");
var geothermal_wells_heat_provide_dom = document.getElementById("geothermal_wells_heat_provide");
var cost_saving_dom = document.getElementById("cost_saving");
var cost_saving_high_low_pie_dom = document.getElementById("cost_saving_high_low_pie");
var load_data_dom = document.getElementById("load_data_chart");
var load_pie_dom = document.getElementById("load_pie");
var supply_return_water_temp_dom = document.getElementById("supply_return_water_temp");
var water_replenishment_dom = document.getElementById("water_replenishment");



if (is_large){
    $("#max_load_title").text("最大负荷");
    $("#min_load_title").text("最小负荷");
    $("#cost_saving_title").text("节省供暖总费用");
    $("#temp_diff_title").text("供回水温度温差数据");
    $("#load_title").text("负荷值");
    $("#water_replenishment_title").text("补水量及补水量限值");
}

//***************初始化图表***********************************
var com_cop_chart_chart = echarts.init(com_cop_chart_dom);
var com_cop_pie_chart = echarts.init(com_cop_pie_dom);
var water_provide_temp_chart_chart = echarts.init(water_provide_temp_chart_dom);
var heat_well_heating_chart_chart = echarts.init(heat_well_heating_chart_dom);
var heat_pipe_network_heating_chart_chart = echarts.init(heat_pipe_network_heating_chart_dom);
var water_heat_pump_heat_production_chart_chart = echarts.init(water_heat_pump_heat_production_chart_dom);
var high_temp_plate_exchange_heat_production_chart_chart = echarts.init(high_temp_plate_exchange_heat_production_chart_dom);
var geothermal_wells_heat_provide_chart = echarts.init(geothermal_wells_heat_provide_dom);
var cost_saving_chart = echarts.init(cost_saving_dom);
var cost_saving_high_low_pie_chart = echarts.init(cost_saving_high_low_pie_dom);
var load_data_chart = echarts.init(load_data_dom);
var load_pie_chart = echarts.init(load_pie_dom);
var supply_return_water_temp_chart = echarts.init(supply_return_water_temp_dom);
var water_replenishment_chart = echarts.init(water_replenishment_dom);

loading_all(
    [
        com_cop_chart_chart,
        com_cop_pie_chart,
        water_provide_temp_chart_chart,
        heat_well_heating_chart_chart,
        heat_pipe_network_heating_chart_chart,
        water_heat_pump_heat_production_chart_chart,
        high_temp_plate_exchange_heat_production_chart_chart,
        geothermal_wells_heat_provide_chart,
        cost_saving_chart,
        cost_saving_high_low_pie_chart,
        load_data_chart,
        load_pie_chart,
        supply_return_water_temp_chart,
        water_replenishment_chart,
    ]
);

//***************函数定义***********************************
String.prototype.format = function () {
  var str = this;
  for(var i = 0;i < arguments.length;i++){
      var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
  }
  return str;
};

function get_cop_pie_options(value){
    //COP饼图
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

function get_water_provider_options(data, hint){
    //XXX与气温关系（散点）
    var options = {
        grid:{
            x:75,
            x2:90,
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

function get_heat_provide_options(data, hint, title_text){
    var options = {
        grid:{
            x:75,
            x2:90,
        },
        title: {
            text: title_text,
            left: 'center',
            top: 0
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },

        xAxis: {
            name: '温度（℃）'
        },
        yAxis: {
            name: hint + '(kWh)'
        },
        tooltip: {
            formatter: function(param) {
                var value = param.value;
                return '温度：' + value[0] + '℃' + '<br/>' + hint + '：' + value[1] + 'kWh';
            }
        },
        series: [{
            symbolSize: 15,
            data: data,
            type: 'scatter'
        }]
    };
    return options
}

function get_com_cop_chart_options(data) {
    return {
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
    };
}

//***************绑定数据***********************************

try {
    //water_provide_temperature
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_water_provide_temperature",
                "start": start,
                "end": end,
                "by": 'h'
            },
            cache: true,
            success: function (data) {
                water_provide_temp_chart_chart.hideLoading();
                console.log(data);
                water_provide_temp_chart_chart.setOption(
                    get_water_provider_options(
                        data['values'], '供水温度'
                    )
                );
            },
            error: function (xhr) {
                console.log("post water_provide_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax water_provide_temperature error：", e);
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
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                },

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
                                data: ['高温板换制热量', '水源热泵制热量', '地热井可提供高温热量', '地热井可提供低温热量']
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
                                    name: '热量(kWh)',
                                    min: 0,
                                    // max: 150000,
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
                                    // max: 150000,
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
                if (!data["status"].includes("正常")) $("#com_cop_title").text(`系统综合COP（${data["status"]}）`);

                com_cop_chart_chart.setOption(
                    get_com_cop_chart_options(data)
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
    //outlet_water_temperature
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_outlet_water_temperature"
            },
            cache: true,
            success: function (data) {
                // 周 and 高
                for (var i=0;i<data['high_week_result'].length;i++){
                    if (data['high_week_result'][i][0] > 0){
                        var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['high_week_result'][i][1],
                            data['high_week_result'][i][2],
                            data['high_week_result'][i][3],
                            data['high_week_result'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['high_week_result'][i][1],
                            data['high_week_result'][i][2],
                            data['high_week_result'][i][3],
                            data['high_week_result'][i][4],
                        );
                    }
                    $("#last_week_high_temp_tbody").append(tr_html);
                }
                // 年 and 高
                for (var i=0;i<data['high_year_result'].length;i++){
                    if (data['high_year_result'][i][0] > 0){
                        var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['high_year_result'][i][1],
                            data['high_year_result'][i][2],
                            data['high_year_result'][i][3],
                            data['high_year_result'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['high_year_result'][i][1],
                            data['high_year_result'][i][2],
                            data['high_year_result'][i][3],
                            data['high_year_result'][i][4],
                        );
                    }
                    $("#last_year_high_temp_tbody").append(tr_html);
                }

                // 周 and 低
                for (var i=0;i<data['low_week_result'].length;i++){
                    if (data['low_week_result'][i][0] > 0){
                        var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['low_week_result'][i][1],
                            data['low_week_result'][i][2],
                            data['low_week_result'][i][3],
                            data['low_week_result'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['low_week_result'][i][1],
                            data['low_week_result'][i][2],
                            data['low_week_result'][i][3],
                            data['low_week_result'][i][4],
                        );
                    }
                    $("#last_week_low_temp_tbody").append(tr_html);
                }

                // 年 and 低
                for (var i=0;i<data['low_year_result'].length;i++){
                    if (data['low_year_result'][i][0] > 0){
                        var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['low_year_result'][i][1],
                            data['low_year_result'][i][2],
                            data['low_year_result'][i][3],
                            data['low_year_result'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['low_year_result'][i][1],
                            data['low_year_result'][i][2],
                            data['low_year_result'][i][3],
                            data['low_year_result'][i][4],
                        );
                    }
                    $("#last_year_low_temp_tbody").append(tr_html);
                }
            },
            error: function (xhr) {
                console.log("post outlet_water_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax outlet_water_temperature error：", e);
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
                $('#cost_saving_sum').text(data['charge_sum'] + '万元');
                cost_saving_chart.hideLoading();
                cost_saving_high_low_pie_chart.hideLoading();
                if (is_large){

                    cost_saving_chart.setOption(
                        {
                            title:  {
                                show: true,
                                text: '节省供暖费用',
                                left: 'center'
                            },
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
                            title: {
                                text: '节省供暖费用对比',
                                x: 'left',
                                y: 'top'
                            },
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
                }else {
                    cost_saving_chart.setOption(
                        {
                            title:  {
                                show: true,
                                text: '上月节省供暖费用',
                                left: 'center'
                            },
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
                            title: {
                                text: '上月节省供暖费用对比',
                                x: 'left',
                                y: 'top'
                            },
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
                }


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
    //heat_supply
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_heat_supply",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {

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
                    $("#water_temp_heat").remove();

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
                                    // max: 50,
                                    // min: 20
                                },
                                {
                                    gridIndex: 1,
                                    name: '温差(℃)',
                                    type: 'value',
                                    max: 8,
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
                                    // max: 50,
                                    // min: 20
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

try {
    //heat_provide_temperature
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_heat_provide_temperature",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                heat_well_heating_chart_chart.hideLoading();
                heat_pipe_network_heating_chart_chart.hideLoading();
                water_heat_pump_heat_production_chart_chart.hideLoading();
                high_temp_plate_exchange_heat_production_chart_chart.hideLoading();

                heat_well_heating_chart_chart.setOption(
                    get_heat_provide_options(
                        data['heat_well_heating'], '供热量', '日热力井供热与气温关系'
                    )
                );
                heat_pipe_network_heating_chart_chart.setOption(
                    get_heat_provide_options(
                        data['heat_pipe_network_heating'], '供热量', '日热力管网供热与气温关系'
                    )
                );
                water_heat_pump_heat_production_chart_chart.setOption(
                    get_heat_provide_options(
                        data['water_heat_pump_heat_production'], '制热量', '日水源热泵制热量与气温关系'
                    )
                );
                high_temp_plate_exchange_heat_production_chart_chart.setOption(
                    get_heat_provide_options(
                        data['high_temp_plate_exchange_heat_production'], '制热量', '日高温板换制热量与气温关系'
                    )
                );
            },
            error: function (xhr) {
                console.log("post heat_provide_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax heat_provide_temperature error：", e);
}

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
                                    name: '负荷量（kWh）',
                                    min: 0,
                                    // max: 7000,
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
                                    // max: 7000,
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
                                // max: 12
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


//*************尺寸适应************************************
resize_chart(
    [
        com_cop_chart_chart,
        com_cop_pie_chart,
        water_provide_temp_chart_chart,
        heat_well_heating_chart_chart,
        heat_pipe_network_heating_chart_chart,
        water_heat_pump_heat_production_chart_chart,
        high_temp_plate_exchange_heat_production_chart_chart,
        geothermal_wells_heat_provide_chart,
        cost_saving_chart,
        cost_saving_high_low_pie_chart,
        load_data_chart,
        load_pie_chart,
        supply_return_water_temp_chart,
        water_replenishment_chart,
    ]
);

