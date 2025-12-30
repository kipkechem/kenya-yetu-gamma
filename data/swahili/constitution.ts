
import type { ConstitutionData } from '../../types/index.ts';
import { preamble } from './preamble.ts';
import { chapter1 } from './chapter1.ts';
import { chapter2 } from './chapter2.ts';
import { chapter3 } from './chapter3.ts';
import { chapter4 } from './chapter4.ts';
import { chapter5 } from './chapter5.ts';
import { chapter6 } from './chapter6.ts';
import { chapter7 } from './chapter7.ts';
import { chapter8 } from './chapter8.ts';
import { chapter9 } from './chapter9.ts';
import { chapter10 } from './chapter10.ts';
import { chapter11 } from './chapter11.ts';
import { chapter12 } from './chapter12.ts';
import { chapter13 } from './chapter13.ts';
import { chapter14 } from './chapter14.ts';
import { chapter15 } from './chapter15.ts';
import { chapter16 } from './chapter16.ts';
import { chapter17 } from './chapter17.ts';
import { chapter18 } from './chapter18.ts';
import { schedules } from './schedules.ts';

export const swahiliConstitutionData: ConstitutionData = {
  preamble: preamble,
  chapters: [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8,
    chapter9,
    chapter10,
    chapter11,
    chapter12,
    chapter13,
    chapter14,
    chapter15,
    chapter16,
    chapter17,
    chapter18,
  ],
  schedules: schedules,
};
