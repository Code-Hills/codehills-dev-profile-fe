const Keys = {
  ISSERVER: typeof window === 'undefined',
  DEFAULT_API: import.meta.env.VITE_PUBLIC_DEFAULT_API,
  REACT_APP_ACCESS_TOKEN:
    import.meta.env.VITE_APP_ACCESS_TOKEN ||
    'PLKL98928s&*989238uriolsd',
};

export default Keys;
