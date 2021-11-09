//***************获取元素*************************
var cost_saving_dom = document.getElementById("cost_saving");
var cost_saving_high_low_pie_dom = document.getElementById("cost_saving_high_low_pie");


//***************初始化图表***********************************
var cost_saving_chart = echarts.init(cost_saving_dom);
var cost_saving_high_low_pie_chart = echarts.init(cost_saving_high_low_pie_dom);

loading_all([cost_saving_chart, cost_saving_high_low_pie_chart]);

//*************定义数据************************************
try {
    console.log("xxx", start, end, last_month_date, start_limit, end_limit);
    //sub_cost_saving
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
                var charge_sum_now = $("#charge_sum_title").text().trim();

                $("#charge_sum_title").text(`${charge_sum_now}（${data["charge_sum"]}万元）`);

                cost_saving_chart.hideLoading();
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

                cost_saving_high_low_pie_chart.hideLoading();
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
                console.log("post sub_cost_saving error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax sub_cost_saving error：", e);
}

resize_chart([cost_saving_chart, cost_saving_high_low_pie_chart]);





