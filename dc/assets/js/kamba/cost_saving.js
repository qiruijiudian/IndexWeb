var cost_saving_dom = document.getElementById("cost_saving");

var cost_saving_chart = echarts.init(cost_saving_dom);

loading_all([cost_saving_chart]);

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
                if (is_large){
                    $('#cost_saving_sum').text('节省供暖费用（总计：' + data['cost_saving_total'] + '万元）');
                }else {
                    $('#cost_saving_sum').text('上月节省供暖费用（总计：' + data['cost_saving_total'] + '万元）');
                }

                cost_saving_chart.hideLoading();
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


resize_chart([cost_saving_chart]);