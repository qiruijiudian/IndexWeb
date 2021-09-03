String.prototype.format = function () {
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};

try {
    // pool_temperature
    $.ajax(
        {
            url: kamba_url,
            type: "POST",
            data: {
                "key": "api_pool_temperature",
                "start": start,
                "end": end,
                "by": 'h',
                'just_pool': true
            },
            cache: true,
            success: function (data) {
                $('#pool_temperature_heat_date').text('水池温度情况 （' +  data['heat_date'] + '）');

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
                    $("#pool_temperature_tbody").append(tr_html);
                }


            },
            error: function (xhr) {
                console.log("post pool_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax pool_temperature error：", e);
}