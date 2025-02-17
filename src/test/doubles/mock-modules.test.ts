jest.mock("../../app/doubles/other-utils", () => ({
  ...jest.requireActual("../../app/doubles/other-utils"),
  calculateComplexity: () => 10,
}));

jest.mock("uuid", () => ({
  v4: () => "123",
}));

import * as OtherUtils from "../../app/doubles/other-utils";

describe("OtherUtils mock", () => {
  it("calculates complexity", () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });

  it("string with id", () => {
    const result = OtherUtils.toLowerCaseWithId("ABC");
    expect(result).toBe("abc123");
  });
});
