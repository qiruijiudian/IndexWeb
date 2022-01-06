/*自定义功能函数
get_cop_pie_options(value)
    按照传入的value进行数据设置，返回设置好的option配置字典

get_water_provider_options(data, hint, delta_hint)
    同上，hint项为提示文字

get_pieces(data)
    同上，结果供热力图图表，将分组后数据中的color与其他属性绑定

get_chart(id)
    按id值初始化图表

data_render(chart_obj, request_data, option, time_id, request_url=kamba_url, request_type='POST')
    渲染数据，生成图表

format()
    实现python中format函数的功能
 */

function get_cop_pie_options(value){
    // 按照传入的value进行数据设置，返回设置好的option配置字典
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
    // 按照传入的data进行数据设置，返回设置好的option配置字典，hint项为提示文字
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


function get_pieces(data){
    // 返回供热力图使用的颜色分组数据列表配置
    let res = [];
    for(let i=0;i<data.length;i++){
        if (typeof (data[i]["lt"]) === "string"){
            res.push({gte: data[i]["gte"], color: data[i]["color"]});
        }else {
            res.push({gte: data[i]["gte"], lt: data[i]["lt"], color: data[i]["color"]});
        }
    }
    return res;
}


function get_chart(id){
    // 初始化图表
    // 获取元素
    var tmp_dom = document.getElementById(id);

    // 初始化图表
    return echarts.init(tmp_dom);
}


function get_common_option(data_values, data_option, data_mapping) {
    for(let key in data_mapping){
        let key_data = data_mapping[key];
        if (key_data["type"] === "arr"){
            for (let i=0;i<key_data["values"].length;i++){
                for (let j=0;j<key_data["obj"].length;j++){
                    let modify_key = key_data["obj"][j];
                    key_data["values"][i][modify_key] = data_values[key_data["values"][i][modify_key]]
                }
            }

        }else if (key_data["type"] === "obj"){
            for (let key2 in key_data["obj"]){
                for (let j=0;j<key_data["obj"].length;j++){
                    let modify_key = key_data["obj"][j];
                    key_data["values"][modify_key] = data_values[key_data["values"][modify_key]]
                }
            }
        }

        data_option[key] = data_mapping[key]["values"];

    }
    return data_option;
}


function set_option(obj, obj_data, obj_option, obj_mapping, dataZoom=1) {
    obj.hideLoading();
    let option = get_common_option(obj_data, obj_option, obj_mapping);
    if (is_large){
        if (!option.hasOwnProperty("dataZoom")){
            if (dataZoom === 1){
                option["dataZoom"] = [{show: true, realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]}];
                option["toolbox"]["feature"]["dataZoom"] = {yAxisIndex: 'none'};
            }else if (dataZoom === 2){
                option["dataZoom"] = [
                    {show: true, realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]},
                    {type: 'inside', realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]}
                ];

                option["toolbox"]["feature"]["dataZoom"] = {yAxisIndex: 'none'};
            }
        }
    }

    obj.setOption(option);

}


function data_render(chart_objs, request_data, option_datas, option_mappings, time_ids, dataZooms=[1], request_url=kamba_url, request_type='POST'){
    // 数据等待
    try {
        $.ajax(
            {
                url: request_url,
                type: request_type,
                data: request_data,
                cache: true,
                success: function (data) {
                    // TODO 时间设定 按照data返回值中的time_data
                    // set_time_range(time_id, request_data["start"], end["end"]);

                    for (let i=0;i<chart_objs.length;i++){
                        set_option(chart_objs[i], data, option_datas[i], option_mappings[i], dataZooms[i])
                    }
                }
            }
        );

    }catch (e) {
        console.log(chart_obj, " - 对象数据渲染出错，访问路由：", request_url, "错误详情：", e);
    }

}


String.prototype.format = function () {
    // 类似python中的format效果
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};

// --------------------------完成自定义函数---------------------------------


// 设定标题
if (is_large){
    $("#max_load_title").text("最大负荷");
    $("#min_load_title").text("最小负荷");
    $("#kamba_cost_saving_title").text("节省供暖总费用");
}

// --------------------------完成 设定标题---------------------------------



// ---------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------图表渲染------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

