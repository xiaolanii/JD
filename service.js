const db = require('./db.js');
const path = require('path');


exports.allGoods = (req,res) => {
    let sql = 'select * from good';
    db.base(sql,null,(result) => {
        res.json(result);
    })
};


exports.allLogin = (req,res) => {
    let sql = 'select * from user';
    db.base(sql,null,(result) => {
        res.json(result);
    })
};

exports.login = (req,res) =>{
    console.log(req.params.username);
    let username = req.params.username;
    let sql = 'select * from user where username =?';
    let data = [username];
    db.base(sql,data,(result) => {
        if (result!==null){
            res.json(result[0]);
        }
    })

};

exports.toGood = (req,res) => {
    console.log(req.params.id);
    let id = req.params.id;
    let sql = 'select * from good where goodid =?';
    let data = [id];

    db.base(sql,data,(result) => {
        if (result!==null){
            res.json(result[0]);
        }
    })

};

exports.addUser = (req,res) => {
    let info = req.body;
    console.log(info);
    let data = [info.username,info.userpassword];
    let sql = 'insert into user set username=?,userpassword=?';
    db.base(sql,data,(result) => {
        if (result.affectedRows === 1){
            //正确返回1
            res.json({flag : 1});
        }else {
            //错误返回2
            res.json({flag : 2});
        }
    })
};
exports.getUsername = (req,res)=>{
    let username = req.query.username;
    let sql = 'select * from user where username=?';
    let data = [username];
    db.base(sql,data,(result) => {
        res.json(result);
    })
};
exports.getGoodId = (req,res) => {
    let goodid = req.query.goodid;
    let sql = 'select * from good where goodid=?';
    let data = [goodid];
    db.base(sql,data,(result) => {
        res.json(result);
    })
};
exports.allOrders = (req,res) => {
    let sql = 'select * from orders';
    db.base(sql,null,(result) => {
        res.json(result);
    })
};
exports.addOrder = (req,res) => {
    let goodid = req.body.goodid.replace('goodid=','');
    let username = req.body.username.replace('username=','').replace('?goodid='+goodid+'&','');
    console.log(username);
    let sql1 = 'select * from good where goodid=?';
    let data1 = [goodid];
    db.base(sql1,data1,(result) => {
        console.log(result);
        let goodPrice = result[0].goodprice;
        let goodName = result[0].goodname;
        let sql = 'insert into orders set username=?,goodname=?,goodprice=?';
        let data = [username,goodName,goodPrice];
        db.base(sql,data,(result) => {
            if (result.affectedRows === 1){
                //正确返回1
                console.log('添加order成功')
            }else {
                //错误返回2
                console.log('失败')
            }
        })

    });

};
exports.getOrders = (req,res) => {
    let username = req.query.username;
    let sql = 'select * from orders where username=?';
    let data = [username];
    db.base(sql,data,(result) => {
        res.json(result);
    })

};
exports.deleteOrder = (req,res) => {
    let id = req.params.id;
    let sql = 'delete from orders where ordersid=?';
    let data = [id];
    db.base(sql,data,(result) => {
        if (result.affectedRows === 1){
            //正确返回1
            rePaixu();
            res.json({flag : 1});
        }else {
            //错误返回2
            res.json({flag : 2});
        }
    })
};
function rePaixu() {
    let sql = 'ALTER TABLE `orders` DROP `ordersid`;';
    db.base(sql,null,(result) => {

        // ALTER TABLE `news` ADD `NewsID` int NOT NULL FIRST;
        let sql = 'ALTER TABLE `orders` ADD `ordersid` int(11) NOT NULL FIRST;';
        db.base(sql,null,(result) => {
            let sql = 'ALTER TABLE `orders` MODIFY COLUMN `ordersid` int(11) NOT NULL AUTO_INCREMENT,ADD PRIMARY KEY (ordersid);';
            db.base(sql,null,(result) => {
                console.log('修改成功');
            });
        });
    });
}

