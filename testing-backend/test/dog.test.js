const dogRepo = require("../repository/dog");

describe("get dog images", () => {
  test("execute images function on repository dogs.js", async () => {
    const result = await dogRepo.images();
    expect(result).toStrictEqual({
      message: [
        "afghan",
        "basset",
        "blood",
        "english",
        "ibizan",
        "plott",
        "walker",
      ],
      status: "success",
    });
  });

  test("mock images function on repository dog.js", async () => {
    dogRepo.images = jest
      .fn()
      .mockReturnValue([
        "afghan",
        "basset",
        "blood",
        "english",
        "ibizan",
        "plott",
        "walker",
      ]);
    result = dogRepo.images();
    expect(result).toStrictEqual([
      "afghan",
      "basset",
      "blood",
      "english",
      "ibizan",
      "plott",
      "walker",
    ]);
  });
});
