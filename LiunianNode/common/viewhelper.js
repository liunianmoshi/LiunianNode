'use strict';

var moment = require('moment');
exports.formatTime = function (data, formatStr) {
    return moment(data).format(formatStr);
}

exports.dropMenuList = function (data,parentId) {
    var html = [];
    html.push("<select class=\"required\" onchange=\"changeSelect()\" name=\"ParentId\">");
    if (data && data.length > 0) {
        parentId = parentId ? parentId : 0;
        var selectStr = '';
        var moduleList = data.filter(function (item) {
            if (item.ParentId == 0) {
                return true;
            }
            return false;
        });

        if (moduleList.length > 0) {
            for (var i = 0; i < moduleList.length; i++) {
                var item = moduleList[i];

                selectStr = '';
                if (parentId == item.ID) {
                    selectStr = "selected=\"selected\"";
                }

                html.push("<option value=" + item.ID + " data=" + item.MenuLevel + "  " + selectStr + ">" + item.MenuName + "</option>");

                if (item.ID == 0) {
                    continue;
                }

                var itemId = item.ID;
                var viewList = data.filter(function (child) {
                    if (child.ParentId == itemId) {
                        return true;
                    }
                    return false;
                });
                if (viewList.length > 0) {
                    for (var i = 0; i < viewList.length; i++) {
                        var view = viewList[i];
                        selectStr = '';
                        if (parentId == view.ID) {
                            selectStr = "selected=\"selected\"";
                        }
                        html.push("<option value=" + view.ID + " data=" + view.MenuLevel + " " + selectStr + " style=\"padding-left:20px;\" >|-" + view.MenuName + "</option>");
                    }
                }
            }      
        }
    }
    html.push("</select>");
    return html.join('');
}


