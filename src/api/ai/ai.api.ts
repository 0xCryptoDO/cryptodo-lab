import { useApi } from '@/hooks';
import {
  assembleCode,
  getCodeByMessages,
  getCodeByPrompt,
} from '@/api/ai/mutations';

export * from './ai.urls';

export const getAiApi = () => {
  const aiApi = useApi(process.env.NEXT_PUBLIC_AI_API_URL as string);

  return {
    getCodeByPrompt: getCodeByPrompt(aiApi),
    assembleCode: assembleCode(aiApi),
    getCodeByMessages: getCodeByMessages(aiApi),
  };
};
