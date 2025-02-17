import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type SomeType = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suit", () => {
  let sut: DataBase<SomeType>;
  const fakeId = "1234";
  const someObject = {
    id: "",
    name: "Naz",
    color: "Silver",
  };

  const someObjec1 = {
    id: "",
    name: "Naz1",
    color: "Silver",
  };

  const someObjec2 = {
    id: "",
    name: "Raima2",
    color: "Silver",
  };

  beforeEach(() => {
    sut = new DataBase<SomeType>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after inserting", async () => {
    const actual = await sut.insert({
      id: "",
    } as any);
    expect(actual).toBe(fakeId);
  });

  it("should get the element after inserting", async () => {
    const id = await sut.insert(someObject);
    const actual = await sut.getBy("id", id);
    expect(actual).toBe(someObject);
  });

  it("should find all elements with the same property", async () => {
    await sut.insert(someObjec1);
    await sut.insert(someObjec2);

    const expected = [someObjec1, someObjec2];
    const actual = await sut.findAllBy("color", "Silver");

    expect(actual).toEqual(expected);
  });

  it("should get the element after inserting", async () => {
    const id = await sut.insert(someObject);

    const expected = "red";
    await sut.update(id, "color", expected);
    const object = await sut.getBy("id", id);
    const actual = object.color;

    expect(actual).toBe(expected);
  });

  it("should delete the object", async () => {
    const id = await sut.insert(someObject);

    await sut.delete(id);
    const actual = await sut.getBy("id", id);

    expect(actual).toBeUndefined();
  });

  it("should get all elements", async () => {
    await sut.insert(someObjec1);
    await sut.insert(someObjec2);

    const expected = [someObjec1, someObjec2];
    const actual = await sut.getAllElements();

    expect(actual).toEqual(expected);
  });
});
