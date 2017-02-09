'use strict';

function pagedList(page, total, pagesize, isNav) {
    if (!pagesize || pagesize < 1) {
        pagesize = 20;
    }
    if (!page || page < 1) {
        page = 1;
    }
    if (!total || total < 0) {
        total = 0;
    }
    if (!isNav) {
        isNav = true;
    }

    this.pageIndex = page;
    this.totalCount = total;
    this.pageSize = pagesize;
    this.pageCount = function () {
        return this.totalCount < 1 ? 0 : (this.totalCount - 1) / this.pageSize;
    }

    this.hasPreviousPage = function () {
        return ((this.pageIndex - 1) > 0);
    }

    this.hasNextPage = function () {
        return ((this.pageIndex) * this.pageSize) < this.totalCount;
    }

    this.isNav = function () {
        return isNav;
    }

    this.renderPage = function () {
        var html = [];
        if (this.totalCount > 0) {
            html.push("<div class='panelBar'><div class='pages'><span>显示</span><select class='combox' name='numPerPage' onchange='navTabPageBreak({numPerPage:this.value})'>");
            html.push("<option value='20' " + (this.pageSize == 20 ? "selected" : "") + ">20</option>");
            html.push("<option value='50' " + (this.pageSize == 50 ? "selected" : "") + ">50</option>");
            html.push("<option value='100' " + (this.pageSize == 100 ? "selected" : "") + ">100</option>");
            html.push("<option value='200' " + (this.pageSize == 200 ? "selected" : "") + ">200</option>");
            html.push("</select><span>条，共" + this.totalCount + "条</span></div>");
            html.push("<div class='pagination' targetType='" +(this.isNav()? "navTab" : "dialog")+"'");
            html.push("totalCount = '" + this.totalCount + "'");
            html.push("numPerPage='" + this.pageSize + "' pageNumShown='10' currentPage='" + this.pageIndex + "'></div>");
        }
        return html.join("");
    } 
}
module.exports = pagedList;