/* 蓄热水池分时可用低温/高温热量 & 蓄热水池可用高温热量及电锅炉替换供热天数
key:
    api_heat_storage_heat
by:
    d
obj:
    pool_available_heat_chart
    high_heat_equal_supply_days_chart
 */
var pool_available_heat_chart = get_chart("pool_available_heat");
var high_heat_equal_supply_days_chart = get_chart("high_heat_equal_supply_days");

// 数据渲染
data_render(
    request_data={"key": "api_heat_storage_heat", "start": start, "end": end, "by": 'd'},
    time_ids=["pool_available_heat_heat_date", "high_heat_equal_supply_days_heat_date"],
    funcs=[false, false],
    chart_objs=[pool_available_heat_chart, high_heat_equal_supply_days_chart],
    option_datas=[
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
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '热量',
                    min: 0,
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} kWh'
                    }
                }
            ],
            series: []
        },
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
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['2000kW电锅炉供热天数', '高温热量']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '供热天数',
                    min: 0,
                    position: 'left',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} 天'
                    }
                },
                {
                    type: 'value',
                    name: '高温热量',
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
            series: []
        }
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '时间段',
                        data: 'time_data',
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval:0,
                            rotate:40
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '低温热量',
                        type: 'bar',
                        stack: '可用热量',
                        data: 'low_heat_total'
                    },
                    {
                        name: '高温热量',
                        type: 'bar',
                        stack: '可用热量',
                        data: 'high_heat_total'
                    }
                ]
            }
        },
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '时间段',
                        data: 'time_data',
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
                ]
            },

            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '2000kW电锅炉供热天数',
                        type: 'bar',
                        data: 'heat_supply_days'
                    },
                    {
                        name: '高温热量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'high_heat_total'
                    }
                ]
            }
        },
    ],
    dataZooms=[1, 1]
);

// ---------------------------------完成蓄热水池图表----------------------------------------

/* 系统综合COP
key:
    api_system_cop
by:
    h
obj:
    kamba_system_cop_chart
    kamba_system_cop_chart_chart
 */


// 获取图像元素
var kamba_system_cop_dom = document.getElementById("kamba_system_cop_pie");
var kamba_system_cop_chart_dom = document.getElementById("kamba_system_cop_chart");

// 初始化图表
var kamba_system_cop_chart = echarts.init(kamba_system_cop_dom);
var kamba_system_cop_chart_chart = echarts.init(kamba_system_cop_chart_dom);

// 数据渲染
data_render(
    request_data={"key": "api_system_cop", "start": start, "end": end, "by": 'h'},
    time_ids=["com_cop_title", "sys_cop_title"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {return get_cop_pie_options(data['kamba_system_cop'][data['kamba_system_cop'].length-1])}
        },
        false
    ],
    chart_objs=[kamba_system_cop_chart, kamba_system_cop_chart_chart],
    option_datas=[
        false,
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
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
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
            xAxis: [],
            yAxis: [],
            series: []
        }
    ],
    option_mappings=[
        false,
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'COP',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#32CD32'
                                }
                            }
                        },
                        data: 'kamba_system_cop'
                    },
                    {
                        name: 'Target Miniumum',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#0000FF'
                                }
                            }
                        },
                        data: 'target_minimum'
                    },
                    {
                        name: 'Low Threshold',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#FF0000'
                                }
                            }
                        },
                        data: 'low_threshold'
                    }
                ]
            },
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        name: 'COP',
                        type: 'value',
                        max: 'max_cop'
                    }
                ]
            }
        }
    ],
    dataZooms=[false, 1]

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

// ----------------------------------完成系统综合COP图表----------------------------------

/* 水源热泵COP
key:
    api_wshp_cop
by:
    h
obj:
    kamba_wshp_cop_chart
    kamba_wshp_cop_chart_chart
 */

// 获取图像元素
var kamba_wshp_cop_dom = document.getElementById("kamba_wshp_cop_pie");
var kamba_wshp_cop_chart_dom = document.getElementById("kamba_wshp_cop_chart");

// 初始化图表
var kamba_wshp_cop_chart = echarts.init(kamba_wshp_cop_dom);
var kamba_wshp_cop_chart_chart = echarts.init(kamba_wshp_cop_chart_dom);

