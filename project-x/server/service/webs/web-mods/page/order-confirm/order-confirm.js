/**
 * Title    :
 * Desc     :
 * version  : 1.0
 * History  : 2018/5/30 by Mr.Wang
 *
 */

/**
 *
 */
let orderConfirm = (function(){
    let $table = $('#order_table');
    let $editBtn = $('#edit_btn');

    /**
     * 显示预约实验室表格
     */
    function showTable(){
        let dataPath = `${serverPath}labs/queryLabOrder`;
        ibcpAjax.Select(dataPath, '', true, (result)=>{
            if(result){
                let data = result.data;
                if(data.length > 0){
                    $table.bootstrapTable('load', data);
                }
            }
        });
    }

    /**
     * 编辑预约信息
     */
    function editOrder(data){
        let index = ibcpLayer.ShowDiv('edit-order.html', '确认预约信息', '400px', '270px', ()=>{
            //确认按钮事件
            $('#confirm_btn').on('click', ()=>{
                let api = `${serverPath}labs/orderLabConfirm`;

                let reason = $('#reason').val().toString();

                if(!reason){
                    ibcpLayer.ShowTips('请输入原因！', $('#reason'));
                    return;
                }

                let type = $('#type').val();

                let param = {
                    labId : data.labId,
                    uid : data.uid,
                    statusId : type,
                    reason : reason
                };

                ibcpAjax.Insert(api, param, true, (result)=>{
                    ibcpLayer.Close(index);
                    ibcpLayer.ShowOK('编辑成功！');
                    showTable();
                });
            });

            //取消按钮事件
            $('#cancel_btn').on('click', ()=>{
                ibcpLayer.Close(index);
            })
        });
    }

    /**
     * 事件初始化
     */
    function eventInit(){
        //编辑按钮点击事件
        $('#edit_btn').on('click', ()=>{
            let data = $table.bootstrapTable('getSelections')[0];
            if(data){
                editOrder(data);
            }else{
                ibcpLayer.ShowMsg('请选择目标数据！');
            }
        });
    }

    function init(){
        showTable();
        eventInit();
    }

    return {
        init : init
    }
})();

$(function(){
    orderConfirm.init();
});