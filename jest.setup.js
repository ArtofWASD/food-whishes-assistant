require('@testing-library/jest-dom');
require('@testing-library/user-event');

// Очищаем DOM после каждого теста
const { cleanup } = require('@testing-library/react');
afterEach(cleanup); 