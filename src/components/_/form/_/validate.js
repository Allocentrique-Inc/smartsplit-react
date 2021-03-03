const emailFormatValidator = (value) =>
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    value,
  );
const minLengthValidator = (value, charLimit) => value.length >= charLimit;

const errorTags = {
  shouldBeTrue: 'shouldBeTrue',
  emailFormat: 'shouldMatchEmailFormat',
  minLength: (charLimit) => {
    return charLimit > 1
      ? `shouldBeAtLeast${charLimit}CharLong`
      : 'shouldNotBeEmpty';
  },
  shouldMatch: (toMatch) =>
    `shouldMatch${toMatch[0].toUpperCase() + toMatch.slice(1)}`,
};

export default function validate(fields) {
  let isValid = true;
  Object.values(fields).forEach((field) => {
    field.validators.forEach((validator) => {
      switch (true) {
        case /emailFormat/.test(validator):
          if (!emailFormatValidator(field.value)) {
            isValid = false;
            !field.errors.includes(errorTags.emailFormat) &&
              field.errors.push(errorTags.emailFormat);
          }

          break;
        case /minLength*/.test(validator): {
          const charLimit = validator.split('_')[1];
          if (!minLengthValidator(field.value, charLimit)) {
            isValid = false;
            !field.errors.includes(errorTags.minLength(charLimit)) &&
              field.errors.push(errorTags.minLength(charLimit));
          }
          break;
        }
        case /shouldBeTrue/.test(validator):
          if (!field.value) {
            isValid = false;
            !field.errors.includes(errorTags.shouldBeTrue) &&
              field.errors.push(errorTags.shouldBeTrue);
          }
          break;
        case /shouldMatch*/.test(validator): {
          const toMatch = validator.split('_')[1];
          if (fields[toMatch] && field.value !== fields[toMatch].value) {
            isValid = false;

            !field.errors.includes(errorTags.shouldMatch(toMatch)) &&
              field.errors.push(errorTags.shouldMatch(toMatch));
          }
          break;
        }

        default:
      }
    });
  });
  return isValid;
}
