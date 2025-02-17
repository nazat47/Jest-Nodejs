import { v4 } from "uuid";

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCb = (arg: string) => void;

export const toUpperCaseWithId = (arg: string) => {
  return arg.toUpperCase();
};

export const toLowerCaseWithId = (arg: string) => {
  return arg.toLowerCase() + v4();
};

export const calculateComplexity = (stringInfo: Partial<stringInfo>) => {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
};

export const toUpperCaseWithCallback = (
  arg: string,
  callback: LoggerServiceCb
) => {
  if (!arg) {
    callback("Invalid argument!");
    return;
  }
  callback(`Called function with ${arg}`);
  return arg.toUpperCase();
};

export class OtherStringUtils {
  private externalService() {
    console.log("Called external service");
  }

  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