// 数据渲染
data_render(
    request_data={"key": "api_wshp_cop", "start": start, "end": end, "by": 'h'},
    time_ids=["wshp_cop_title", "wp_cop_title"],
    funcs=[
        {
            'type': 'option',
            'func': function (data) {return get_cop_pie_options(data['kamba_wshp_cop'][data['kamba_wshp_cop'].length-1])}
        },
        false
    ],
    chart_objs=[kamba_wshp_cop_chart, kamba_wshp_cop_chart_chart],
    option_datas=[
        false,
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
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
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
            xAxis: [],
            yAxis: [],
            series: []
        }
    ],
    option_mappings=[
        false,
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'COP',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#32CD32'
                                }
                            }
                        },
                        data: 'kamba_wshp_cop'
                    },
                    {
                        name: 'Target Miniumum',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#0000FF'
                                }
                            }
                        },
                        data: 'target_minimum'
                    },
                    {
                        name: 'Low Threshold',
                        type: 'line',
                        symbol: 'none',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#FF0000'
                                }
                            }
                        },
                        data: 'low_threshold'
                    }
                ]
            },
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        name: 'COP',
                        type: 'value',
                        max: 'max_cop'
                    }
                ]
            }
        }
    ],
    dataZooms=[1, 1]
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

// -------------------------------------------------完成水源热泵COP图表--------------------


/* 水池温度情况 表格设定
key:
    api_pool_temperature
by:
    h
obj:
    tbody[id="tbody_pool"]
 */




// 数据渲染
data_render(
    request_data={"key": "api_pool_temperature", "end": end, "by": 'h'},
    time_ids=["pool_temp_status"],
    funcs=[
        {
            "type": "p_function",
            "func": function (data) {
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
            }
        }
    ]
);



// -----------------------------------------------------完成水池温度表格-----------------------------


/* 水池温度情况 热力图
key:
    api_pool_temperature
by:
    h
obj:
    tbody[id="tbody_pool"]
 */

// 获取图像元素
var pool_temp_dom = document.getElementById("heat_map_of_temp");

// 初始化图表
var pool_temp_chart = echarts.init(pool_temp_dom);



data_render(
    request_data={"key": "api_pool_temperature", "start": start, "end": end, "by": 'h', "heat_map": true},
    time_ids=["heat_map_title_of_temp"],
    funcs=undefined,
    chart_objs=[pool_temp_chart],
    option_datas=[{
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '60%',
            top: '10%',
            left: "10%",
            right: "10%"
        },
        xAxis: {},
        yAxis: {},
        visualMap: {},
        series: []
    }],
    option_mappings=[
        {
            xAxis: {
                "type": "obj",
                "obj": ["data"],
                "values": {
                    type: 'category',
                    // data: data["sizes"],
                    data: "heat_time_period",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitArea: {
                        show: true,
                    }
                },

            },
            yAxis: {
                'type': 'obj',
                'obj': ['data'],
                'values': {
                    type: 'category',
                    // data: data["heat_time_period"],
                    data: "sizes",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitArea: {
                        show: true,
                    }
                },
            },
            visualMap: {
                'type': 'obj',
                'obj': ['pieces'],
                'values': {
                    pieces: function (data){return get_pieces(data["pieces"]);},
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '10%'
                }

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '水池温度',
                    type: 'heatmap',
                    data: "values",
                    label: {
                        show: true
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },]

            }


        }
    ],
    dataZooms=[false]
);

// ----------------------------------------完成 水池温度情况 热力图-----------------------------------------------------

/* 太阳能集热
key:
    api_solar_collector
by:
    h
obj:
    last_week_solar_collector_chart
 */

// 获取图像元素
var last_week_solar_collector_dom = document.getElementById("last_week_solar_collector");

// 初始化图表
var last_week_solar_collector_chart = echarts.init(last_week_solar_collector_dom);

data_render(
    request_data={"key": "api_solar_collector", "start": start, "end": end, "by": 'h'},
    time_ids=["solar_heat_collector_title"],
    funcs=undefined,
    chart_objs=[last_week_solar_collector_chart],
    option_datas=[{
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
        xAxis: [],
        yAxis: [
            {
                name: '太阳能集热量',
                type: 'value',
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value} kWh'
                }
//            max: 12
            }
        ],
        series: []
    }],
    option_mappings=[
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }
                ],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
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
                    data: 'values'
                },]

            }


        }
    ],
);


