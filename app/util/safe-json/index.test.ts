import { describe, expect, it } from 'vitest';
import { extractValidJson } from './extract-valid-json';
import { safeJsonObject, safeJsonString } from './index';
import { safeCloseJson } from './safe-close-json';

describe('extractValidJson', () => {
  it('extracts JSON from markdown code blocks with language specifier', () => {
    const input = '```json\n{"name": "John"}\n```';
    expect(extractValidJson(input)).toEqual('{"name": "John"}');
  });

  it('extracts JSON from markdown code blocks without language specifier', () => {
    const input = '```\n{"name": "John"}\n```';
    expect(extractValidJson(input)).toEqual('{"name": "John"}');
  });

  it('returns the string directly if it looks like valid JSON', () => {
    const input = '{"name": "John"}';
    expect(extractValidJson(input)).toEqual('{"name": "John"}');
  });

  it('returns null for invalid input', () => {
    const input = 'This is not JSON or a code block';
    expect(extractValidJson(input)).toBeNull();
  });

  it('handles empty input', () => {
    expect(extractValidJson('')).toBeNull();
    expect(extractValidJson(null as any)).toBeNull();
    expect(extractValidJson(undefined as any)).toBeNull();
  });

  it('extracts JSON from text with multiple code blocks', () => {
    const input =
      'First block:\n```json\n{"first": true}\n```\nSecond block:\n```json\n{"second": true}\n```';
    expect(extractValidJson(input)).toEqual('{"first": true}');
  });
});

describe('safeCloseJson', () => {
  it('closes unclosed objects', () => {
    expect(safeCloseJson('{')).toEqual('{}');
    expect(safeCloseJson('{"name": "John"')).toEqual('{"name": "John"}');
  });

  it('closes unclosed arrays', () => {
    expect(safeCloseJson('[')).toEqual('[]');
    expect(safeCloseJson('[1, 2, 3')).toEqual('[1, 2, 3]');
  });

  it('closes unclosed strings', () => {
    expect(safeCloseJson('"')).toEqual('""');
    expect(safeCloseJson('"hello')).toEqual('"hello"');
  });

  it('handles nested structures', () => {
    expect(safeCloseJson('{"arr": [')).toEqual('{"arr": []}');
    expect(safeCloseJson('{"obj": {"nested":')).toEqual('{"obj": {}}');
  });

  it('removes trailing commas', () => {
    expect(safeCloseJson('{"a": 1, "b": 2, }')).toEqual('{\n  "a": 1,\n  "b": 2\n}');
    expect(safeCloseJson('[1, 2, 3, ]')).toEqual('[\n  1,\n  2,\n  3\n]');
  });

  it('handles empty or null input', () => {
    expect(safeCloseJson('')).toBeNull();
  });

  it('handles escaped characters in strings', () => {
    expect(safeCloseJson('"escaped \\"quote')).toEqual('"escaped \\"quote"');
  });
});

