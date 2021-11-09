//***************获取元素*************************
var f2_cop_dom = document.getElementById("f2_cop_chart");
var f2_cop_pie_dom = document.getElementById("f2_cop_pie");
var f3_cop_dom = document.getElementById("f3_cop_chart");
var f3_cop_pie_dom = document.getElementById("f3_cop_pie");
var f4_cop_dom = document.getElementById("f4_cop_chart");
var f4_cop_pie_dom = document.getElementById("f4_cop_pie");
var f5_cop_dom = document.getElementById("f5_cop_chart");
var f5_cop_pie_dom = document.getElementById("f5_cop_pie");
var com_cops = ["com_cop_2", "com_cop_3", "com_cop_4", "com_cop_5"];
//***************初始化图表***********************************

var f2_cop_chart = echarts.init(f2_cop_dom);
var f2_cop_pie = echarts.init(f2_cop_pie_dom);
var f3_cop_chart = echarts.init(f3_cop_dom);
var f3_cop_pie = echarts.init(f3_cop_pie_dom);
var f4_cop_chart = echarts.init(f4_cop_dom);
var f4_cop_pie = echarts.init(f4_cop_pie_dom);
var f5_cop_chart = echarts.init(f5_cop_dom);
var f5_cop_pie = echarts.init(f5_cop_pie_dom);

loading_all([f2_cop_chart, f2_cop_pie, f3_cop_chart, f3_cop_pie, f4_cop_chart, f4_cop_pie, f5_cop_chart, f5_cop_pie]);

