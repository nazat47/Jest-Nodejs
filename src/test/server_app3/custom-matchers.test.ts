import { Reservation } from "../../app/server_app/model/ReservationModel";

expect.extend({
  toBeValidReservation(reservation: Reservation) {
    const isValidId = reservation.id.length > 5;
    const isValidUser = reservation.user.length > 5;

    return {
      pass: isValidId && isValidUser,
      message: () => "expected reservation to have valid id and user",
    };
  },
  toHaveUser(reservation: Reservation, user: string) {
    return {
      pass: user === reservation.user,
      message: () =>
        `expected reservation to have user ${user}, but received ${reservation.user}`,
    };
  },
});

interface CustomMatchers<R> {
  toBeValidReservation(): R;
  toHaveUser(user: string): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

const someReservation: Reservation = {
  id: "123435",
  endDate: "somedate",
  startDate: "startDate",
  room: "room",
  user: "nazatm",
};

describe("custom matchers test", () => {
  it("check for valid reservation", () => {
    expect(someReservation).toBeValidReservation();
    expect(someReservation).toHaveUser("nazatm");
  });
});