// ------------------------------------------------------------------------------------------------------------

/* 补水情况
key:
    api_hydration
by:
    h
obj:
    last_week_heat_storage_replenishment_chart
    last_week_heat_water_replenishment_chart
    last_week_solar_side_replenishment_chart
 */

// 获取图像元素
var last_week_heat_storage_replenishment_dom = document.getElementById("last_week_heat_storage_replenishment");
var last_week_heat_water_replenishment_dom = document.getElementById("last_week_heat_water_replenishment");
var last_week_solar_side_replenishment_dom = document.getElementById("last_week_solar_side_replenishment");

// 初始化图表
var last_week_heat_storage_replenishment_chart = echarts.init(last_week_heat_storage_replenishment_dom);
var last_week_heat_water_replenishment_chart = echarts.init(last_week_heat_water_replenishment_dom);
var last_week_solar_side_replenishment_chart = echarts.init(last_week_solar_side_replenishment_dom);

data_render(
    request_data={"key": "api_hydration", "start": start, "end": end, "by": 'h'},
    time_ids=["heat_storage_rep_title", "heat_rep_title", "solar_rep_title"],
    funcs=undefined,
    chart_objs=[last_week_heat_storage_replenishment_chart, last_week_heat_water_replenishment_chart, last_week_solar_side_replenishment_chart],
    option_datas=[
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
            }, {
                left: 80,
                right: 80,
                top: '55%',
            }],
            xAxis: [],
            yAxis: [
                {
                    name: '蓄热水池补水量',
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} m³'
                    }
                }
            ],
            series: []
        },
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
            xAxis: [],
            yAxis: [
                {
                    name: '补水量',
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} m³'
                    }
                }
            ],
            series: []
        },
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
            xAxis: [],
            yAxis: [
                {
                    name: '补水量',
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} m³'
                    }
                }
            ],
            series: []
        }

    ],
    option_mappings=[
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    type: 'category',
                    name: '日期',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: 'time_data'
                }],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
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
                    data: 'heat_storage_tank_replenishment'
                },]

            }
        },
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    type: 'category',
                    name: '日期',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: 'time_data'
                }],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '供热端补水量',
                    type: 'bar',
                    data: 'heat_water_replenishment'
                },
                    {
                        name: '供热端补水限值',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        data: 'heat_water_replenishment_limit'
                    }]

            }
        },
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    type: 'category',
                    name: '日期',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: 'time_data'
                }],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        name: '太阳能侧补水量',
                        type: 'bar',
                        data: 'solar_side_replenishment'
                    },
                    {
                        name: '太阳能矩阵补水限值',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        data: 'solar_matrix_replenishment_limit'
                    },
                ]

            }
        }
    ],
    dataZooms=[1, 1, 1]
);


// ------------------------------------------------------------------------------------------------------------

/* 太阳能矩阵供回水温度

key:
    api_solar_matrix_supply_and_return_water_temperature
by:
    h
obj:
    solar_matrix_supply_and_return_water_temp_chart
 */


// 获取图像元素
var solar_matrix_supply_and_return_water_temp_dom = document.getElementById("solar_matrix_supply_and_return_water_temp");

// 初始化图表
var solar_matrix_supply_and_return_water_temp_chart = echarts.init(solar_matrix_supply_and_return_water_temp_dom);


data_render(
    request_data={"key": "api_solar_matrix_supply_and_return_water_temperature", "start": start, "end": end, "by": 'h'},
    time_ids=["solar_matrix_title"],
    funcs=undefined,
    chart_objs=[solar_matrix_supply_and_return_water_temp_chart],
    option_datas=[
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
            xAxis: [],
            yAxis: [
                {
                    name: '温度(℃)',
                    type: 'value'
                }
            ],
            series: []
        }

    ],
    option_mappings=[
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    type: 'category',
                    name: '日期',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: 'time_data'
                }],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '太阳能矩阵供水温度',
                    type: 'line',
                    data: 'solar_matrix_supply_water_temp'
                },
                    {
                        name: '太阳能矩阵回水温度',
                        type: 'line',
                        symbolSize: 5,
                        hoverAnimation: false,
                        data: 'solar_matrix_return_water_temp'
                    }]

            }
        }

    ],
);



