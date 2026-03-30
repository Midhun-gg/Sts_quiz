import { topics1 } from './topics1.js';
import { topics2 } from './topics2.js';
import { topics3 } from './topics3.js';
import { topics4 } from './topics4.js';
import { topics5 } from './topics5.js';
import { topics6 } from './topics6.js';
import { topics7 } from './topics7.js';
import { topics8 } from './topics8.js';
import { topics9 } from './topics9.js';
import { topics10 } from './topics10.js';
import { topics11 } from './topics11.js';

export const allTopics = [
  ...topics1,
  ...topics2,
  ...topics3,
  ...topics4,
  ...topics5,
  ...topics6,
  ...topics7,
  ...topics8,
  ...topics9,
  ...topics10,
  ...topics11
];

export const getAllQuestions = () => {
    return allTopics.flatMap(topic => topic.questions.map(q => ({
        ...q,
        topicId: topic.id,
        topicName: topic.name
    })));
};
