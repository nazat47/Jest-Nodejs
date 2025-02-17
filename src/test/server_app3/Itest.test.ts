import * as generated from "../../app/server_app/data/IdGenerator";
import { Account } from "../../app/server_app/model/AuthModel";
import { Reservation } from "../../app/server_app/model/ReservationModel";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";

describe.skip("Server app integration test", () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  });

  afterAll(() => {
    server.stopServer();
  });

  const someUser: Account = {
    id: "",
    userName: "naz",
    password: "password",
  };

  const someReservation: Reservation = {
    id: "",
    endDate: "somedate",
    startDate: "startDate",
    room: "room",
    user: "naz",
  };

  it("should register new user", async () => {
    const result = await fetch("http://localhost:8080/register", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });

    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
  });

  let token: string;

  it("should login registered user", async () => {
    const result = await fetch("http://localhost:8080/login", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });

    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token;
  });

  let createdReservation: string;

  it("should create reservation if authorized", async () => {
    const result = await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.reservationId).toBeDefined();
    createdReservation = resultBody.reservationId;
  });

  it("should get reservation if authorized", async () => {
    const result = await fetch(
      `http://localhost:8080/reservation/${createdReservation}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );

    const resultBody = await result.json();

    const expectedReservation = structuredClone(someReservation);
    expectedReservation.id = createdReservation;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(expectedReservation);

    console.log(process.env.HOST);
  });

  it("should create and retrieve multiple reservation if authorized", async () => {
    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const getAll = await fetch(`http://localhost:8080/reservation/all`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });

    const resultBody = await getAll.json();

    expect(getAll.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toHaveLength(4);
  });

  it("should update reservation if authorized", async () => {
    const result = await fetch(
      `http://localhost:8080/reservation/${createdReservation}`,
      {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify({
          startDate: "updatedDate",
        }),
        headers: {
          authorization: token,
        },
      }
    );

    expect(result.status).toBe(HTTP_CODES.OK);

    const newResult = await fetch(
      `http://localhost:8080/reservation/${createdReservation}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );

    const newResultBody: Reservation = await newResult.json();

    expect(newResultBody.startDate).toBe("updatedDate");
  });

  it("should delete reservation if authorized", async () => {
    const result = await fetch(
      `http://localhost:8080/reservation/${createdReservation}`,
      {
        method: HTTP_METHODS.DELETE,
        headers: {
          authorization: token,
        },
      }
    );

    expect(result.status).toBe(HTTP_CODES.OK);

    const newResult = await fetch(
      `http://localhost:8080/reservation/${createdReservation}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );

    expect(newResult.status).toBe(HTTP_CODES.NOT_fOUND);
  });

  it("snapshot demo", async () => {
    jest.spyOn(generated, "generateRandomId").mockReturnValueOnce("12364");

    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const newResult = await fetch(`http://localhost:8080/reservation/1234`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });
    const newResultBody: Reservation = await newResult.json();

    expect(newResultBody).toMatchSnapshot();
  });
});