describe('safeJsonString', () => {
  it('handles valid json', () => {
    expect(safeJsonString('{"name": "John", "age": 30}')).toEqual(
      '{\n  "name": "John",\n  "age": 30\n}',
    );
  });

  it('handles empty input', () => {
    expect(safeJsonString('')).toEqual('null');
  });

  it('handles integer input', () => {
    expect(safeJsonString('123')).toEqual('123');
  });

  it('handles float input', () => {
    expect(safeJsonString('123.456')).toEqual('123.456');
  });

  it('handles boolean true input', () => {
    expect(safeJsonString('true')).toEqual('true');
  });

  it('handles boolean false input', () => {
    expect(safeJsonString('false')).toEqual('false');
  });

  it('handles null input', () => {
    expect(safeJsonString('null')).toEqual('null');
  });

  it('handles incomplete float', () => {
    expect(safeJsonString('123.')).toEqual('123.0');
  });

  it('handles unclosed object', () => {
    expect(safeJsonString('{')).toEqual('{}');
  });

  it('handles unclosed array', () => {
    expect(safeJsonString('[')).toEqual('[]');
  });

  it('handles unclosed string', () => {
    expect(safeJsonString('"')).toEqual('""');
  });

  it('handles unclosed property', () => {
    expect(safeJsonString('{"name')).toEqual('{}');
  });

  it('handles incomplete property', () => {
    expect(safeJsonString('{"name": ')).toEqual('{}');
  });

  it('handles incomplete string property', () => {
    expect(safeJsonString('{"name": "John')).toEqual('{\n  "name": "John"\n}');
  });

  it('handles incomplete sub-object', () => {
    expect(safeJsonString('{\n"name": "John", \n"address": {\n"street":')).toEqual(
      '{\n  "name": "John",\n  "address": {}\n}',
    );
  });

  it('handles incomplete sub-object string property', () => {
    expect(safeJsonString('{\n"name": "John", \n"address": {\n"street": "Jane Street')).toEqual(
      '{\n  "name": "John",\n  "address": {\n    "street": "Jane Street"\n  }\n}',
    );
  });

  it('handles incomplete sub-array', () => {
    expect(safeJsonString('{\n"arr": [')).toEqual('{\n  "arr": []\n}');
  });

  it('handles incomplete sub-array string element', () => {
    expect(safeJsonString('{\n"arr": ["John')).toEqual('{\n  "arr": [\n    "John"\n  ]\n}');
  });

  it('handles code block with language specifier', () => {
    expect(safeJsonString('```json\n{"name": "John", "age": 30}\n```')).toEqual(
      '{\n  "name": "John",\n  "age": 30\n}',
    );
  });

  it('handles code block without language specifier', () => {
    expect(safeJsonString('```\n{"name": "John", "age": 30,}\n```')).toEqual(
      '{\n  "name": "John",\n  "age": 30\n}',
    );
  });

  it('handles code block with surrounding text', () => {
    expect(safeJsonString('something here\n```json\n{"name": "John", "age": 30}\n```')).toEqual(
      '{\n  "name": "John",\n  "age": 30\n}',
    );
  });

  it('returns default value when input is invalid and default value is provided', () => {
    const defaultValue = 'default value';
    expect(safeJsonString('invalid json', defaultValue)).toEqual(defaultValue);
  });

  it('returns JSON.stringify(null) when input is invalid and no default value is provided', () => {
    expect(safeJsonString('invalid json')).toEqual('null');
  });

  it('handles objects with trailing commas', () => {
    expect(safeJsonString('{"a": 1, "b": 2, }')).toEqual('{\n  "a": 1,\n  "b": 2\n}');
  });

  it('handles arrays with trailing commas', () => {
    expect(safeJsonString('[1, 2, 3, ]')).toEqual('[\n  1,\n  2,\n  3\n]');
  });

  it('handles nested structures with trailing commas', () => {
    expect(safeJsonString('{"a": [1, 2, ], "b": {"c": 3, }, }')).toEqual(
      '{\n  "a": [\n    1,\n    2\n  ],\n  "b": {\n    "c": 3\n  }\n}',
    );
  });

  it('handles whitespace correctly', () => {
    expect(safeJsonString('  {  "a"  :  1  }  ')).toEqual('{\n  "a": 1\n}');
  });
});

