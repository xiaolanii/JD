/*
封装操作数据库通用api
 */

const mysql = require('mysql');

var connection =  mysql.createConnection( { multipleStatements: true } );

exports.base = (sql,data,callback) => {

    //创建数据库链接
    const connection = mysql.createConnection({

        host: 'localhost',       //数据库所在的服务器ip或者域名
        user: 'root',            //登录数据库的账号
        password: '',            //密码
        database: 'jd'         //数据库名称

    });
//执行链接操作
    connection.connect();
//操作数据库(数据库操作是异步的)
    console.log('数据库连接成功');
    connection.query(sql,data,function (error,results,fields) {
        if (error) throw error;
        callback(results);
    });
//关闭数据库
    connection.end();

};