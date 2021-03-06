'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index.js');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  let list=[];
   userRecords.forEach(user => {
    list.push(user.username,user.id);
  });
  res.status(200).json(list);
});
authRouter.delete(`/users/:id`, bearerAuth, permissions('delete'), async (req, res, next) => {
  let id = req.params.id;
  try{
    let deletedRecord= await users.destroy({where:{id}})
    res.status(200).json(deletedRecord);
}catch(err){console.log(err);}

}),

authRouter.put(`/users/:id`, bearerAuth, permissions('delete'), async (req, res, next) => {
  let id = req.params.id;
  const obj = req.body;
  try{
    let findRecord= await users.findOne({where:{id}});
    let updatedRecord= await findRecord.update(obj);
    res.status(200).json(updatedRecord);
}catch(err){console.log(err);}

}),

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;












