const Message = require('../models/Message');
const successResponse = require('../utils/responseModel');
const { createMessageDto, likeMessageDto } = require('../dto/MessageDto');

class MessageController {
  async create(req, res) {
    const { body: { message }, params: { groupId }, user: { _id } } = req;
    return successResponse({
      res,
      message: 'Message created',
      data: createMessageDto(await Message.create({ message, user: _id, group: groupId })),
    });
  }

  async like(req, res) {
    const { params: { messageId }, user: { _id }, body: { like } } = req;
    const updatedGroup = await Message.findByIdAndUpdate(
      { _id: messageId },
      like ? { $push: { likedBy: _id } } : { $pull: { likedBy: _id } },
      { new: true },
    );
    return successResponse({
      res,
      message: 'Message liked',
      data: likeMessageDto(updatedGroup),
    });
  }
}

module.exports = MessageController;
