module.exports = {
  generateQuery: (req, res, next) => {
    let updateQuery = "UPDATE users SET ";
    let arrData = [];

    for (let key in req.body) {
      updateQuery += `${key} = ?, `;
      arrData.push(req.body[key]);
    }

    arrData.push(req.params.id);
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += " WHERE id = ?";

    req.body.string = updateQuery;
    req.body.data = arrData;

    next();
  },
};
