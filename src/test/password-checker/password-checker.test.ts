import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/password-checker/password-checker";

describe("PasswordChecker suit", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("should check if password is less than 8 characters", () => {
    const actual = sut.checkPassword("1234567");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("should check if password is more than 8 characters", () => {
    const actual = sut.checkPassword("12345678Ad");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it("should check if password has no uppercase", () => {
    const actual = sut.checkPassword("jkhasder");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("should check if password has uppercase", () => {
    const actual = sut.checkPassword("sdhjsA");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("should check if password has no lowercase", () => {
    const actual = sut.checkPassword("OSDJFOISJ");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("should check if password has lowercase", () => {
    const actual = sut.checkPassword("SIKDJFLSIDf");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("should check valid complex password", () => {
    const actual = sut.checkPassword("SIKDJsdf34FLSIDf");
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });

  it("should check if admin password has no number", () => {
    const actual = sut.checkAdminPassword("jkdfnuhasdisdJHd");
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(false);
  });

  it("should check if admin password has number", () => {
    const actual = sut.checkAdminPassword("jkdfnu34hasdisdJHd");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
