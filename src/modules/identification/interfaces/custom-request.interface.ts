import { Request } from 'express';

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    validateAt: Date | null;
    createdAt: Date;
  };
}

export type ICustomRequest = Request & User;
