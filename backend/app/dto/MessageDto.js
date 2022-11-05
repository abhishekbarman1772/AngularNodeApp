const createMessageDto = (message) => ({
  id: message.id,
  message: message.message,
  user: message.user,
  group: message.group,
  likedBy: message.likedBy.map((user) => user),
});

const likeMessageDto = (message) => ({
  id: message.id,
  message: message.message,
  user: message.user,
  group: message.group,
  likedBy: message.likedBy.map((user) => user),
});

module.exports = {
  createMessageDto,
  likeMessageDto,
};
