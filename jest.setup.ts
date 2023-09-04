jest.mock('@/hooks/useContractApi/useContractApi', () => ({
  useContractApi: jest.fn().mockReturnValue({}),
}));
export {};
