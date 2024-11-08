// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

// Polyfill for ReadableStream to support Firebase
require('web-streams-polyfill');

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock matchMedia before loading tests and dependencies
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
};

import '@testing-library/jest-dom';
