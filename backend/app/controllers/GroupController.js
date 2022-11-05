const mongoose = require('mongoose');
const Group = require('../models/Group');
const User = require('../models/User');
const NotFoundError = require('../errorhandler/NotFoundError');
const InvalidInputError = require('../errorhandler/InvalidInputError');
const successResponse = require('../utils/responseModel');
const { createGroupDto, updateGroupDto, groupsDto } = require('../dto/GroupDto');
const Message = require('../models/Message');

class GroupController {
  async create(req, res) {
    const { name, email } = req.body;
    const group = await Group.findOne({ name });
    if (group) throw new NotFoundError('Please use different group name');
    const users = (await User.find({ email: { $in: email } })).map((user) => user._doc._id);
    return successResponse({
      res,
      message: 'Group created',
      data: createGroupDto(await Group.create({ name, users, owner: req.user._id })),
    });
  }

  async update(req, res) {
    const { body: { name, users }, params: { groupId } } = req;
    const group = await Group.findOne({ _id: { $ne: groupId }, name });
    if (group) throw new NotFoundError('Please use different group name');
    const updatedGroup = await Group.findByIdAndUpdate(
      { _id: groupId },
      { $addToSet: { users: { $each: users } }, name },
      { new: true },
    );
    return successResponse({
      res,
      message: 'Group Updated',
      data: updateGroupDto(updatedGroup),
    });
  }

  async get(req, res) {
    const { search } = req.query;
    return successResponse({ res, message: 'Groups found', data: groupsDto(await Group.find({ name: { $regex: new RegExp(search) }, $options: 'i' })) });
  }

  async delete(req, res) {
    const { params: { groupId }, user: { _id } } = req;
    if (!await Group.findOne({ owner: _id, group: groupId })) throw new InvalidInputError('You are not the owner of this group');

    const session = await mongoose.startSession();
    await Message.deleteMany({ group: groupId }, { session });
    await Group.deleteOne({ _id: groupId }, { session });
    await session.endSession();

    return successResponse({ res, message: 'Group Deleted' });
  }
}

module.exports = GroupController;
