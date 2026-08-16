module.exports = {
  hide: jest.fn(() => Promise.resolve()),
  show: jest.fn(() => Promise.resolve()),
  isVisible: jest.fn(() => Promise.resolve(false)),
  useHideAnimation: jest.fn(() => ({
    container: {},
    logo: { source: 0 },
    brand: { source: 0 },
  })),
};
