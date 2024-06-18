const pagination = async (req, db) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalItems = await db.countDocuments();
  const totalPage = Math.ceil(totalItems / limit);

  let obj = {
    page,
    limit,
    totalPage,
    skip,
    totalItems
  };
  return obj
};
module.exports = pagination;
