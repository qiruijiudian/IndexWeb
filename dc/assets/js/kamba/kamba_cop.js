//***************获取元素*************************

var kamba_system_cop_dom = document.getElementById("kamba_system_cop_pie");
var kamba_system_cop_chart_dom = document.getElementById("kamba_system_cop_chart");
var kamba_wshp_cop_dom = document.getElementById("kamba_wshp_cop_pie");
var kamba_wshp_cop_chart_dom = document.getElementById("kamba_wshp_cop_chart");


//***************初始化图表***********************************

var kamba_system_cop_chart = echarts.init(kamba_system_cop_dom);
var kamba_system_cop_chart_chart = echarts.init(kamba_system_cop_chart_dom);
var kamba_wshp_cop_chart = echarts.init(kamba_wshp_cop_dom);
var kamba_wshp_cop_chart_chart = echarts.init(kamba_wshp_cop_chart_dom);

loading_all(
    [
        kamba_system_cop_chart,
        kamba_system_cop_chart_chart,
        kamba_wshp_cop_chart,
        kamba_wshp_cop_chart_chart
    ]
);


//*************定义数据************************************
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
}; //cop数据通用函数

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
                kamba_system_cop_chart_chart.hideLoading();
                kamba_system_cop_chart.setOption(
                    get_cop_pie_options(data['kamba_system_cop'][data['kamba_system_cop'].length-1])
                );


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
                if (!data["status"].includes("正常")) $("#wshp_cop_title").text(`系统综合COP（${data["status"]}）`);
                kamba_wshp_cop_chart.hideLoading();
                kamba_wshp_cop_chart_chart.hideLoading();
                kamba_wshp_cop_chart.setOption(
                    get_cop_pie_options(data['kamba_wshp_cop'][data['kamba_wshp_cop'].length-1])
                );

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




resize_chart(
    [
        kamba_system_cop_chart,
        kamba_system_cop_chart_chart,
        kamba_wshp_cop_chart,
        kamba_wshp_cop_chart_chart
    ]
);

window.onresize = function (){
    kamba_system_cop_chart.resize();
    kamba_system_cop_chart_chart.resize();
    kamba_wshp_cop_chart.resize();
    kamba_wshp_cop_chart_chart.resize();
};




