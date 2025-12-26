import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import clientPromise from './db';

const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(client.db('better-auth')),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      nid: {
        type: 'string',
        required: true,
        input: true,
      },
      contact: {
        type: 'string',
        required: true,
        input: true,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
});
