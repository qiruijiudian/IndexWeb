// 折线图

options = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
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
            data: cost_time,
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
            data: cost_saving
        },
        {
            name: '耗电量',
            type: 'bar',
            yAxisIndex: 1,
            data: power_consumption
        }
    ]
};