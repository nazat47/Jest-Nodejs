import { DataBase } from "../../app/server_app/data/DataBase";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { RequestTestWrapper } from "./test_utils/request-test-wrapper";
import { ResponseTestWrapper } from "./test_utils/response-test-wrapper";

jest.mock("../../app/server_app/data/DataBase");

const requestMock = new RequestTestWrapper();
const responseMock = new ResponseTestWrapper();

const fakeServer = {
  listen: () => {},
  close: () => {},
};

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return fakeServer;
  },
}));

describe("Register requests test suit", () => {
  afterEach(() => {
    requestMock.clearFields();
    responseMock.clearFields();
  });

  it("should register new users", async () => {
    requestMock.method = HTTP_METHODS.POST;
    requestMock.body = {
      userName: "usernamme",
      password: "password",
    };
    requestMock.url = "localhost:8080/register";
    jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.body).toEqual(
      expect.objectContaining({ userId: expect.any(String) })
    );
  });

  it("should reject request with no username and password", async () => {
    requestMock.method = HTTP_METHODS.POST;
    requestMock.body = {};
    requestMock.url = "localhost:8080/register";

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseMock.body).toBe("userName and password required");
  });

  it("should do nothing for unsupported methods", async () => {
    requestMock.method = HTTP_METHODS.DELETE;
    requestMock.body = {};
    requestMock.url = "localhost:8080/register";

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseMock.statusCode).toBeUndefined();
    expect(responseMock.body).toBeUndefined();
  });
});
