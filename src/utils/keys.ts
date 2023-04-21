const Keys = {
  ISSERVER: typeof window === 'undefined',
  DEFAULT_API: import.meta.env.VITE_PUBLIC_DEFAULT_API,
  REACT_APP_ACCESS_TOKEN:
    import.meta.env.VITE_APP_ACCESS_TOKEN ||
    'PLKL98928s&*989238uriolsd',

  APP_THEME_KEY:
    import.meta.env.VITE_APP_THEME_KEY || 'lskdlklkuOisd',

  REDIRECT_URL_KEY:
    import.meta.env.VITE_REDIRECT_URL_KEY || 'KLKLSKI839283',
};

export default Keys;
