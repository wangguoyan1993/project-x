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
 * 确认实验室操作方法
 * @param req
 * @param res
 */
function orderLabConfirm(req, res){
    let labId = req.body.labId;
    let uid = req.body.uid;
    let statusId = req.body.statusId;
    let reason = req.body.reason;

    let sql = `UPDATE t_lab_order SET status_id=${statusId},reason=${reason} WHERE lab_id=${labId} AND uid=${uid}`;

    conDB(sql, (result)=>{
        if(result){
            res.send({
                errorCode : 0,
                data : '操作成功！'
            });
        }
    })
}

/**
 * 查询实验室预约信息
 * @param req
 * @param res
 */
function queryLabOrder(req, res){
    //查询sql语句
    let sql = `SELECT 
    t_lab_order.lab_id AS 'labId',
    t_lab_order.uid AS 'uid',
    t_lab_order.start_time AS 'startTime',
    t_lab_order.end_time AS 'endTime',
    t_lab_order.status_id AS 'statusId',
    t_lab_order.reason AS 'reason',
    t_lab.name AS 'labName',
    t_lab.code AS 'labCode',
    t_lab.collage AS 'collage',
    t_lab.place AS 'place',
    t_lab.time AS 'time',
    main.name AS 'userName',
    main.number AS 'account',
    main.type AS 'userType',
    t_lab_order_status.name AS 'statusName' FROM 
    t_lab_order LEFT JOIN t_lab ON t_lab_order.lab_id = t_lab.id 
    LEFT JOIN main ON t_lab_order.uid = main.id 
    LEFT JOIN t_lab_order_status ON t_lab_order.status_id = t_lab_order_status.id`;

    //连接数据库查询结果
    conDB(sql, (result)=>{
        if(result){
            res.send({
                errorCode : 0,
                data : result
            });
        }
    });
}

/**
 * 预约实验室方法
 * @param req
 * @param res
 */
function orderLab(req, res){
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
}

/**
 * 确认预约实验室
 */
router.post('/orderLabConfirm', (req, res)=>{
    orderLabConfirm(req, res);
});

/**
 * 查询实验室预约信息
 */
router.get('/queryLabOrder', (req, res)=>{
    queryLabOrder(req, res);
});

/**
 * 实验室预约接口
 */
router.post('/orderLab', (req, res)=>{
    orderLab(req, res);
});

module.exports = router;