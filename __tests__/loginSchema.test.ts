import { loginSchema } from "../src/types/auth";

describe("Login Schema Validation", () => {
  it("should pass with valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "secure123",
    });

    expect(result.success).toBe(true);
  });

  it("should fail with invalid email format", () => {
    const result = loginSchema.safeParse({
      email: "invalidemail",
      password: "secure123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().email?._errors).toContain(
        "Email tidak valid"
      );
    }
  });

  it("should fail when email is empty", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "secure123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().email?._errors).toContain(
        "Email harus diisi"
      );
    }
  });

  it("should fail when password is less than 6 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().password?._errors).toContain(
        "Password minimal 6 karakter"
      );
    }
  });
});
