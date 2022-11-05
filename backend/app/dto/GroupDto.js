const createGroupDto = (group) => ({
  id: group._id,
  name: group.name,
  users: group.users,
});

const updateGroupDto = (group) => ({
  id: group._id,
  name: group.name,
  users: group.users,
});

const groupsDto = (groups) => groups.map((group) => ({
  id: group._id,
  name: group.name,
  users: group.users.map((user) => user),
}));

module.exports = {
  createGroupDto,
  updateGroupDto,
  groupsDto,
};
