/***********************************************************
	Filename: {phpok}/js/module.js
	Note	: 后台模型管理涉及到的JS
	Version : 4.0
	Web		: www.phpok.com
	Author  : qinggan <qinggan@188.com>
	Update  : 2012-11-29 21:20
***********************************************************/
//检测标题名称是否为空
function check_title(is_alert)
{
	var c = $("#title").val();
	if(!c)
	{
		$("#title_note").addClass("error").html("名称不能为空！");
		if(is_alert) alert("名称不能为空！");
		return false;
	}
	$("#title_note").removeClass("error").html("");
	return true;
}

function module_check()
{
	var chk_title = check_title(true);
	if(!chk_title) return false;
	return true;
}

//删除字段
function module_field_del(id,title)
{
	var qc = confirm("确定要删除字段："+title+"？删除此字段将同时删除相应的内容信息！");
	if(qc == "0")
	{
		return false;
	}
	var url = get_url("module","field_delete") + "&id="+id;
	var rs = json_ajax(url);
	if(rs.status == "ok")
	{
		direct(window.location.href);
	}
	else
	{
		alert(rs.content);
		return false;
	}
}

function module_field_add(id,fid)
{
	var url = get_url("module","field_add") + "&id="+id;
	url += "&fid="+fid;
	var title = $("#field_title_"+fid).val();
	if(title)
	{
		url += "&title="+$.str.encode(title);
	}
	var note = $("#field_note_"+fid).val();
	if(note)
	{
		url += "&note="+$.str.encode(note);
	}
	var rs = json_ajax(url);
	if(rs.status == "ok")
	{
		direct(window.location.href);
	}
	else
	{
		$.dialog.alert(rs.content);
	}
}

//删除模块信息
function module_del(id,title)
{
	$.dialog.confirm("确定要删除模块：<span style='color:red;font-weight:bold;'>"+title+"</span>?<br />如果模块中有内容，也会相应的被删除，请慎用！",function(){
		var url = get_url("module","delete")+"&id="+id;
		var rs = json_ajax(url);
		if(rs && rs.status == 'ok')
		{
			$.phpok.refresh();
		}
		else
		{
			if(!rs.content) rs.content = "删除失败";
			$.dialog.alert(rs.content);
			return false;
		}
	});
}

//设置状态
function set_status(id)
{
	var url = get_url("module","status") + '&id='+id;
	var rs = json_ajax(url);
	if(rs.status == "ok")
	{
		if(!rs.content) rs.content = '0';
		var oldvalue = $("#status_"+id).attr("value");
		var old_cls = "status"+oldvalue;
		$("#status_"+id).removeClass(old_cls).addClass("status"+rs.content);
		$("#status_"+id).attr("value",rs.content);
	}
	else
	{
		alert(rs.content);
		return false;
	}
}

//编辑字段
function module_field_edit(id)
{
	var url = get_url("module","field_edit") + "&id="+id;
	$.dialog.open(url,{
		"title" : "编辑字段属性",
		"width" : "700px",
		"height" : "95%",
		"resize" : false,
		"lock" : true,
		'close'	: function(){
			direct(window.location.href);
		}
	});
}

function phpok_biz(val)
{
	if(val == "1")
	{
		$("#show_biz_set").show();
	}
	else
	{
		$("#show_biz_set").hide();
	}
}

function module_layout(id,title)
{
	var url = get_url("module","layout") + "&id="+id;
	$.dialog.open(url,{
		"title":"模型："+title+" 后台列表布局",
		"width":"700px",
		"height":"400px",
		"resize": false,
		"lock": true
	});
}

function module_copy(id,title)
{
	var url = get_url("module","copy")+"&id="+id;
	$.dialog.prompt("请设置新模块的名称：",function(val){
		if(!val)
		{
			alert("名称不能为空");
			return false;
		}
		url += "&title="+$.str.encode(val);
		var rs = json_ajax(url);
		if(rs.status == "ok")
		{
			$.dialog.alert("模型 <span class='red'>"+val+"</span> 创建成功",function(){
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