// ------------------------------------------------------------------------------------------------------------


/* 负荷情况

key:
    api_load
by:
    d
obj:
    load_by_days_chart
 */

// 获取图像元素
var load_by_days_dom = document.getElementById("load_by_days");

// 初始化图表
var load_by_days_chart = echarts.init(load_by_days_dom);


data_render(
    request_data={"key": "api_load", "start": start, "end": end, "by": 'd'},
    time_ids=["load_title"],
    funcs=undefined,
    chart_objs=[load_by_days_chart],
    option_datas=[
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
            xAxis: [],
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
            series: []
        }

    ],
    option_mappings=[
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    type: 'category',
                    name: '日期',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: 'time_data'
                }],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '最小负荷',
                    type: 'line',
                    data: 'min_loads',
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
                        data: 'avg_loads'
                    },
                    {
                        name: '最大负荷',
                        type: 'line',
                        yAxisIndex: 0,
                        data: 'max_loads'
                    }]

            }
        }

    ],
);

// ---------------------------------------完成 负荷量情况------------------------------------------

/* 末端供/回水温度与气温关系

key:
    api_end_supply_and_return_water_temp
by:
    d
obj:
    supply_and_return_water_temp_diff_with_temp_chart
    supply_water_temp_with_temp_chart
    return_water_temp_with_temp_chart
    end_supply_and_return_water_temp_chart
 */


// 获取图像元素
var supply_and_return_water_temp_diff_with_temp_dom = document.getElementById("supply_and_return_water_temp_diff_with_temp");
var supply_water_temp_with_temp_dom = document.getElementById("supply_water_temp_with_temp");
var return_water_temp_with_temp_dom = document.getElementById("return_water_temp_with_temp");

var end_supply_and_return_water_temp_dom = document.getElementById("end_supply_and_return_water_temp");

// 初始化图表
var supply_and_return_water_temp_diff_with_temp_chart = echarts.init(supply_and_return_water_temp_diff_with_temp_dom);
var supply_water_temp_with_temp_chart = echarts.init(supply_water_temp_with_temp_dom);
var return_water_temp_with_temp_chart = echarts.init(return_water_temp_with_temp_dom);

var end_supply_and_return_water_temp_chart = echarts.init(end_supply_and_return_water_temp_dom);


data_render(
    request_data={"key": "api_end_supply_and_return_water_temp", "start": start, "end": end, "by": 'd'},
    time_ids=["re_with_temp_title", "sup_with_temp_title", "diff_with_temp_title", "diff_temp"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['end_supply_and_return_water_temp_diff_with_temp'], data['last_end_supply_and_return_water_temp_diff_with_temp']], '末端供回水温差', data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['supply_water_temp_with_temp'], data['last_supply_water_temp_with_temp']], '末端供水温度', data["hint"])
            }
        },
        {
            "type": "option",
            "func": function (data) {
                return  get_water_provider_options([data['return_water_temp_with_temp'], data['last_return_water_temp_with_temp']], '末端回水温度', data["hint"])
            }
        },
        false
    ],
    chart_objs=[supply_and_return_water_temp_diff_with_temp_chart, supply_water_temp_with_temp_chart, return_water_temp_with_temp_chart, end_supply_and_return_water_temp_chart],
    option_datas=[
        false, false, false,
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
            xAxis: [],
            yAxis: [
                {
                    name: '温度(℃)',
                    type: 'value'
                },
                {
                    gridIndex: 1,
                    name: '温差(℃)',
                    type: 'value',
                    inverse: true
                }
            ],
            series: []
        }

    ],
    option_mappings=[
        false, false, false,
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data',
                        position: 'top'
                    }
                ],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        name: '平均供水温度',
                        type: 'line',
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'end_supply_water_temp'
                    },
                    {
                        name: '平均回水温度',
                        type: 'line',
                        symbolSize: 8,
                        hoverAnimation: false,
                        data: 'end_return_water_temp',
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
                        data: 'end_supply_and_return_water_temp_diff'
                    }
                ]
            }
        }

    ],
    dataZooms=[false, false, false, 2]
);


