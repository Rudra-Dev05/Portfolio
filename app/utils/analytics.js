export const analytics = {
  logEvent: (name, data) => {
    console.log(`Event: ${name}`, data);
    // Implement your analytics here
  },
  logError: (type, error) => {
    console.error(`Error: ${type}`, error);
    // Implement your error logging here
  }
};