//*************定义数据************************************
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
    //sub_com_cop
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_sub_com_cop",
                "start": start,
                "end": end,
            },
            cache: true,
            success: function (data) {
                for (var i=0;i<data["status"].length;i++){
                    if (!data["status"][i].includes("正常")){
                        var now_text = $(`#${com_cops[i]}`).text().trim();
                        $(`#${com_cops[i]}`).text(`${now_text}` + `（${data["status"][i]}）`);
                    }
                }
                f2_cop_pie.hideLoading();
                f2_cop_pie.setOption(
                    get_cop_pie_options(data["f2_cop"][data["f2_cop"].length-1])
                );
                f2_cop_chart.hideLoading();
                f2_cop_chart.setOption(
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
                            right: 50,
                            // height: '35%'
                        }, {
                            left: 50,
                            right: 50,
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
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'COP',
                                type: 'line',
                                symbolSize: 5,
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#32CD32'
                                        }
                                    }
                                },
                                data: data['f2_cop']
                            },
                            {
                                name: 'Target Miniumum',
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
                                data: data['target_minimum']
                            },
                            {
                                name: 'Low Threshold',
                                type: 'line',
                                symbolSize: 5,
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
                f2_cop_chart.getZr().on('click', function (params) {
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (f2_cop_chart.containPixel('grid',pointInPixel)) {
                        /*此处添加具体执行代码*/

                        var pointInGrid=f2_cop_chart.convertFromPixel({seriesIndex:0},pointInPixel);
                        //X轴序号
                        var xIndex=pointInGrid[0];

                        //获取当前图表的option
                        var op=f2_cop_chart.getOption();

                        //获得图表中我们想要的数据
                        var month = op.xAxis[0].data[xIndex];
                        var value = op.series[0].data[xIndex];
                        var tmp_options = get_cop_pie_options(value);
                        f2_cop_pie.setOption(tmp_options);
                        console.log(month+"："+value);

                    }
                });


                f3_cop_pie.hideLoading();
                f3_cop_pie.setOption(
                    get_cop_pie_options(data["f3_cop"][data["f3_cop"].length-1])
                );
                f3_cop_chart.hideLoading();
                f3_cop_chart.setOption(
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
                            right: 50,
                            // height: '35%'
                        }, {
                            left: 50,
                            right: 50,
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
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'COP',
                                type: 'line',
                                symbolSize: 5,
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#32CD32'
                                        }
                                    }
                                },
                                data: data['f3_cop']
                            },
                            {
                                name: 'Target Miniumum',
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
                                data: data['target_minimum']
                            },
                            {
                                name: 'Low Threshold',
                                type: 'line',
                                symbolSize: 5,
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
                f3_cop_chart.getZr().on('click', function (params) {
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (f3_cop_chart.containPixel('grid',pointInPixel)) {
                        /*此处添加具体执行代码*/

                        var pointInGrid=f3_cop_chart.convertFromPixel({seriesIndex:0},pointInPixel);
                        //X轴序号
                        var xIndex=pointInGrid[0];

                        //获取当前图表的option
                        var op=f3_cop_chart.getOption();

                        //获得图表中我们想要的数据
                        var month = op.xAxis[0].data[xIndex];
                        var value = op.series[0].data[xIndex];
                        var tmp_options = get_cop_pie_options(value);
                        f3_cop_pie.setOption(tmp_options);
                        console.log(month+"："+value);

                    }
                });


                f4_cop_pie.hideLoading();
                f4_cop_pie.setOption(
                    get_cop_pie_options(data["f4_cop"][data["f4_cop"].length-1])
                );

                f4_cop_chart.hideLoading();
                f4_cop_chart.setOption(
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
                            right: 50,
                            // height: '35%'
                        }, {
                            left: 50,
                            right: 50,
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
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'COP',
                                type: 'line',
                                symbolSize: 5,
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#32CD32'
                                        }
                                    }
                                },
                                data: data['f4_cop']
                            },
                            {
                                name: 'Target Miniumum',
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
                                data: data['target_minimum']
                            },
                            {
                                name: 'Low Threshold',
                                type: 'line',
                                symbolSize: 5,
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
                f4_cop_chart.getZr().on('click', function (params) {
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (f4_cop_chart.containPixel('grid',pointInPixel)) {
                        /*此处添加具体执行代码*/

                        var pointInGrid=f4_cop_chart.convertFromPixel({seriesIndex:0},pointInPixel);
                        //X轴序号
                        var xIndex=pointInGrid[0];

                        //获取当前图表的option
                        var op=f4_cop_chart.getOption();

                        //获得图表中我们想要的数据
                        var month = op.xAxis[0].data[xIndex];
                        var value = op.series[0].data[xIndex];
                        var tmp_options = get_cop_pie_options(value);
                        f4_cop_pie.setOption(tmp_options);
                        console.log(month+"："+value);

                    }
                });


                f5_cop_pie.hideLoading();
                f5_cop_pie.setOption(
                    get_cop_pie_options(data["f5_cop"][data["f5_cop"].length-1])
                );
                f5_cop_chart.hideLoading();
                f5_cop_chart.setOption(
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
                            right: 50,
                            // height: '35%'
                        }, {
                            left: 50,
                            right: 50,
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
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'COP',
                                type: 'line',
                                symbolSize: 5,
                                hoverAnimation: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#32CD32'
                                        }
                                    }
                                },
                                data: data['f5_cop']
                            },
                            {
                                name: 'Target Miniumum',
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
                                data: data['target_minimum']
                            },
                            {
                                name: 'Low Threshold',
                                type: 'line',
                                symbolSize: 5,
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
                f5_cop_chart.getZr().on('click', function (params) {
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (f5_cop_chart.containPixel('grid',pointInPixel)) {
                        /*此处添加具体执行代码*/

                        var pointInGrid=f5_cop_chart.convertFromPixel({seriesIndex:0},pointInPixel);
                        //X轴序号
                        var xIndex=pointInGrid[0];

                        //获取当前图表的option
                        var op=f5_cop_chart.getOption();

                        //获得图表中我们想要的数据
                        var month = op.xAxis[0].data[xIndex];
                        var value = op.series[0].data[xIndex];
                        var tmp_options = get_cop_pie_options(value);
                        f5_cop_pie.setOption(tmp_options);
                        console.log(month+"："+value);

                    }
                });

            },
            error: function (xhr) {
                console.log("post sub_com_cop error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax sub_com_cop error：", e);
}

resize_chart([f2_cop_chart, f2_cop_pie, f3_cop_chart, f3_cop_pie, f4_cop_chart, f4_cop_pie, f5_cop_chart, f5_cop_pie]);
