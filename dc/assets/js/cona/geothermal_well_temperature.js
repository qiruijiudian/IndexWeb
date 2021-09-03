String.prototype.format = function () {
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};

try {
    //sub_outlet_water_temperature
    var levels = document.location.href.split('?');
    console.log(levels);
    if (levels.length > 1){
        level = levels.pop();
        console.log(level);
        if (level == 'high'){
            console.log('高');
            $("#gwt_title").text('高温地热井出水温度');
        }else if (level == 'low'){
            console.log('滴滴滴');
            $("#gwt_title").text('低温地热井出水温度');
        }else {
            window.location.href = 'http://' + document.location.host + '/dc/cona.html';
        }
    }else {
        console.log('起飞');
        window.location.href = 'http://' + document.location.host + '/dc/cona.html';
    }
    console.log('dasdcas', level);

    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_outlet_water_temperature",
                "level": level
            },
            cache: true,
            success: function (data) {
                console.log(data);
                for (var i=0;i<data['week_result'].length;i++){
                    if (data['week_result'][i][0] > 0){
                        var tr_html = '<tr class="odd gradeA">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['week_result'][i][1],
                            data['week_result'][i][2],
                            data['week_result'][i][3],
                            data['week_result'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="even gradeA">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['week_result'][i][1],
                            data['week_result'][i][2],
                            data['week_result'][i][3],
                            data['week_result'][i][4],
                        );
                    }
                    $("#tbody_week").append(tr_html);
                }
                // 年 and 高
                for (var i=0;i<data['year_result'].length;i++){
                    if (data['year_result'][i][0] > 0){
                        var tr_html = '<tr class="odd gradeA">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['year_result'][i][1],
                            data['year_result'][i][2],
                            data['year_result'][i][3],
                            data['year_result'][i][4],
                        );

                    } else {
                        var tr_html = '<tr class="even gradeA">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                        tr_html = tr_html.format(
                            data['year_result'][i][1],
                            data['year_result'][i][2],
                            data['year_result'][i][3],
                            data['year_result'][i][4],
                        );
                    }
                    $("#tbody_year").append(tr_html);
                }
            },
            error: function (xhr) {
                console.log("post sub_outlet_water_temperature error：", xhr);
            }
        }
    )
}catch (e) {
    console.log("ajax sub_outlet_water_temperature error：", e);
}

