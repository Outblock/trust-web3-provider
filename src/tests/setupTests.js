// Copyright © 2017-2022 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.

"use strict";

// Set test environment
process.env.NODE_ENV = "test";

// Polyfill TextEncoder and TextDecoder for test environments
// In Node.js v18+, these are available globally, but in Jest/jsdom they might not be
const { TextEncoder, TextDecoder } = require("util");

// Add to global scope
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

// Add to window object for jsdom environment
if (typeof window !== "undefined") {
  window.TextEncoder = window.TextEncoder || TextEncoder;
  window.TextDecoder = window.TextDecoder || TextDecoder;
}

// Add crypto polyfill if needed (for Node.js < 19)
if (typeof global.crypto === "undefined") {
  try {
    const { webcrypto } = require("crypto");
    global.crypto = webcrypto;
    if (typeof window !== "undefined") {
      window.crypto = webcrypto;
    }
  } catch (error) {
    // Fallback for older Node.js versions
    console.warn("WebCrypto not available, some tests may fail");
  }
}