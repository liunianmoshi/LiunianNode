'use strict';

var returnResult = {
    closeSuccess: function (navTabId) {
        return {
            statusCode: "200",
            message: "数据保存成功！",
            navTabId: navTabId,
            rel: navTabId,
            callbackType: "closeCurrent",
            forwardUrl: "",
            confirmMsg: ""
        }
    },
    saveSuccess: function (navTabId) {
        return {
            statusCode: "200",
            message: "数据保存成功！",
            navTabId: navTabId,
            rel: "",
            callbackType: "",
            forwardUrl: "",
            confirmMsg: ""
        }
    },
    failed: function () {
        return {
            statusCode: "300",
            message: "操作失败！"
        }
    },
    deleteSuccess: function (navTabId) {
        return {
            statusCode : "200",
            message : "数据删除成功！",
            navTabId : navTabId,
            rel : "",
            callbackType : "",
            forwardUrl : "",
            confirmMsg : ""
        }
    },
    showFail: function (msg) {
        return {
            statusCode : "300",
            message : msg
        };
    }
};

module.exports = returnResult;