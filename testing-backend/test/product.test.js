const { Product } = require("../lib/sequelize");
const productrepo = require("../repository/product");

jest.mock("../lib/sequelize");

describe("unit test for product", () => {
  test("mock fetch product", async () => {
    const products = [
      {
        id: 1,
        name: "Shoes",
        price: 134000,
        quantity: 190,
        createdAt: "2022-11-07T08:18:56.000Z",
        updatedAt: "2022-11-07T08:18:56.000Z",
      },
      {
        id: 2,
        name: "Bag",
        price: 200000,
        quantity: 120,
        createdAt: "2022-11-07T08:19:56.000Z",
        updatedAt: "2022-11-07T08:19:56.000Z",
      },
    ];
    Product.findAll.mockResolvedValue(products);
    const result = await productrepo.findAll();
    expect(result).toEqual(products);
  });
});