// ---------------------------------------完成 末端供/回水温度与气温关系------------------------------------------

/* 末端供/回水温度与气温关系 年度对照

key:
    api_end_supply_and_return_water_temp
by:
    y
obj:
    last_year_supply_return_water_temp_chart
 */

// 获取图像元素
var last_year_supply_return_water_temp_dom = document.getElementById("last_year_supply_return_water_temp");


// 初始化图表
var last_year_supply_return_water_temp_chart = echarts.init(last_year_supply_return_water_temp_dom);


data_render(
    request_data={"key": "api_end_supply_and_return_water_temp", "start": start, "end": end, "by": 'y'},
    time_ids=["last_year_supply_return_water_temp_time_delta"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                if (is_large){
                    return get_common_option(
                        data,
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
                                    let series_name = ['供水温度', '回水温度', '温差', '去年供水温度', '去年回水温度', '去年温差'];
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
                            series: []
                        },
                        {
                            'series': {
                                "type": "arr",
                                "obj": ["data"],
                                "values": [
                                    {
                                        name: '供水温度',
                                        type: 'scatter',
                                        symbolSize: 8,
                                        data: 'end_supply_water_temp',
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
                                        data: 'end_return_water_temp',
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
                                        data: 'end_supply_and_return_water_temp_diff',
                                        markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                        markLine: { data: [{ type: 'average', name: '平均值' }] }
                                    },
                                    {
                                        name: '去年供水温度',
                                        type: 'scatter',
                                        symbolSize: 8,
                                        data: 'last_end_supply_water_temp',
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
                                        data: 'last_end_return_water_temp',
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
                                        data: 'last_end_supply_and_return_water_temp_diff',
                                        markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                        markLine: { data: [{ type: 'average', name: '平均值' }] }
                                    },
                                ]
                            }
                        }
                    );
                }else {

                    return get_common_option(
                        data,
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
                                    let series_name = ['供水温度', '回水温度', '温差', '去年供水温度', '去年回水温度', '去年温差'];
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
                        },
                        {
                            'series': {
                                'type': 'arr',
                                'obj': ['data'],
                                'values': [
                                    {
                                        name: '供水温度',
                                        type: 'scatter',
                                        symbolSize: 8,
                                        data: 'end_supply_water_temp',
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
                                        data: 'end_return_water_temp',
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
                                        data: 'end_supply_and_return_water_temp_diff',
                                        markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                        markLine: { data: [{ type: 'average', name: '平均值' }] }
                                    }
                                ]
                            }
                        }
                    );

                }
            }
        }
    ],
    chart_objs=[last_year_supply_return_water_temp_chart]
);

// ----------------------------------------完成 末端供/回水温度与气温关系 年度对照---------------------------------------------

/* CO2减排量与耗电量 & CO2减排量等效种植树木数量

key:
    co2_emission
by:
    y
obj:
    co2_emission_chart
    co2_equal_chart
 */

// 获取图像元素
var co2_emission_dom= document.getElementById("co2_emission_reduction");
var co2_equal_dom = document.getElementById("co2_equal_num");


// 初始化图表
var co2_emission_chart= echarts.init(co2_emission_dom);
var co2_equal_chart = echarts.init(co2_equal_dom);


