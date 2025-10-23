interface ConversionSettings {
  amount: number | null;
  fromCurrency: string;
  toCurrency: string;
  timestamp: string;
}

const STORAGE_KEY = 'conversion_settings_v1';

export const saveConversionSettings = (
  amount: number | null,
  fromCurrency: string,
  toCurrency: string,
): void => {
  try {
    const settings: ConversionSettings = {
      amount,
      fromCurrency,
      toCurrency,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save conversion settings:', e);
  }
};

export const loadConversionSettings = (): ConversionSettings | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const settings = JSON.parse(raw) as ConversionSettings;

    if (!settings.fromCurrency || !settings.toCurrency) {
      return null;
    }

    return settings;
  } catch (e) {
    console.error('Failed to load conversion settings:', e);
    return null;
  }
};
