import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => ({
      insert: insertMock,
      getBy: getByMock,
    })),
  };
});

describe("UserCredentialsDataAccess test suit", () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: "",
    userName: "someName",
    password: "pass123",
  };

  const someId = "123";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add user and return id", async () => {
    insertMock.mockResolvedValueOnce(someId);

    const actual = await sut.addUser(someAccount);

    expect(actual).toBe(someId);
    expect(insertMock).toHaveBeenLastCalledWith(someAccount);
  });

  it("should get user by id and return user", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

   // await sut.addUser(someAccount);
    const actual = await sut.getUserById(someId);

    expect(actual).toEqual(someAccount);
    expect(getByMock).toHaveBeenLastCalledWith("id", someId);
  });

  it("should get user by name and return user", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    //await sut.addUser(someAccount);
    const actual = await sut.getUserByUserName(someAccount.userName);

    expect(actual).toEqual(someAccount);
    expect(getByMock).toHaveBeenLastCalledWith(
      "userName",
      someAccount.userName
    );
  });
});
