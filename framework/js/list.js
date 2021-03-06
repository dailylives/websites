/***********************************************************
	Filename: {phpok}/js/list.js
	Note	: 内容管理里的JS
	Version : 4.0
	Web		: www.phpok.com
	Author  : qinggan <qinggan@188.com>
	Update  : 2013-02-21 11:13
***********************************************************/
function project_check()
{
	var id = $("#id").val();
	var title = $("#title").val();
	if(title) title = $.trim(title);
	if(!title)
	{
		$.dialog.alert("名称不能为空");
		return false;
	}
	return true;
}

function edit_check()
{
	var id = $("#id").val();
	var title = $("#title").val();
	if(title) title = $.trim(title);
	if(!title)
	{
		$.dialog.alert("主题不能为空");
		return false;
	}
	var identifier = $("#identifier").val();
	if(identifier) identifier = $.trim(identifier);
	if(identifier)
	{
		var url = get_url("list","identifier")+"&sign="+$.str.encode(identifier);
		if(id)
		{
			url += "&id="+id;
		}
		var rs = json_ajax(url);
		if(rs.status != "ok")
		{
			$.dialog.alert(rs.content);
			return false;
		}
	}	
	return true;
}

function content_del(id,title)
{
	$.dialog.confirm("确定要删除：<span class='red'>"+title+"</span>？<br />删除后是不能恢复的？",function(){
		var url = get_url("list","del") +"&id="+id;
		var rs = json_ajax(url);
		if(rs.status == "ok")
		{
			$.dialog.alert("主题删除成功",function(){
				direct(window.location.href);
			});
		}
		else
		{
			$.dialog.alert(rs.content);
			return false;
		}
	});
}

function tab_id(id)
{
	$("#float_tab li").each(function(i){
		if(i == id)
		{
			$(this).removeClass("tab_out").addClass("tab_over");
			$("#content_"+id).show();
		}
		else
		{
			$(this).removeClass("tab_over").addClass("tab_out");
			$("#content_"+i).hide();
		}
	});
}

// 显示高级属性配置
function show_advanced()
{
	if($("#advanced").is(":hidden"))
	{
		$("#advanced").show();
	}
	else
	{
		$("#advanced").hide();
	}
}

function project_delete(id)
{
	var title = $("#txt_"+id).html();
	var url = $("#delurl_"+id).attr("href");
	if(!url)
	{
		$.dialog.alert("配置有错误，请检查");
		return false;
	}
	$.dialog.confirm("确定要删除 <span class='red'>"+title+"</span> 吗？删除后其内容将会一起被清除掉",function(){
		var rs = json_ajax(url);
		if(rs.status == "ok")
		{
			$.dialog.alert("删除成功",function(){
				direct(window.location.href);
			});
		}
		else
		{
			$.dialog.alert(rs.content);
			return false;
		}
	});
}

function project_config(id)
{
	var url = $("#config_"+id).attr("href");
	if(!url)
	{
		$.dialog.alert("配置有错误，请检查");
		return false;
	}
	direct(url);
}

function project_content(id)
{
	var url = $("#content_"+id).attr("href");
	if(!url)
	{
		$.dialog.alert("配置有错误，请检查");
		return false;
	}
	direct(url);
}

function set_status(id)
{
	var url = get_url("list","content_status") + '&id='+id;
	var rs = json_ajax(url);
	if(rs.status == "ok")
	{
		if(!rs.content) rs.content = '0';
		var oldvalue = $("#status_"+id).attr("value");
		var old_cls = "status"+oldvalue;
		$("#status_"+id).removeClass(old_cls).addClass("status"+rs.content).attr("value",rs.content);
	}
	else
	{
		$.dialog.alert(rs.content);
		return false;
	}
}

