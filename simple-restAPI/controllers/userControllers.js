let database = [
  {
    id: 5,
    name: "Budi",
    age: 12,
  },
  {
    id: 6,
    name: "Anna",
    age: 14,
  },
];

module.exports = {
  register: (req, res) => {
    database.push(req.body);
    res.status(200).send(database);
  },
};
