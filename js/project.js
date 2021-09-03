function _switch(name){
    var p_lst = $("div[id='intro2']>div");
    for(var i=0;i<p_lst.length;i++){
            if($(p_lst[i]).hasClass(name)){
                $(p_lst[i]).removeClass('p-hidden');
            }else{
                $(p_lst[i]).addClass('p-hidden');
            }
        }

};









