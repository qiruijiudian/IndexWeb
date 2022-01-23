/**
 * @function get_cop_pie_options
 * @desc 获取cop数据仪表盘option配置字典
 * @param {object} value 用于设置option的数据字典
 * @param {string} c_type 类型，cona或者kamba，根据不同板块在颜色以及分块区域上有稍微不同
 * @returns {object} option配置字典
 */
function get_cop_pie_options(value, c_type){
    let line_style = {width: 20,color: [[0.08, '#fd666d'],[0.12, '#FFD700'],[1, '#7FFF00']]};
    if (c_type.includes("cona")) line_style["color"] = [[0.2, '#fd666d'],[0.3, '#FFD700'],[1, '#7FFF00']];
    let options = {
        series: [{
            type: 'gauge',
            min:0,//最小值
            max:50,//最大值
            splitNumber:5, //刻度的个数
            axisLine: {
                lineStyle: line_style
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
}

/**
 * @function get_water_provider_options
 * @desc 获取供回水温度与气温数据option配置字典
 * @param {object}  data 用于设置option的数据字典
 * @param {string}  hint  用户设置y轴名称的提示文字，如供水温度
 * @param {string}  delta_hint 用于设置图例中周期的提示文字，如上月/去年
 * @returns {object} option配置字典
 */
function get_water_provider_options(data, hint, delta_hint){
    // 按照传入的data进行数据设置，返回设置好的option配置字典，hint项为提示文字
    let common = "";
    if (hint.includes("供回水")){
        common = "温差"
    }else if (hint.includes("供水")){
        common = "供水温度";
    }else {
        common = "回水温度";
    }

    let options = {
        color: ["green", "red"],
        grid: {
            left: 80,
            right: 80
        },
        legend: {
            left: 'center',
            // right: 50,
            // top: 18,
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
                let value = param.value;
                return '温度：' + value[0] + '℃' + '<br/>' + param.seriesName + '：' + value[1] + '℃';
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

/**
 * @function get_heat_provide_options
 * @desc 获取供热与气温数据option配置字典
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  name 用于设置option的数据字典
 * @param {string}  hint  用户设置y轴名称的提示文字，如供热量
 * @param {string}  delta_hint 用于设置图例中周期的提示文字，如上月/去年
 * @returns {object} option配置字典
 */
function get_heat_provide_options(data, name, hint, delta_hint){

    let options = {
        color: ["green", "red"],
        grid:{
            x:75,
            x2:90,
        },
        legend: {
            left: "center",
            // right: 50,
            // top: 18,
            data: [name + hint, delta_hint + hint]
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
                let value = param.value;
                return '温度：' + value[0] + '℃' + '<br/>' + param.seriesName + '：' + value[1] + 'kWh';
            }
        },
        series: [
            {
                name: name+hint,
                symbolSize: 15,
                data: data['latest_data'],
                type: 'scatter'
            },
            {
                name: delta_hint+hint,
                symbolSize: 15,
                data: data['last_data'],
                type: 'scatter'
            },
        ]
    };
    return options
}

/**
 * @function get_cona_com_cop_chart_options
 * @desc 获取cop序列图数据的option配置
 * @param {object}  data 用于设置option的数据字典
 * @returns {object} option配置字典
 */
function get_cona_com_cop_chart_options(data) {
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

/**
 * @function get_cona_sub_cop_chart_option
 * @desc 获取cop子页面数据的option配置
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  name 针对不同机房的cop返回数据名称，如cop_f2_value
 * @returns {object} option配置字典
 */
function get_cona_sub_cop_chart_option(data, name) {
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
                data: data[name]
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
}

/**
 * @function get_outlet_water_temperature_tr_html
 * @desc 生成出水温度的tr标签html代码
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  name 针对不同板块数据的区分字段，high_week_result(高温_周数据)、low_week_result(低温_周)
 * @returns {object} tr标签代码组成的数组
 */
function get_outlet_water_temperature_tr_html(data, name) {
    let res = [];
    for (let i=0;i<data[name].length;i++){
        if (data[name][i][0] > 0){
            let tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
            tr_html = tr_html.format(
                data[name][i][1],
                data[name][i][2],
                data[name][i][3],
                data[name][i][4],
            );
            res.push(tr_html);

        } else {
            let tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
            tr_html = tr_html.format(
                data[name][i][1],
                data[name][i][2],
                data[name][i][3],
                data[name][i][4],
            );
            res.push(tr_html);
        }

    }
    return res
}

/**
 * @function set_outlet_water_temperature
 * @desc 设置出水温度表格数据
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  level 用于设置数据的等级区分字段，如all(全部)、high(高温)、low(低温)
 * @param {object}  ids 表格tbody标签的id值，按照先高后低，先周后年的顺序
 */
function set_outlet_water_temperature(data, level, ids) {
    if (level === "high"){
        let high_week = get_outlet_water_temperature_tr_html(data, "high_week_result");

        for (let i=0;i<high_week.length;i++){$(`#${ids[0]}`).append(high_week[i])}

        let high_year = get_outlet_water_temperature_tr_html(data, "high_year_result");

        for (let i=0;i<high_year.length;i++){$(`#${ids[1]}`).append(high_year[i])}

    }else if(level === "low"){
        let low_week = get_outlet_water_temperature_tr_html(data, "low_week_result");

        for (let i=0;i<low_week.length;i++){$(`#${ids[2]}`).append(low_week[i])}

        let low_year = get_outlet_water_temperature_tr_html(data, "low_year_result");

        for (let i=0;i<low_year.length;i++){$(`#${ids[3]}`).append(low_year[i])}
    }else {
        let high_week = get_outlet_water_temperature_tr_html(data, "high_week_result");
        let high_year = get_outlet_water_temperature_tr_html(data, "high_year_result");
        let low_week = get_outlet_water_temperature_tr_html(data, "low_week_result");
        let low_year = get_outlet_water_temperature_tr_html(data, "low_year_result");

        for (let i=0;i<high_week.length;i++){$(`#${ids[0]}`).append(high_week[i])}

        for (let i=0;i<high_year.length;i++){$(`#${ids[1]}`).append(high_year[i])}

        for (let i=0;i<low_week.length;i++){$(`#${ids[2]}`).append(low_week[i])}

        for (let i=0;i<low_year.length;i++){$(`#${ids[3]}`).append(low_year[i])}
    }
}

/**
 * @function set_outlet_water_temp_time_range
 * @desc 设置出水温度表格数据的时间周期
 * @param {object}  data 用于设置时间周期的数据字典(包含start、end字段数据)
 * @param {object}  titles 用于设置时间周期的id值组成的数组
 */
function set_outlet_water_temp_time_range(data, titles) {
    for (let i=0;i<titles.length;i++){
        if (titles[i].includes("week")) {

            set_time_range(titles[i], {"start": data["week_start"], "end": data["week_end"]});
        }else {
            set_time_range(titles[i], {"start": data["year_start"], "end": data["year_end"]});
        }
    }
}

/**
 * @function get_common_option
 * @desc 获取完整的option配置字典，根据data_mapping中的数据，结合data_option内容返回完整的供echarts使用的option配置
 * @param {object}  data_values ajax请求返回的data数据(包含该图表设置所需数据块即可)
 * @param {object}  data_option 基础option配置(除却数据项的数据，如legend、style等，axis、series等需要数据配合的项按照需要设置为空数字或者空字典)
 * @param {object}  data_mapping 用于映射数据的字典，字典中的项对应data_option中需要设置数据的项，将data_values中的数据对应填充
 * @returns {object}  data_option 用于设置数据option配置字典
 */
function get_common_option(data_values, data_option, data_mapping) {
    //
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

/**
 * @function format
 * @desc 自定义类似于python中format的字符串格式化函数
 * @returns {string}  str 格式化完成后的字符串
 */
String.prototype.format = function () {
    // 类似python中的format效果
    let str = this;
    for(let i = 0;i < arguments.length;i++){
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};


/**
 * @class DataChart
 * @classdesc DataChart类中对大部分相同操作进行了整合，公共流程概述为：初始化图表 -> 发送ajax请求 -> 设置特殊文字 -> 设置时间周期 -> 渲染数据，针对个别特殊的图表设置了funcs字段可以通过自定义函数进行设定
 * @desc 构造函数中针对大部分数据都有默认值设置，为了适用于多图表同请求参数的情况，以数组形式定义每个字段
 */
class DataChart {

    /**
     * @method constructor
     * @desc 构造函数，初始化字段以及部分特殊操作(针对大周期数据修改页面文字显示)
     * @param request_data  请求参数，如{"start": "", "end": "", "by": ""}
     * @param time_ids  需要设置时间周期的dom元素id值数组
     * @param funcs 需要执行的函数数组
     * @param chart_objs  图表id值数组，会以此id初始化echarts对象
     * @param option_datas  option基础配置字典(不包含数据项)
     * @param option_mappings   option映射字典(包含数据项)
     * @param dataZooms option配置中的dataZoom，控制图表缩放
     * @param request_type  ajax请求类型
     */

    constructor (request_data, time_ids, funcs=[false], chart_objs=[false], option_datas=[false], option_mappings=[false], dataZooms=[1], request_type='POST'){
        this.request_data = request_data;
        this.time_ids=time_ids;
        this.funcs=funcs;
        this.chart_objs=chart_objs;
        this.option_datas=option_datas;
        this.option_mappings=option_mappings;
        this.dataZooms=dataZooms;
        this.request_type=request_type;
        if (document.location.href.includes("cona")){
            this.request_url =  cona_url;
            let remove_div = ['table_geothermal_wells', 'table_water_temp_heat', 'table_avg_temp_with_temp'];
            let titles = ['max_load_title', 'min_load_title', 'cost_saving_total_title', 'cost_saving_title', 'temp_diff_title', 'load_title', 'water_replenishment_title'];
            if (is_large){
                for (let i=0;i<remove_div.length;i++){
                    $(`#${remove_div[i]}`).remove();
                }
                for (let i=0;i<titles.length;i++){
                    let tmp = $(`#${titles[i]}`).text().trim();
                    if (tmp.includes("去年") || tmp.includes("上周") || tmp.includes("上月")){
                        $(`#${titles[i]}`).text(tmp.replace("去年", "").replace("上周", "").replace("上月", ""));
                    }
                }
            }
        }else {
            this.request_url =  kamba_url;
            let titles = ['max_load_title', 'min_load_title', 'kamba_cost_saving_title', 'avg_load_title', 'solar_matrix_title'];
            if (is_large){
                for (let i=0;i<titles.length;i++){
                    let tmp = $(`#${titles[i]}`).text().trim();
                    if (tmp.includes("去年") || tmp.includes("上周") || tmp.includes("上月")){
                        $(`#${titles[i]}`).text(tmp.replace("去年", "").replace("上周", "").replace("上月", ""));
                    }
                }
            }
        }
    }

    /**
     * @method init_chart
     * @desc 以dom元素为对象初始化echarts对象，dom元素由chart_objs中的id值获取
     */
    init_chart(){
        for(let i=0;i<this.chart_objs.length;i++){
            if (this.chart_objs[i]){
                this.chart_objs[i] = echarts.init(document.getElementById(this.chart_objs[i]));
                this.chart_objs[i].showLoading();
                charts.push(this.chart_objs[i]);
            }
        }
    }

    /**
     * @method text_setting
     * @desc 设置特殊文字
     * @param data  ajax请求返回的data数据
     */
    text_setting(data){
        // 特殊板块文字设定（最大负荷、最小负荷、节省供暖费用导航标题）
        if (this.request_data.key.includes("api_load")){
            $('#max_load').text(data['max_load'] + 'KW');
            $('#min_load').text(data['min_load'] + 'KW');
            if ($("#avg_load")) $('#avg_load').text(data['avg_load'] + 'KW');
        }else if(this.request_data.key.includes("api_cost_saving")){
            $('#cost_saving_sum').text(data['cost_saving_total'] + '万元');
            for (let i=0;i<this.chart_objs.length;i++){
                if (this.time_ids[i]){
                    if (this.request_url.includes("kamba")){
                        let now =$(`#${this.time_ids[i]}`).text().trim().slice(0, -1);
                        now = now + `，节省费用总计：${data['cost_saving_total']}万元)`;
                        $(`#${this.time_ids[i]}`).text(now);
                    }else if (this.request_url.includes("cona")){
                        let now =$(`#${this.time_ids[i]}`).text().trim();
                        now = now + `(总计：${data['cost_saving_total']}万元)`;
                        $(`#${this.time_ids[i]}`).text(now);
                    }

                }

            }
        }else if (this.request_data.key.includes("api_heat_supply")){
            $('#avg_heat').text(data['avg_heat_network'] + 'KW');
        }
    }

    /**
     * @method  cop_bind
     * @desc    为cop图表绑定数据，将序列图与仪表盘图表以点击事件关联
     */
    cop_bind(){
        for (let i=0;i<this.chart_objs.length;i+=2){
            let _ = this;
            this.chart_objs[i+1].getZr().on('click', function (params) {
                let pointInPixel= [params.offsetX, params.offsetY];
                if (_.chart_objs[i+1].containPixel('grid',pointInPixel)) {

                    let pointInGrid=_.chart_objs[i+1].convertFromPixel({seriesIndex:0},pointInPixel);
                    //X轴序号
                    let xIndex=pointInGrid[0];

                    //获取当前图表的option
                    let op=_.chart_objs[i+1].getOption();

                    //获得图表中我们想要的数据
                    let month = op.xAxis[0].data[xIndex];
                    let value = op.series[0].data[xIndex];
                    let tmp_options = get_cop_pie_options(value, _.request_url);
                    _.chart_objs[i].setOption(tmp_options);
                    console.log(month+"："+value, tmp_options, _.chart_objs[i]);
                }
            });
        }

    }

    /**
     * @method  data_render
     * @desc    主要执行函数，包含渲染图表的整个过程，初始化图表 -> 发送ajax请求 -> 设置特殊文字 -> 设置时间周期 -> 渲染数据(有func参数则执行其中函数，否则按照常规流程获取option进行设置)
     */
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
                            if (obj.time_ids[i]){
                                if (obj.request_data.key.includes("cop") && obj.time_ids[i].includes("pie")){
                                    let tmp_id = obj.time_ids[i];
                                    console.log("id, ", tmp_id);
                                    let tmp_text = $(`#${tmp_id}`).text();
                                    console.log(data['status'], obj.request_data.key);
                                    if (obj.request_data.key.includes("sub") && obj.request_url.includes("cona")){

                                        if (!data['status'][i].includes("正常")) $(`#${tmp_id}`).text(tmp_text + '(' + data["status"][i] + ')');
                                    }else {
                                        if (!data['status'].includes("正常")) $(`#${tmp_id}`).text(tmp_text + '(' + data["status"] + ')');
                                    }

                                }else {
                                    set_time_range(obj.time_ids[i], data);
                                }

                            }

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