data_render(
    request_data={"key": "co2_emission", "start": last_month_date, "end": end, "by": 'd'},
    time_ids=["co2_emission_reduction_title", "co2_equal_num_title"],
    funcs=[false, false],
    chart_objs=[co2_emission_chart, co2_equal_chart],
    option_datas=[
        {
            grid: {
                right: 110,
                left: 110
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
                data: ['co2减排量', '耗电量']
            },
            xAxis: [],
            yAxis: [],
            series: []
        },
        {
            grid: {
                right: 110,
                left: 110
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
                data: ['co2减排量', '等效种植树木数量']
            },
            xAxis: [],
            yAxis: [],
            series: []
        }
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '时间段',
                        data: 'time_data',
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
                ]
            },
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        type: 'value',
                        name: '减排量',
                        min: 0,
                        max: 'max',
                        position: 'left',
                        axisLine: {
                            show: true

                        },
                        axisLabel: {
                            formatter: '{value} Kg'
                        }
                    },
                    {
                        type: 'value',
                        name: '耗电量',
                        min: 0,
                        position: 'right',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'co2减排量',
                        type: 'line',
                        smooth: true,
                        data: 'co2_emission_reduction',
                        itemStyle:{
                            normal: {
                                color: '#7083db',
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: '#7083db',
                                opacity: 0.16,
                            },
                        },
                    },
                    {
                        name: '耗电量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'power_consume',
                        itemStyle:{
                            normal: {
                                color: '#ff6600',
                            },
                        },
                    }
                ]
            }
        },
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '时间段',
                        data: 'time_data',
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
                ]
            },
            'yAxis': {
                'type': 'arr',
                'obj': ['max'],
                'values': [
                    {
                        type: 'value',
                        name: '减排量',
                        max: "max",
                        position: 'left',
                        axisLine: {
                            show: true

                        },
                        axisLabel: {
                            formatter: '{value} Kg'
                        }
                    },
                    {
                        type: 'value',
                        name: '等效种植树木数量',
                        position: 'right',
                        axisLine: {
                            show: true

                        },
                        axisLabel: {
                            formatter: '{value} 棵'
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: 'co2减排量',
                        type: 'line',
                        smooth: true,
                        data: 'co2_emission_reduction',
                        itemStyle:{
                            normal: {
                                color: '#7083db',
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: '#7083db',
                                opacity: 0.16,
                            },
                        },
                    },

                    {
                        name: '等效种植树木数量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'co2_equal_num'
                    }
                ]
            }
        }
    ],
    dataZooms=[false, false]
);


// ----------------------------------------完成 CO2减排量与耗电量 & CO2减排量等效种植树木数量---------------------------------------------

/* 太阳能集热分析

key:
    api_solar_heat_supply
by:
    d
obj:
    last_week_solar_collector_by_days_chart
 */


// 获取图像元素
var last_week_solar_collector_by_days_dom = document.getElementById("last_week_solar_collector_by_days");


// 初始化图表
var last_week_solar_collector_by_days_chart = echarts.init(last_week_solar_collector_by_days_dom);


data_render(
    request_data={"key": "api_solar_heat_supply", "start": start, "end": end, "by": 'd'},
    time_ids=["solar_analysis_title"],
    funcs=undefined,
    chart_objs=[last_week_solar_collector_by_days_chart],
    option_datas=[
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
            xAxis: [],
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
            ],
            series: [],
            grid: {
                x: 130,
                y: 70,
                x2: 150,
                y2: 50
            }
        },
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '供热量',
                        type: 'bar',
                        data: 'heat_supply'
                    },
                    {
                        name: '太阳能集热量',
                        type: 'bar',
                        data: 'solar_collector_heat'
                    },
                    {
                        name: '短期太阳能保证率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'rate'
                    }
                ]
            }
        },
    ]
);

// ----------------------------------------完成 太阳能集热分析---------------------------------------------

/* 供热分析

key:
    api_calories
by:
    d
obj:
    heat_supply_analysis_chart
    power_rate_chart
 */

// 获取图像元素
var heat_supply_analysis_dom = document.getElementById("heat_supply_analysis");
var power_rate_dom = document.getElementById("power_rate");

// 初始化图表
var heat_supply_analysis_chart = echarts.init(heat_supply_analysis_dom);
var power_rate_chart = echarts.init(power_rate_dom);

data_render(
    request_data={"key": "api_calories", "start": start, "end": end, "by": 'd'},
    time_ids=["heat_make_title", "high_power_title"],
    funcs=undefined,
    chart_objs=[heat_supply_analysis_chart, power_rate_chart],
    option_datas=[
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
                    restore: {show: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['高温板换制热量', '水源热泵制热量']
            },
            xAxis: [],
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
            series: []
            ,
            grid: {
                x: 140,
                y: 80,
                x2: 115,
                y2: 50
            }
        },
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
            xAxis: [],
            yAxis: [
                {
                    name: '制热功率(kW)',
                    type: 'value'
                }
            ],
            series: []
        }
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '高温板换制热量',
                        type: 'bar',
                        data: 'high_temperature_plate_exchange_heat'
                    },
                    {
                        name: '水源热泵制热量',
                        type: 'bar',
                        data: 'wshp_heat'
                    }
                ]
            }
        },
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'rate_time'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
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
                        data: 'high_temperature_plate_exchange_heat_rate'
                    }
                ]
            }
        },
    ],
    dataZooms=[1, 1]
);

