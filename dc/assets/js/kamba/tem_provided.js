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


function get_common_option(data_values, data_option, data_mapping) {
    // 根据data_mapping中的数据，结合data_option内容返回完整的供echarts使用的option配置
    for(let key in data_mapping){
        let key_data = data_mapping[key];
        if (key_data["type"] === "arr"){
            for (let i=0;i<key_data["values"].length;i++){
                for (let j=0;j<key_data["obj"].length;j++){
                    let modify_key = key_data["obj"][j];
                    if (key_data["values"][i].hasOwnProperty(modify_key)){
                        key_data["values"][i][modify_key] = data_values[key_data["values"][i][modify_key]]
                    }
                }
            }

        }else if (key_data["type"] === "obj"){
            for (let j=0;j<key_data["obj"].length;j++){
                let modify_key = key_data["obj"][j];

                if (typeof key_data["values"][modify_key] === 'function'){
                    key_data["values"][modify_key] = key_data["values"][modify_key](data_values);
                }else if (typeof key_data["values"][modify_key] === 'string'){

                    key_data["values"][modify_key] = data_values[key_data["values"][modify_key]];
                }

            }

        }

        data_option[key] = data_mapping[key]["values"];

    }
    return data_option;
}


String.prototype.format = function () {
    // 类似python中的format效果
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};


class DataChart {

    constructor (request_data, time_ids, funcs=[false], chart_objs=[false], option_datas=[false], option_mappings=[false], dataZooms=[1], request_url=kamba_url, request_type='POST'){
        this.request_data = request_data;
        this.time_ids=time_ids;
        this.funcs=funcs;
        this.chart_objs=chart_objs;
        this.option_datas=option_datas;
        this.option_mappings=option_mappings;
        this.dataZooms=dataZooms;
        this.request_url=request_url;
        this.request_type=request_type;
        this.obj_data = undefined
    }

    init_chart(){
        for(let i=0;i<this.chart_objs.length;i++){
            if (this.chart_objs[i]){
                this.chart_objs[i] = echarts.init(document.getElementById(this.chart_objs[i]));
                this.chart_objs[i].showLoading();
                charts.push(this.chart_objs[i]);
                console.log(this.chart_objs[i]);
            }
        }
    }

    text_setting(data){
        // 特殊板块文字设定（最大负荷、最小负荷、节省供暖费用导航标题）
        if (this.request_data.key.includes("api_load")){
            $('#max_load').text(data['max_load'] + 'KW');
            $('#min_load').text(data['min_load'] + 'KW');
            if ($("#avg_load")) $('#avg_load').text(data['avg_load'] + 'KW');
        }else if(this.request_data.key.includes("api_cost_saving")){
            $('#cost_saving_sum').text(data['cost_saving_total'] + '万元');
            for (let i=0;i<this.chart_objs.length;i++){
                let now =$(`#${this.time_ids[i]}`).text().trim().slice(0, -1);
                now = now + `，节省费用总计：${data['cost_saving_total']}万元)`;
                $(`#${this.time_ids[i]}`).text(now);
            }
        }
    }

    cop_bind(){
        let _ = this;
        this.chart_objs[1].getZr().on('click', function (params) {
            var pointInPixel= [params.offsetX, params.offsetY];
            console.log(_);
            if (_.chart_objs[1].containPixel('grid',pointInPixel)) {

                var pointInGrid=_.chart_objs[1].convertFromPixel({seriesIndex:0},pointInPixel);
                //X轴序号
                var xIndex=pointInGrid[0];

                //获取当前图表的option
                var op=_.chart_objs[1].getOption();

                //获得图表中我们想要的数据
                var month = op.xAxis[0].data[xIndex];
                var value = op.series[0].data[xIndex];
                var tmp_options = get_cop_pie_options(value);
                _.chart_objs[0].setOption(tmp_options);
                console.log(month+"："+value);

            }
        });
    }

    data_render(){
        try {
            this.init_chart();



            let obj = this;
            $.ajax(
                {
                    url: this.request_url,
                    type: this.request_type,
                    data: this.request_data,
                    cache: true,
                    success: function (data) {

                        // 特定文字设置
                        obj.text_setting(data);

                        for (let i = 0; i < obj.chart_objs.length; i++) {
                            // 设置时间
                            set_time_range(obj.time_ids[i], data);

                            // 渲染数据
                            if (obj.funcs[i]) {
                                if (obj.funcs[i].type === "option") {
                                    obj.chart_objs[i].hideLoading();
                                    obj.chart_objs[i].setOption(obj.funcs[i].func(data));
                                } else if (obj.funcs[i].type === "p_function") {
                                    obj.funcs[i].func(data);
                                }
                            } else {
                                let option = get_common_option(data, obj.option_datas[i], obj.option_mappings[i]);
                                if (is_large) {
                                    if (!option.hasOwnProperty("dataZoom")) {
                                        if (obj.dataZooms[i] === 1) {
                                            option["dataZoom"] = [{
                                                show: true,
                                                realtime: true,
                                                start: 30,
                                                end: 70,
                                                xAxisIndex: [0, 1]
                                            }];
                                            option["toolbox"]["feature"]["dataZoom"] = {yAxisIndex: 'none'};
                                        } else if (obj.dataZooms[i] === 2) {
                                            option["dataZoom"] = [
                                                {show: true, realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]},
                                                {type: 'inside', realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]}
                                            ];

                                            option["toolbox"]["feature"]["dataZoom"] = {yAxisIndex: 'none'};
                                        }
                                    }
                                }
                                obj.chart_objs[i].hideLoading();
                                obj.chart_objs[i].setOption(option);
                            }
                        }

                        // 针对COP数据饼图绑定数据动态显示
                        console.log(obj.chart_objs);
                        if (obj.request_data.key.includes("cop")) obj.cop_bind();

                    },
                    error: function (xhr) {
                        console.log("失败", xhr);
                    }
                }
            );
        }catch (e) {
            console.log('error', e)
        }
    }
}