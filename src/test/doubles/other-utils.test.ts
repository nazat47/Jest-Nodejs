import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCallback,
} from "../../app/doubles/other-utils";

describe.skip("OtherUtils test suit", () => {
  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    it("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("abc");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("abc");
    });

    it("Use a spy to track calls to other module", () => {
      const consolLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consolLogSpy).toHaveBeenCalledWith("abc");
    });

    it("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut as any, "externalService").mockImplementation(() => {
        console.log("Called mock implementation");
      });
      (sut as any).externalService();
    });
  });

  describe("OtherUtils callbacks using Jest mocks", () => {
    const callbackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid arg - track callback", () => {
      const actual = toUpperCaseWithCallback("", callbackMock);
      expect(actual).toBeUndefined();
      expect(callbackMock).toHaveBeenCalledWith("Invalid argument!");
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it("calls callback for valid arg - track callback", () => {
      const actual = toUpperCaseWithCallback("abv", callbackMock);
      expect(actual).toBe("ABV");
      expect(callbackMock).toHaveBeenCalledWith(`Called function with abv`);
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("OtherUtils callbacks", () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callbackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it("calls callback for invalid arg - track callback", () => {
      const actual = toUpperCaseWithCallback("", callbackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid arg - track callback", () => {
      const actual = toUpperCaseWithCallback("abv", callbackMock);
      expect(actual).toBe("ABV");
      expect(cbArgs).toContain(`Called function with abv`);
      expect(timesCalled).toBe(1);
    });
  });

  it("calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field: "some",
        field2: "another some",
      },
    };

    const actual = calculateComplexity(someInfo);
    expect(actual).toBe(10);
  });

  it("calls callback for invalid arg", () => {
    const actual = toUpperCaseWithCallback("", () => {});
    expect(actual).toBeUndefined();
  });

  it("calls callback for valid arg", () => {
    const actual = toUpperCaseWithCallback("abv", () => {});
    expect(actual).toBe("ABV");
  });
});