// ----------------------------------------完成 供热分析---------------------------------------------

/* 制热量情况

key:
    api_heat_supply
by:
    d
obj:
    calories_by_days_chart
 */

// 获取图像元素
var calories_by_days_dom = document.getElementById("calories_by_days");

// 初始化图表
var calories_by_days_chart = echarts.init(calories_by_days_dom);

data_render(
    request_data={"key": "api_heat_supply", "start": start, "end": end, "by": 'd'},
    time_ids=["heat_supply_analysis_title"],
    funcs=undefined,
    chart_objs=[calories_by_days_chart],
    option_datas=[
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
            xAxis: [],
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
            series: [],
            grid: {
                x: 130,
                y: 70,
                x2: 150,
                y2: 50
            }
        },
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '供热量',
                        type: 'bar',
                        data: 'heat_supply'
                    },
                    {
                        name: '水源热泵耗电量',
                        type: 'bar',
                        data: 'power_consume'
                    },
                    {
                        name: '供热率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'rate'
                    }
                ]
            }
        },
    ]
);

// ------------------------------------------完成 制热量情况------------------------------------------

/* 节省供暖费用

key:
    api_heat_supply
by:
    d
obj:
    heat_supply_analysis_chart
 */

// 获取图像元素
var cost_saving_dom = document.getElementById("cost_saving");

// 初始化图表

var cost_saving_chart = echarts.init(cost_saving_dom);

data_render(
    request_data={"key": "api_cost_saving", "start": last_month_date, "end": end, "by": 'd'},
    time_ids=["heat_make_title", "high_power_title"],
    funcs=undefined,
    chart_objs=[cost_saving_chart],
    option_datas=[
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
            xAxis: [],
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
            series: []
        }
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        data: 'time_data',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisPointer: {
                            type: 'shadow'
                        }

                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '节省电费',
                        type: 'bar',
                        data: 'cost_saving'
                    },
                    {
                        name: '耗电量',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: 'power_consumption'
                    }
                ]
            }
        }
    ]
);

// ------------------------------------------完成 节省供暖费用--------------------------------------------------------




// loading_all(
//      图表延迟显示
//     [
//         pool_available_heat_chart,
//         high_heat_equal_supply_days_chart,
//         kamba_system_cop_chart,
//         kamba_system_cop_chart_chart,
//         kamba_wshp_cop_chart,
//         kamba_wshp_cop_chart_chart,
//         last_week_solar_collector_chart,
//         last_week_heat_storage_replenishment_chart,
//         last_week_heat_water_replenishment_chart,
//         last_week_solar_side_replenishment_chart,
//         solar_matrix_supply_and_return_water_temp_chart,
//         last_week_solar_collector_by_days_chart,
//         load_by_days_chart,
//         supply_and_return_water_temp_diff_with_temp_chart,
//         supply_water_temp_with_temp_chart,
//         return_water_temp_with_temp_chart,
//         end_supply_and_return_water_temp_chart,
//         last_year_supply_return_water_temp_chart,
//         co2_emission_chart,
//         co2_equal_chart,
//         calories_by_days_chart,
//         power_rate_chart,
//         cost_saving_chart
//     ]
// );

// 图表缩放

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
        load_by_days_chart,
        supply_and_return_water_temp_diff_with_temp_chart,
        supply_water_temp_with_temp_chart,
        return_water_temp_with_temp_chart,
        end_supply_and_return_water_temp_chart,
        last_year_supply_return_water_temp_chart,
        co2_emission_chart,
        co2_equal_chart
        last_week_solar_collector_by_days_chart,
        heat_supply_analysis_chart,
        power_rate_chart,
        calories_by_days_chart,
        cost_saving_chart,

    ]
);


