/**
 * Created by Mr.Wang on 2017/8/29.
 */
/**
 * 生成pdf方法
 * @description : 通过传输服务器文件路径进行下载文件
 */
const ibcpPDF = (function(){
    'use strict';
    const download  = function(url, fileName) {
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    };

    return {
        download : download,
    };
})();

/**
 * 通过接口获取地址下载pdf文件
 * @param url   文件所在地址
 * @param param  //orderId,sid,title：服务器生成的文件名称（uuid）
 */
ibcpPDF.getPage = function(url, param){
    'use strict';
    let _this = this;
    ibcpAjax.Select(url, param, true, function(result){
      let fileName = result.data.fileName;
      let _pdfUrl = serverHead + result.data.pdfPath;
        _this.download(_pdfUrl, fileName);
    },false,false,'正在获取PDF文件...');
};

/**
 * 通过中间层接口调用phantomjs下载pdf文件
 * @author Mr.Wang
 * @description 此方法用于对应调用中间层接口，调用phantomjs生成pdf文件并下载
 * @param url
 * @param param
 */
ibcpPDF.getPageByMiddle = function(url, param){
    'use strict';
    let _this = this;
    ibcpAjax.Select(url, param, true, function(result){
        let fileName = result.data.fielName;
        let _pdfUrl = middleHost + result.data.pdfPath;
        _this.download(_pdfUrl, fileName);
    });
};