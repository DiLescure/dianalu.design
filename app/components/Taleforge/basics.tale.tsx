import { z } from 'zod';
import Heading from '@/components/Heading';

import type { TaleContent } from './types';

// Define the state shape for this tale
interface TaleforgeExampleState {
  stringExample: string;
  numberExample: number;
  bigintExample: bigint;
  booleanExample: boolean;
  dateExample: Date;
  enumExample: 'a' | 'b' | 'c';
  anyExample: any;
}

const tale: TaleContent = {
  taleComponent: ({ taleState }) => {
    const {
      stringExample,
      numberExample,
      bigintExample,
      booleanExample,
      dateExample,
      enumExample,
      anyExample,
    } = taleState as TaleforgeExampleState;

    return (
      <>
        <Heading level={2}>The Code</Heading>
        <p>
          The <code>schema</code> defined in <code>src/components/Taleforge/index.tale.tsx</code>{' '}
          auto-generates the controls in the panel below.
        </p>

        <p>
          Open the panel, and try changing the values to see this <em>Tale</em> update in real-time:
        </p>

        <div>
          <Heading level={3}>Live Component State</Heading>
          <pre className="border border-base-300">
            {JSON.stringify(
              {
                stringExample,
                numberExample,
                bigintExample: bigintExample.toString(),
                booleanExample,
                dateExample: dateExample.toISOString(),
                enumExample,
                anyExample,
              },
              null,
              2,
            )}
          </pre>
        </div>

        <div>
          <Heading level={3}>Dynamic Preview</Heading>
          <div>
            {/* String display */}
            <div className="mb-3">
              <span className="font-medium">String: </span>
              <span className={booleanExample ? 'text-green-600 font-bold' : 'text-gray-600'}>
                {stringExample}
              </span>
            </div>

            {/* Number with progress bar */}
            <div className="mb-3">
              <span className="font-medium">Number Progress: </span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${Math.min(100, numberExample)}%` }}
                />
              </div>
              <div className="text-sm text-right">{numberExample}/100</div>
            </div>

            {/* Boolean display */}
            <div className="mb-3">
              <span className="font-medium">Boolean: </span>
              <span
                className={`px-2 py-1 rounded ${booleanExample ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {booleanExample ? 'ON' : 'OFF'}
              </span>
            </div>

            {/* Enum display as tabs */}
            <div className="mb-3">
              <span className="font-medium">Selected Option: </span>
              <div className="flex space-x-1 mt-1">
                {['a', 'b', 'c'].map((option) => (
                  <div
                    key={option}
                    className={`px-3 py-1 rounded cursor-pointer ${enumExample === option ? 'bg-blue-500 text-white' : 'bg-gray-500'}`}
                  >
                    {option.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Date display */}
            <div className="mb-3">
              <span className="font-medium">Date: </span>
              <span>{dateExample.toISOString().split('T')[0]}</span>
            </div>
          </div>
        </div>
      </>
    );
  },
  schema: z.object({
    stringExample: z.string().min(5),
    numberExample: z.number().gte(0).lte(100),
    bigintExample: z
      .bigint()
      .gt(BigInt(Number.MAX_SAFE_INTEGER), `Must be greater than ${Number.MAX_SAFE_INTEGER}`),
    booleanExample: z.boolean(),
    dateExample: z.date(),
    enumExample: z.enum(['a', 'b', 'c']),
    anyExample: z.any(),
  }),
  defaultValues: {
    stringExample: 'hello world',
    numberExample: 42,
    bigintExample: BigInt(Number.MAX_SAFE_INTEGER + 1),
    booleanExample: true,
    dateExample: new Date(),
    enumExample: 'a',
    anyExample: null,
  },
};

export default tale;