describe('safeJsonObject', () => {
  it('handles valid json', () => {
    expect(safeJsonObject('{"name": "John", "age": 30}')).toEqual({ name: 'John', age: 30 });
  });

  it('handles empty input', () => {
    expect(safeJsonObject('')).toEqual(null);
  });

  it('handles integer input', () => {
    expect(safeJsonObject('123')).toEqual(123);
  });

  it('handles float input', () => {
    expect(safeJsonObject('123.456')).toEqual(123.456);
  });

  it('handles boolean true input', () => {
    expect(safeJsonObject('true')).toEqual(true);
  });

  it('handles boolean false input', () => {
    expect(safeJsonObject('false')).toEqual(false);
  });

  it('handles null input', () => {
    expect(safeJsonObject('null')).toEqual(null);
  });

  it('handles incomplete float', () => {
    expect(safeJsonObject('123.')).toEqual(123.0);
  });

  it('handles unclosed object', () => {
    expect(safeJsonObject('{')).toEqual({});
  });

  it('handles unclosed array', () => {
    expect(safeJsonObject('[')).toEqual([]);
  });

  it('handles unclosed string', () => {
    expect(safeJsonObject('"')).toEqual('');
  });

  it('handles unclosed property', () => {
    expect(safeJsonObject('{"name')).toEqual({});
  });

  it('handles incomplete property', () => {
    expect(safeJsonObject('{"name": ')).toEqual({});
  });

  it('handles incomplete string property', () => {
    expect(safeJsonObject('{"name": "John')).toEqual({ name: 'John' });
  });

  it('handles incomplete sub-object', () => {
    expect(safeJsonObject('{\n"name": "John", \n"address": {\n"street":')).toEqual({
      name: 'John',
      address: {},
    });
  });

  it('handles incomplete sub-object string property', () => {
    expect(safeJsonObject('{\n"name": "John", \n"address": {\n"street": "Jane Street')).toEqual({
      name: 'John',
      address: { street: 'Jane Street' },
    });
  });

  it('handles incomplete sub-array', () => {
    expect(safeJsonObject('{\n"arr": [')).toEqual({ arr: [] });
  });

  it('handles incomplete sub-array string element', () => {
    expect(safeJsonObject('{\n"arr": ["John')).toEqual({ arr: ['John'] });
  });

  it('handles code block with language specifier', () => {
    expect(safeJsonObject('```json\n{"name": "John", "age": 30}\n```')).toEqual({
      name: 'John',
      age: 30,
    });
  });

  it('handles code block without language specifier', () => {
    expect(safeJsonObject('```\n{"name": "John", "age": 30}\n```')).toEqual({
      name: 'John',
      age: 30,
    });
  });

  it('handles code block with surrounding text', () => {
    expect(
      safeJsonObject('something here\n```\n{"name": "John", "age": 30}\n```\nsomething else here'),
    ).toEqual({ name: 'John', age: 30 });
  });

  it('returns default value when input is invalid and default value is provided', () => {
    const defaultValue = { default: true };
    expect(safeJsonObject('invalid json', defaultValue)).toEqual(defaultValue);
  });

  it('returns null when input is invalid and no default value is provided', () => {
    expect(safeJsonObject('invalid json')).toEqual(null);
  });

  it('handles typed generic return values', () => {
    interface User {
      name: string;
      age: number;
    }

    const result = safeJsonObject<User>('{"name": "John", "age": 30}');
    expect(result).toEqual({ name: 'John', age: 30 });

    // Type checking would catch this at compile time, but we can verify runtime behavior
    const defaultUser: User = { name: 'Default', age: 0 };
    const badJson = safeJsonObject<User>('invalid', defaultUser);
    expect(badJson).toEqual(defaultUser);
  });

  it('handles objects with trailing commas', () => {
    expect(safeJsonObject('{"a": 1, "b": 2, }')).toEqual({ a: 1, b: 2 });
  });

  it('handles arrays with trailing commas', () => {
    expect(safeJsonObject('[1, 2, 3, ]')).toEqual([1, 2, 3]);
  });

  it('handles nested structures with trailing commas', () => {
    expect(safeJsonObject('{"a": [1, 2, ], "b": {"c": 3, }, }')).toEqual({
      a: [1, 2],
      b: { c: 3 },
    });
  });

  it('preserves number types', () => {
    const result = safeJsonObject('{"int": 123, "float": 123.456, "scientific": 1.23e4}');
    expect(typeof result.int).toBe('number');
    expect(typeof result.float).toBe('number');
    expect(typeof result.scientific).toBe('number');
    expect(result).toEqual({ int: 123, float: 123.456, scientific: 12300 });
  });

  it('handles escaped characters correctly', () => {
    expect(safeJsonObject('"escaped \\"quote"')).toEqual('escaped "quote');
  });

  it('handles unicode characters', () => {
    expect(safeJsonObject('"\\u00A9 copyright symbol"')).toEqual('© copyright symbol');
  });
});
