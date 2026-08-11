import { users } from "./users";

type LoginTestCase = {
  testName: string;
  username: string;
  password: string;
  success?: boolean;
  error?: string;
};

export const loginTestData: LoginTestCase[] = [
  {
    testName: "user can log in successfully",
    ...users.standard,
    success: true,
  },
  {
    testName: "user cannot log in with invalid username and password",
    ...users.invalid,
    error: "Username and password do not match any user in this service",
  },
  {
    testName: "user cannot log in with username only",
    username: users.standard.username,
    password: "",
    error: "Password is required",
  },
  {
    testName: "user cannot log in with password only",
    username: "",
    password: users.standard.password,
    error: "Username is required",
  },
  {
    testName: "user cannot log in with valid username and invalid password",
    ...users.wrongPassword,
    error: "Username and password do not match any user in this service",
  },
];
