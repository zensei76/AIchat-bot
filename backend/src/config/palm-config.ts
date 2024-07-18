import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export const configurePaLM = (): TextServiceClient => {
  const apiKey = process.env.PALM_API_KEY;
  if (!apiKey) {
    throw new Error('PALM_API_KEY is not defined in environment variables');
  }
  return new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(apiKey),
  });
};

export const MODEL_NAME = 'models/text-bison-001';