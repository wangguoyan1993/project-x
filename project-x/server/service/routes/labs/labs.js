/**
 * Title    : 实验室相关接口
 * Desc     :
 * version  : 0.1
 * History  : 2018/5/26 by Mr.Wang
 *
 */

let express = require('express');

let router = express.Router();
let conDB = require('../mysql-connector/mysql-connector');

/**
 * 实验室预约接口
 */
router.post('/orderLab', (req, res)=>{

    let uid = req.body.uid * 1;                 //用户id
    let labId = req.body.labId * 1;             //实验室id
    let startTime = req.body.startTime;         //开始时间
    let endTime = req.body.endTime;             //结束时间
    let status = 1;                             //预约状态
    let reason = req.body.reason;               //预约原因

    //定义sql语句
    let sql = `INSERT INTO t_lab_order
    (lab_id,uid,start_time,end_time,status_id,reason) 
    VALUES 
    (${labId},${uid},${startTime},${endTime},${status},${reason})`;

    //连接数据库
    conDB(sql, (result)=>{
        if(result){
            res.send({
                errorCode : 0,
                data : '预约成功！'
            });
        }else{
            res.send({
                errorCode : 1,
                data : '预约失败！'
            });
        }
    });
});

module.exports = router;