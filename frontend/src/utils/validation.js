/**
 * Validation utility for form fields
 */

// Common validation patterns
const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email pattern
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  PHONE: /^\+?[\d\s-]{10,}$/, // International phone number
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, // URL pattern
  ZIP_CODE: /^\d{5}(-\d{4})?$/, // US ZIP code format
  CREDIT_CARD: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/, // Common credit card formats
};

/**
 * Validation rules
 */
const RULES = {
  required: (value) => ({
    isValid: value !== undefined && value !== null && value !== '',
    message: 'This field is required',
  }),
  
  email: (value) => ({
    isValid: !value || PATTERNS.EMAIL.test(value),
    message: 'Please enter a valid email address',
  }),
  
  minLength: (value, length) => ({
    isValid: !value || String(value).length >= length,
    message: `Must be at least ${length} characters`,
  }),
  
  maxLength: (value, length) => ({
    isValid: !value || String(value).length <= length,
    message: `Cannot exceed ${length} characters`,
  }),
  
  exactLength: (value, length) => ({
    isValid: !value || String(value).length === length,
    message: `Must be exactly ${length} characters`,
  }),
  
  minValue: (value, min) => ({
    isValid: value === undefined || value === null || Number(value) >= min,
    message: `Must be at least ${min}`,
  }),
  
  maxValue: (value, max) => ({
    isValid: value === undefined || value === null || Number(value) <= max,
    message: `Cannot be greater than ${max}`,
  }),
  
  between: (value, min, max) => ({
    isValid: !value || (Number(value) >= min && Number(value) <= max),
    message: `Must be between ${min} and ${max}`,
  }),
  
  numeric: (value) => ({
    isValid: !value || !isNaN(parseFloat(value)) && isFinite(value),
    message: 'Must be a number',
  }),
  
  integer: (value) => ({
    isValid: !value || /^\d+$/.test(value),
    message: 'Must be a whole number',
  }),
  
  url: (value) => ({
    isValid: !value || PATTERNS.URL.test(value),
    message: 'Please enter a valid URL',
  }),
  
  phone: (value) => ({
    isValid: !value || PATTERNS.PHONE.test(value),
    message: 'Please enter a valid phone number',
  }),
  
  password: (value) => ({
    isValid: !value || PATTERNS.PASSWORD.test(value),
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  }),
  
  match: (value, matchValue) => ({
    isValid: value === matchValue,
    message: 'Values do not match',
  }),
  
  pattern: (value, pattern) => ({
    isValid: !value || new RegExp(pattern).test(value),
    message: 'Invalid format',
  }),
  
  custom: (value, validatorFn, message) => ({
    isValid: !value || validatorFn(value),
    message: message || 'Invalid value',
  }),
};

/**
 * Validate a single field against validation rules
 * @param {*} value - The value to validate
 * @param {Array|Object} rules - Validation rules to apply
 * @returns {Object} Validation result { isValid: boolean, errors: Array }
 */
const validateField = (value, rules) => {
  // If no rules, return valid
  if (!rules) {
    return { isValid: true, errors: [] };
  }
  
  // Convert single rule to array
  const rulesArray = Array.isArray(rules) ? rules : [rules];
  
  const errors = [];
  let isValid = true;
  
  for (const rule of rulesArray) {
    // Skip if already invalid and we have a failFast option
    if (!isValid && rule.failFast) {
      continue;
    }
    
    // Handle conditional validation
    if (rule.when && !rule.when()) {
      continue;
    }
    
    let result;
    
    // Handle custom validation function
    if (typeof rule.validate === 'function') {
      result = rule.validate(value);
      if (typeof result === 'boolean') {
        result = { isValid: result, message: rule.message || 'Invalid value' };
      }
    } 
    // Handle built-in rules
    else if (typeof rule === 'string' && RULES[rule]) {
      result = RULES[rule](value, rule.params);
    }
    // Handle rule with parameters
    else if (rule.rule && RULES[rule.rule]) {
      const params = rule.params ? (Array.isArray(rule.params) ? rule.params : [rule.params]) : [];
      result = RULES[rule.rule](value, ...params);
      
      // Override default message if provided
      if (rule.message) {
        result.message = rule.message;
      }
    }
    
    // If validation failed, add error
    if (result && !result.isValid) {
      isValid = false;
      errors.push({
        rule: rule.rule || rule,
        message: result.message,
      });
      
      // Stop validation if failFast is true
      if (rule.failFast) {
        break;
      }
    }
  }
  
  return { isValid, errors };
};

/**
 * Validate a form with multiple fields
 * @param {Object} formData - Object with field names and values
 * @param {Object} validationSchema - Validation schema with rules for each field
 * @returns {Object} Validation result { isValid: boolean, errors: Object }
 */
const validateForm = (formData, validationSchema) => {
  const errors = {};
  let isValid = true;
  
  for (const [field, rules] of Object.entries(validationSchema)) {
    const fieldValue = formData[field];
    const result = validateField(fieldValue, rules);
    
    if (!result.isValid) {
      isValid = false;
      errors[field] = result.errors;
    }
  }
  
  return { isValid, errors };
};

/**
 * Create a validation schema for a form
 * @param {Object} schema - Object with field names and validation rules
 * @returns {Function} A validation function that takes form data and returns validation results
 */
const createValidator = (schema) => (formData) => {
  return validateForm(formData, schema);
};

// Export everything
export {
  PATTERNS,
  RULES,
  validateField,
  validateForm,
  createValidator,
};

export default {
  PATTERNS,
  RULES,
  validateField,
  validateForm,
  createValidator,
};
