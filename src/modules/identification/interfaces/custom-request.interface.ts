import { Request } from 'express';

interface User {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type ICustomRequest = Request & User;
