const express = require('express');
const router = express.Router();
const service = require('./service.js');

//提供所有的商品信息
router.get('/goods',service.allGoods);
//登录
router.get('/login',service.allLogin);
//去登陆页面
router.get('/login/:username',service.login);
//去商品页面
router.get('/goods/good:id',service.toGood);
//注册
router.post('/login/user',service.addUser);
//获取url中的username
router.get('/goods/username',service.getUsername);
//获取url中的goodid
router.get('/goods/good',service.getGoodId);
//获取订单表中数据
router.get('/orders',service.allOrders);
//添加订单数据
router.post('/orders/addorder',service.addOrder);
//去购物车
router.get('/orders/order',service.getOrders);
//删除购物车
router.delete('/orders/order/:id',service.deleteOrder);



module.exports = router;