function set_sort()
{
	var ids = $.input.checkbox_join();
	if(!ids)
	{
		$.dialog.alert("未指定要排序的ID");
		return false;
	}
	var url = get_url("list","content_sort");
	var list = ids.split(",");
	for(var i in list)
	{
		var val = $("#sort_"+list[i]).val();
		url += "&sort["+list[i]+"]="+val;
	}
	var rs = json_ajax(url);
	if(rs.status == "ok")
	{
		direct(window.location.href);
	}
	else
	{
		$.dialog.alert(rs.content);
		return false;
	}
}

function set_delete()
{
	var ids = $.input.checkbox_join();
	if(!ids)
	{
		$.dialog.alert("未指定要删除的主题");
		return false;
	}
	$.dialog.confirm("确定要删除选定的主题吗？<br />删除后是不能恢复的？",function(){
		var url = get_url("list","del") +"&id="+$.str.encode(ids);
		var rs = json_ajax(url);
		if(rs.status == "ok")
		{
			$.dialog.alert("主题删除成功",function(){
				direct(window.location.href);
			});
		}
		else
		{
			$.dialog.alert(rs.content);
			return false;
		}
	});
}

function show_order()
{
	if($("#page_sort").is(":hidden"))
	{
		$("#page_sort").show();
	}
	else
	{
		$("#page_sort").hide();
	}
}

function page_sort()
{
	var ids = $.input.checkbox_join();
	if(!ids)
	{
		$.dialog.alert("未指定要排序的ID");
		return false;
	}
	var url = get_url("list","sort");
	var list = ids.split(",");
	for(var i in list)
	{
		var val = $("#taxis_"+list[i]).val();
		url += "&sort["+list[i]+"]="+val;
	}
	var rs = json_ajax(url);
	if(rs.status == "ok")
	{
		$.dialog.alert("排序更新成功",function(){
			direct(window.location.href);
		});
	}
	else
	{
		$.dialog.alert(rs.content);
		return false;
	}
}

function plus_price()
{
	var m = 1;
	$("#ext_price tr").each(function(i){
		if(i > 1)
		{
			m++;
		}
	});
	var html = '<tr id="ext_price_'+m+'"><td><input type="text" name="price_title[]" value="" /></td><td><input type="text" name="qty[]" value="" class="short" /></td><td><input type="text" name="price[]" value="" /></td><td><input type="button" value="-" onclick="minus_price('+m+')" class="btn" /></td></tr>';
	var t = m - 1;
	$("#ext_price_"+t).after(html);
}

function minus_price(id)
{
	$("#ext_price_"+id).remove();
}

function preview_attr(id)
{
	var url = get_url("res_action","preview") + "&id="+id;
	$.dialog.open(url,{
		title: "预览",
		lock : true,
		width: "700px",
		height: "70%",
		resize: true
	});
}

function cate_move()
{
	var ids = $.input.checkbox_join();
	if(!ids)
	{
		$.dialog.alert("未指定要移动的主题");
		return false;
	}
	var cate_id = $("#cate_id").val();
	if(!cate_id || cate_id  == "undefined")
	{
		$.dialog.alert("未指定要目标");
		return false;
	}
	var tmp = cate_id.split(":");
	if(tmp[1] && (tmp[0] == "add" || tmp[0] == "delete"))
	{
		var attr = tmp[1];
		var url = get_url("list","attr_set")+"&ids="+$.str.encode(ids)+"&val="+tmp[1]+"&type="+tmp[0];
		var rs = json_ajax(url);
		if(!rs || rs.status != "ok")
		{
			if(!rs.content) rs.content = "操作失败";
			$.dialog.alert(rs.content);
			return false;
		}
		direct(window.location.href);
	}
	else
	{
		var url = get_url('list',"move_cate")+"&ids="+$.str.encode(ids)+"&cate_id="+cate_id;
		var rs = json_ajax(url);
		if(!rs || rs.status != "ok")
		{
			if(!rs.content) rs.content = "迁移失败";
			$.dialog.alert(rs.content);
			return false;
		}
		direct(window.location.href);
	}
}