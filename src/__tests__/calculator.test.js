const ERRORS = {
  NOT_VALID_INPUT: 'Not a valid input'
};

const parse = (input) => {
  if (typeof input === 'string') {
    return input.split(/,|\n/)
  }
  throw new Error(ERRORS.NOT_VALID_INPUT);
};

const validate = (inputs) => {
  const EMPTY_STRING = '';
  const isEmptyInput = inputs.length === 1 && inputs[0] === EMPTY_STRING;
  if (isEmptyInput) {
    return true;
  }
  const isFewEmptySeparators = inputs.includes(EMPTY_STRING);
  return !isFewEmptySeparators;
}

const normalize = (inputs) => {
  return inputs
  .map(input => Number(input))
  .filter(convertedToNumber => !isNaN(convertedToNumber));
};

const sum = (inputs) => {
  const parsed = parse(inputs);
  const isValidData = validate(parsed);
  if (!isValidData) throw new Error(ERRORS.NOT_VALID_INPUT);
  
  const normalized = normalize(parsed);
  return normalized.reduce((a, b) => a + b, 0);
};


describe('String Sum Calculator', () => {
  describe('Success Flow', () => {
    it('should return the same digit if argument is a string AND contains only 1 digit', () => {
      expect(sum('5')).toBe(5);
    });
  
    it('should return 0 if argument is an empty string', () => {
      expect(sum('')).toBe(0);
    });
  
    it('should sum two digits if argument is a string of POSITIVE integers separated by a COMMA', () => {
      expect(sum('12,34')).toBe(46);
    });
  
    it('should sum digits if argument is a string of NEGATIVE integers and non-integers separated by a COMMA', () => {
      expect(sum('-1,-45,-1.4')).toBe(-47.4);
    });
    
    it(`should sum digits if argument is a string of POSITIVE integers and non-integers
      AND NEGATIVE integers and non-integers separated by a COMMA`, () => {
      expect(sum('12,3.4,-45,-1.4')).toBe(-31);
    });
  
    it(`should sum digits if argument is a string of POSITIVE integers and non-integers
      AND NEGATIVE integers and non-integers separated by a COMMA and by a NEW LINE`, () => {
      expect(sum('12,3.4\n-1,-45\n-1.4')).toBe(-32);
    });
  
    it('should sum digits if argument is a string of POSITIVE integers separated by a NEW LINE', () => {
      expect(sum('12\n34')).toBe(46);
    });
  
    it('should sum digits if argument is a string of NEGATIVE integers AND non-integers separated by a NEW LINE', () => {
      expect(sum('-1\n-45\n-1.4')).toBe(-47.4);
    });
  
    it(`should sum digits if argument is a string of POSITIVE integers and non-integers
      AND NEGATIVE integers and non-integers separated by a NEW LINE`, () => {
      expect(sum('12\n3.4\n-1\n-45\n-1.4')).toBe(-32);
    });
    
  })
  
  describe('Failure Flow', () => {
    test.each([
      [1, ERRORS.NOT_VALID_INPUT],
      [{}, ERRORS.NOT_VALID_INPUT],
      [[], ERRORS.NOT_VALID_INPUT],
      [true, ERRORS.NOT_VALID_INPUT],
      [null, ERRORS.NOT_VALID_INPUT],
      [undefined, ERRORS.NOT_VALID_INPUT]
    ])(`should throw an error ${ERRORS.NOT_VALID_INPUT} if argument has NOT a string type`, (input, expected) => {
      expect(() => {
        sum(input)
      }).toThrow(Error(expected));
    });
  
    it(`should throw an error ${ERRORS.NOT_VALID_INPUT} if argument is a string AND contains of integers separated by a wrong separator`, () => {
      expect(() => {
        sum('12,\n34')
      }).toThrow(Error(ERRORS.NOT_VALID_INPUT));
    });
  
    it('should throw an error ${ERRORS.NOT_VALID_INPUT} if argument is a string AND contains of non-integers separated by a wrong separator', () => {
      expect(() => {
        sum('-1,\n-45,\n-1.4')
      }).toThrow(Error(ERRORS.NOT_VALID_INPUT));
    });
  
    it('should throw an error ${ERRORS.NOT_VALID_INPUT} if argument is a string AND contains of integers AND non-integers separated by a wrong separator', () => {
      expect(() => {
        sum('12!\n-45,\n-1.4')
      }).toThrow(Error(ERRORS.NOT_VALID_INPUT));
    });
  })
});
