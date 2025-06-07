export interface AuthResult {
  message?: string;
  data?: {
    user?: {
      userId: any;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
    accessToken: string;
  };
  error?: Object;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId?: string | any;
  email: string;
}
