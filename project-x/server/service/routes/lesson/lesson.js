/**
 * Title    : 课程管理接口
 * Desc     :
 * version  : 0.1
 * History  : 2018/5/26 by Mr.Wang
 *
 */

let express = require('express');

let router = express.Router();
let conDB = require('../mysql-connector/mysql-connector');

/**
 * 获取全部课程信息方法
 * @param req
 * @param res
 */
function queryAllLesson(req, res){
    let sql = `SELECT t_lesson.*, 
    t_lesson_class.name AS 'lessonClassCode', 
    t_lesson_class.code AS 'lessonClassName', 
    t_lesson_class.id AS 'lessonClassId' FROM 
    t_lesson LEFT JOIN t_lesson_class ON 
    t_lesson.property = t_lesson_class.id`;

    //连接数据库查询课表数据
    conDB(sql, (result)=>{
        if(result.length > 0){
            res.send({
                sig : 0,
                data : result
            });
        }
    });
}

/**
 * 获取全部课程信息接口
 */
router.get('/queryAllLesson', (req, res)=>{
    queryAllLesson(req, res);
});

module.exports = router;