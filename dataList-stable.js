// dataList 1.12 (https://github.com/islavisual/dataList).
// Copyright 2015-2017 Islavisual. Licensed under MIT (https://github.com/islavisual/dataList/blob/master/LICENSE). 
// Author: Pablo E. Fernández (islavisual@gmail.com). 
// Last update: 09/03/2017
$.fn.dataList = function(options) {
    var opt = $.extend({
        autoSelectable: false,
        addClassIfError:'error',
        ajax: false,
        ajaxErrorMessage:"Request failed",
        allowNewValues:false,
        clearOnFocus: false,
        dataRanking:false,
        datalistAttr: "data-list",
        defaultMessage:'Please, select a choice',
        default_value:"",
        emptyMessage:"No results found",
        error400:"Server understood the request, but request content was invalid",
        error401:"Unauthorized access",
        error403:"Forbidden resource can\'t be accessed",
        error404:"Not found",
        error500:"Internal server error",
        error503:"Service unavailable",
        errorAbort:'Request was aborted by the server',
        errorParse:'Parsing JSON request failed',
        errorTimeOut:'Request time out',
        errorUnknown:'Unknown error',
        method: "post",
        multiple_class:'',
        onChange: null,
        parameterToSend:"query",
        requiredMessage:'Please, enter at least one value',
        return_mask:"text",
        selected_value:"",
        url:"",
        value_selected_to:"",
        placeholder:('placeholder' in document.createElement("input"))
    }, options );

    var dataListTarget = $(this);
    var selector  = "#"+$(this).attr("id");
    var multiple  = false;
    var required  = false;
    var valueList = null;
    
    function unselectText(e){ try { $(e.target).get(0).selectionStart = $(e.target).get(0).value.length; $(e.target).get(0).selectionEnd = $(e.target).get(0).value.length; } catch(ex) {}}
    function selectFirst(){ var item = $('#'+$(selector).attr(opt.datalistAttr)+"_ul li:first-child"); if(item.html() != opt.emptyMessage && opt.autoSelectable) item.addClass("hover"); }
    function selectText(e){ try { if(isTextSelected($(e.target).get(0))){ $(e.target).get(0).selectionStart = 0; $(e.target).get(0).selectionEnd = $(e.target).get(0).value.length; } } catch(ex) {}}
    function isTextSelected(input) { if (typeof input.selectionStart == "number") { return input.selectionStart == 0 && input.selectionEnd == input.value.length; } else if (typeof document.selection != "undefined") { input.focus(); return document.selection.createRange().text == input.value; }}
    function isValid(){ if(opt.placeholder && ((!multiple && $(selector).val() == '') || (multiple && $('input', valueList).length == 0)) && required){ $(selector).attr('placeholder', opt.requiredMessage).addClass(opt.addClassIfError) } else if(!opt.placeholder && ((!multiple && $(selector).val() == '') || (multiple && $('input', valueList).length == 0)) && required){ $(selector).attr('title', opt.requiredMessage).val(opt.requiredMessage).addClass(opt.addClassIfError) } else { $(selector).removeAttr('title').removeClass(opt.addClassIfError)}}
    function isMobile() { return ('ontouchstart' in document.documentElement);}
    function empty(e){ if(e.css("display") != 'none' && e.html().indexOf(opt.emptyMessage) != -1) return true; return false; }

    function get(t, val, ul, input, e){
        if(opt.ajax && $.trim($('#'+input.attr(opt.datalistAttr)).html()) == ""){
            var param = opt.parameterToSend;
            $.ajax({url:opt.url, data:param+"="+val, method:opt.method, xhrFields: { withCredentials: true }}).done(function(data) {
                try { var parseData = JSON.parse(data); } catch(e){ var parseData = data;  }
                var s = '';
                if(typeof parseData == 'object'){
                    if(JSON.stringify(parseData)=='[null]' || parseData == null || parseData == []){
                        s += '<option value="false">'+opt.emptyMessage+'</option>';
                    } else {
                        for(var js=0; js<parseData.length; js++){
                            s += '<option value="'+parseData[js].value+'">'+parseData[js].text+'</option>';
                        }
                    }
                } else {
                    var a = parseData.split('\n');
                    for(var j=0; j<a.length; j++){
                        if($.trim(a[j])!="") s += '<option value="'+a[j]+'">'+a[j]+'</option>';
                    }
                }

                if(isMobile()){
                    if(opt.selected_value != ""){
                        var defaultItem = null;
                        $(selector).html('<option value="" >'+opt.defaultMessage+'</option>'+s);
                        var items = $(selector+' option');
                        for(var x = 0; x < items.length; ++x){
                            var item = $(items[x]);
                            if(item.val() == opt.selected_value){ item.attr('selected', 'selected'); defaultItem = item; }
                        }
                    } else {
                        $(selector).html('<option value="" selected="selected" >'+opt.defaultMessage+'</option>'+s);
                    }
                    if(defaultItem != null && opt.value_selected_to != ""){
                        $('#'+opt.value_selected_to).val(defaultItem.val());
                    }
                } else {
                    $('#'+input.attr(opt.datalistAttr)).html(s);
                    search(val, ul, input, e);
                    if(val == "")  ul.hide();
                }

                assignByDefault();

            }).error(function(x, text, exception) {
                    var message;
                    var statusErrorMap = {
                        '400' : opt.error400,
                        '401' : opt.error401,
                        '403' : opt.error403,
                        '404' : opt.error404+': '+opt.url,
                        '500' : opt.error500,
                        '503' : opt.error503
                    };
                    if (x.status) {
                        message =statusErrorMap[x.status];
                        if(!message){
                            message=opt.errorUnknown;
                        }
                    }else if(exception=='parsererror'){
                        message=opt.errorParse;
                    }else if(exception=='timeout'){
                        message=opt.errorTimeOut;
                    }else if(exception=='abort'){
                        message=opt.errorAbort;
                    }else {
                        message=opt.errorUnknown;
                    }
                    alert(opt.ajaxErrorMessage+"\n\n"+message);
            });
        } else {
            search(val, ul, input, e);
        }
    }

    function select(e, v){
        var vst = opt.value_selected_to;
        var rmk = opt.return_mask;
        var sep = rmk.replace('value', '').replace('text', '');
        var div = '<div>{text}<input type="hidden" value="{value}" name="'+selector.replace('#', '')+'[]"><span onclick="event.preventDefault(); event.stopImmediatePropagation(); $(this).parent().remove();">X</span></div>';
        var aux = $(e).parent().attr("id");

        if(opt.allowNewValues && typeof v == "undefined"){
            if(multiple){
                div = div.replace('{text}', $(selector).val());
                div = div.replace('{value}', '0');
                valueList.append(div);
                $(selector).val('');

                $(selector).attr('placeholder', opt.defaultMessage)
            } else {
                if(rmk.indexOf('text') != -1 && rmk.indexOf('value') != -1){
                    var val = $(selector).val();
                    var pv = val;

                    var l = val.split(rmk.replace('value', '').replace('text', ''));
                    $('#'+vst).val('0');
                    $('#'+aux).val(val);
                } else {
                    $('#'+aux).val(val);
                    if(opt.value_selected_to != "") $('#'+vst).val(e.getAttribute("data-value"));
                }
            }

            $('#'+$(selector).attr(opt.datalistAttr)+"_ul").hide();
        } else {
            if(multiple){
                aux = rmk.split(sep);
                var val = v.split(sep);
                var arr = {};
                for(var x=0; x < aux.length; x++){
                    arr[aux[x]] = val[x];
                }
                if(opt.dataRanking && arr.text.indexOf(" (") != -1) arr.text = arr.text.substr(0, arr.text.indexOf(" ("));
                if(typeof arr.value != 'undefined' && arr.value != "") div = div.replace('{value}', arr.value);
                if(typeof arr.text != 'undefined' && arr.text != "") div = div.replace('{text}', arr.text);

                idx = arr.text;
                valueList.append(div);
                $(selector).val('');

                $(selector).attr('placeholder', opt.defaultMessage);

            } else {
                if(typeof aux != "undefined"){
                    aux = aux.substr(0, aux.indexOf("_"));
                    var val = v;
                    if(rmk.indexOf('text') != -1 && rmk.indexOf('value') != -1){
                        var pv = rmk.split('value');

                        var l = val.split(rmk.replace('value', '').replace('text', ''));
                        $('#'+vst).val(l[pv[0]==''?0:1]);
                        $('#'+aux).val(l[pv[0]==''?1:0]);
                    } else {
                        $('#'+aux).val(val);
                        if(opt.value_selected_to != "") $('#'+vst).val(e.getAttribute("data-value"));
                    }
                } else {
                    $('#'+aux).val('');
                    if(opt.value_selected_to != "") $('#'+vst).val('');
                    //return false;
                }
            }
            $('#'+$(e).parent().attr("id")).hide();
        }
        
        // If OnChange parameter is sent
		if(opt.onChange != null){ eval(opt.onChange); }
        
        if(required) dataListTarget.prev().removeAttr("required");
    }

    function search(val, ul, input, e){
        var sdt = opt.datalistAttr;
        var et  = e.target;
        var aux = $('#'+input.attr(sdt)+' option');

        ul.html('');
        var ulEmpty = true;
        for(var i=0; i<aux.length; i++){
            var item = aux.eq(i);
            var dataRank = typeof item.attr('data-rank') != 'undefined';

            if(item.val().toUpperCase().indexOf(val) != -1 || item.text().toUpperCase().indexOf(val) != -1){
                ulEmpty = false;
                var mask = opt.return_mask.replace('value', item.val()).replace('text', item.text());
                if(opt.dataRanking && dataRank) mask += " ("+item.attr('data-rank')+'<span class="fa fa-star"></span>)';
                if(!multiple){
                    ul.html(ul.html()+(dataRank?('<li data-rank="'+item.attr('data-rank')+'">'):('<li data-value="'+item.val()+'">'))+mask+'</li>');
                } else {
                    var mis = $('input', valueList);
                    var lst = "";
                    for(var x = 0; x < mis.length; ++x){
                        var mi = $(mis[x]);
                        lst += "|"+mi.val()+"|";
                    }
                    if(lst.indexOf("|"+item.val()+"|") == -1) ul.html(ul.html()+(dataRank?('<li data-rank="'+item.attr('data-rank')+'">'):('<li data-value="'+item.val()+'">'))+mask+'</li>')
                }
            }
        }
        if(ulEmpty) ul.html(ul.html()+'<li style="cursor: text">'+opt.emptyMessage+'</li>');

        $('input['+opt.datalistAttr+'] + * + ul').hide();
        ul.show();
        selectFirst();
        selectText(e);

        $('#'+$(et).attr(sdt)+"_ul li").off("mouseover click");
        $('#'+$(et).attr(sdt)+"_ul li").on("mouseover", function(e){ if(empty($(this))) return false; $(this).parent().find('li').removeClass("hover"); $(this).addClass("hover"); });
        $('#'+$(et).attr(sdt)+"_ul li").on("click", function(e){ if(empty($(this))) return false; select(e.target, $(this).html()); });
    }

    function assignByDefault(){
        if($(selector)[0].nodeName == "INPUT") {
            $(selector).val($('#'+$(selector).attr(opt.datalistAttr) + ' option[value="'+opt.default_value+'"]').text());
            if(opt.value_selected_to != "") $('#'+opt.value_selected_to).val(opt.default_value);
            
        } else {
            document.getElementById(selector.replace('#', '')).value=opt.default_value;
        }
    }
    
    function assignSelected(value){
        if($(selector)[0].nodeName == "INPUT") {
            $(selector).val($('#'+$(selector).attr(opt.datalistAttr) + ' option[value="'+value+'"]').text());
            if(opt.value_selected_to != "") $('#'+opt.value_selected_to).val(value);
            
        } else {
            document.getElementById(selector.replace('#', '')).value=value;
        }
    }
    
    var methods = {
        init: function(options) {
            if(!isMobile()) {
                $(selector).before('<input autocomplete="off" />');
                
                var selName = selector.replace("#", '');
                var c = document.getElementById(selName);

                // Copy the attriibutes to new input
                for (var i = 0, atts = c.attributes, n = atts.length; i < n; i++){
                    var attr = atts[i].nodeName;
                    dataListTarget.prev().attr(attr, dataListTarget.attr(attr));
                    if(attr == 'multiple') multiple = true;
                    if(attr == 'required') required = true;
                }

                if(multiple) dataListTarget.prev().removeAttr("name");
                if(required && multiple) dataListTarget.prev().removeAttr("required");

                // Remove attributes to selector
                dataListTarget.prev().attr(opt.datalistAttr, selName+'_dataList');
                for (var i = 0, atts = c.attributes, n = atts.length; i < n; i++){ dataListTarget.removeAttr(atts[0].nodeName); }

                // Hide the select tag
                $(selector).next().attr('id', selName+'_dataList').css('display', 'none');
                dataListTarget = $('input'+selector);
                get(selName, '', $('#'+$('#'+selName).attr(opt.datalistAttr)).next(), dataListTarget, $(selName));

                // If selector is multiple
                if(multiple){
                    var c = " ";
                    if(opt.multiple_class != "") c += opt.multiple_class;
                    valueList = $('<div class="valueList_dataList '+selName+c+'"></div>').insertAfter('#'+dataListTarget.attr(opt.datalistAttr));
                    if($('head').html().indexOf('.valueList_dataList > div > span{ float: right; margin:0 0 0 10px; cursor: pointer; }') == -1)
                        $("<style type='text/css'> .valueList_dataList > div > span{ float: right; margin:0 0 0 10px; cursor: pointer; } </style>").appendTo("head");
                }

                // Insert unsorted list after selector
                $('<ul></ul>').insertAfter('#'+dataListTarget.attr(opt.datalistAttr)).hide();

                // If dataList is multiple and required, add new associate event
                if(required && multiple){
                    var frm = $(selector).parents('form');
                    $(frm).submit(function(e){
                        if($('input', valueList).length == 0){
                            if(opt.placeholder){
                                $(selector).attr('placeholder', opt.requiredMessage).addClass(opt.addClassIfError);
                            } else {
                                $(selector).attr('title', opt.requiredMessage).val(opt.requiredMessage).addClass(opt.addClassIfError);
                            }

                            e.preventDefault();
                            return false;
                       }
                    });
                }

                // Double Click Event
                $(selector).on("focusin", function(e){
                    if(opt.clearOnFocus){
                        $(this).val("");
                        if(opt.value_selected_to != "") $('#'+opt.value_selected_to).val('');
                    }
                    
                    var obj = $('#'+$(e.target).attr(opt.datalistAttr)).next();
                    obj.attr("id", $(e.target).attr(opt.datalistAttr)+"_ul");
                    var val = $(this).val().toUpperCase();
                    if(val == '' && $('li', obj).length == 0) get($(this).attr("id"), val, obj, dataListTarget, e);
                    else search(val, obj, dataListTarget, e);
                    $(this).attr("data-before", $(this).val());
                });

                $(selector).on("focusout", function(e){ unselectText(e); if(opt.clearOnFocus && opt.default_value != "" && $(this).val() == "") assignSelected(opt.default_value)  });

                // KeyUp Event
                $(selector).on("keyup", function(e){
                    var obj = $('#'+$(e.target).attr(opt.datalistAttr)).next();
                    obj.attr("id", $(e.target).attr(opt.datalistAttr)+"_ul");
                    var val = $(this).val().toUpperCase();

                    if((e.keyCode == 27 || ((e.keyCode == 8 || e.keyCode == 46)) && val=="") || (e.keyCode != 13 && e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 9)){
                        get($(this).attr("id"), val, obj, dataListTarget, e);
                    }
                });

                // KeyDown Event
                $(selector).on("keydown", function(e){
                    var obj = $('#'+$(e.target).attr(opt.datalistAttr)).next();
                    obj.attr("id", $(e.target).attr(opt.datalistAttr)+"_ul");
                    var val = $(this).val().toUpperCase();

                    if(e.which == 27){ $(selector).val($(selector).attr("data-before")); }

                    if(e.keyCode == 40){
                        if(empty($('#'+obj.attr("id")))) return false;
                        if(obj.css("display") == 'none'){
                            if(val == '' && $('li', obj).length == 0) get($(this).attr("id"), val, obj, dataListTarget, e);
                            else search(val, obj, dataListTarget, e);
                        }
                        obj.show();
                        var firstSel = $('li.hover:first', obj);
                        if(firstSel.length > 0 && firstSel.length - firstSel.index() != 1){ var target = firstSel.next(); } else { var target = $('li:not(.hover):first', obj); }

                        target.addClass("hover");
                        if(firstSel.length > 0) firstSel.removeClass("hover");
                        if(firstSel.index() == $('li',obj).length -1) { target = $('li:not(.hover):first', obj); target.addClass("hover"); }

                        var s = target.parent().scrollTop(), h = target.parent().height(), p = target.position().top;
                        if(p +target.innerHeight() > h) target.parent().scrollTop(s+target.innerHeight());
                        else if(p <= 0) target.parent().scrollTop(0);

                    } else if(e.keyCode == 38){
                        if(empty($('#'+obj.attr("id")))) return false;
                        var firstSel = $('li.hover:first', obj);
                        if(firstSel.length > 0){ var target = firstSel.prev(); } else { var target = $('li:not(.hover):first', obj); }

                        target.addClass("hover");
                        if(firstSel.length > 0) firstSel.removeClass("hover");
                        if(firstSel.index() == 0) { target = $('li:not(.hover):last', obj); target.addClass("hover"); }

                        var s = target.parent().scrollTop(), h = target.parent().height(), p = target.position().top;
                        if(p < 0) target.parent().scrollTop(s+p);
                        else if(s == 0 && p == target.innerHeight()*target.index()) target.parent().scrollTop(p-h+target.innerHeight());
                    } else if(e.keyCode == 9){
                        var e = $.Event('keypress');
                        e.which = 13;
                        $('#'+$(this).attr("id")).trigger(e);
                        $('input['+opt.datalistAttr+'] + * + ul').hide();

                    } else if((e.keyCode == 27 || ((e.keyCode == 8 || e.keyCode == 46)) && val=="") || e.keyCode != 13){
                        get($(this).attr("id"), val, obj, dataListTarget, e);
                    }
                });

		$('body').on('click.hideMenu', function(e) { if (typeof $(e.target).data("list") == "undefined" || $(e.target).data("list").indexOf("_dataList") == -1) $('input[' + opt.datalistAttr + '] + * + ul').hide(); }); 
                $(selector).on("keypress", function(e){ if(e.which == 13){ var targetID = $('#'+$(e.target).attr(opt.datalistAttr)+"_ul li.hover"); select(targetID[0], targetID.html()); return false; } });

                $(selector).focusin(function(e){ if(!opt.placeholder){ if($(e.target).val() == opt.requiredMessage) $(e.target).val('')}});
                $(selector).focusout(function(e){
                    setTimeout(function(){ isValid(); }, 100);
                });

            } else {
                var vst = opt.value_selected_to;
                if(vst != ""){
                    $(selector).on("change", function(){
                        $('#'+vst).val($(this).val());
                    });
                }
                get(selector, '', null, dataListTarget, null);
            }
            
            if(!opt.ajax){
                window.onload = function (){
                    assignByDefault();
                    if(opt.selected_value != "") assignSelected(opt.selected_value);
                };
            }
            if(opt.selected_value != ""){ assignSelected(opt.selected_value); }
            
            return this;
        },
        update: function(value) {
            assignSelected(value);
        },
        destroy: function() {
            var selName = selector.replace("#", '');
            var c = document.getElementById(selName);
            var jqc = $(c);

            // Copy the attriibutes to new input
            for (var i = 0, atts = c.attributes, n = atts.length; i < n; i++){
                var attr = atts[i].nodeName;
                jqc.next().attr(attr, jqc.attr(attr));
            }
            jqc.next().next().remove();
            jqc.next().css("display", '');
            jqc.remove();
        }
    };
    
    if ( typeof options === 'object' || ! options ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
    } else if ( methods[options] ) {
        return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } 
};
