const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const newQuestionsArray = `const questions = [
        {
            id: 'q1',
            text: "1. The following facts were discovered in a survey of course preferences of 110 pupils in senior six: 21 like engineering only, 63 like engineering, 55 like medicine and 34 like none of the two courses.\\n(a) Draw a Venn diagram representing this information.\\n(b) (i) How many like Engineering or Medicine?\\n    (ii) How many like Engineering and Medicine?\\n    (iii) How many like only Medicine?",
            options: [
                '(i) 76, (ii) 42, (iii) 13',
                '(i) 42, (ii) 76, (iii) 13',
                '(i) 76, (ii) 13, (iii) 42',
                '(i) 110, (ii) 21, (iii) 55'
            ],
            correct: '(i) 76, (ii) 42, (iii) 13'
        },
        {
            id: 'q2',
            text: "2. A survey was carried out in a shop to find out the number of customers who bought bread or milk or both or neither. Out of a total of 79 customers for the day, 52 bought milk, 32 bought bread and 15 bought neither.\\n(a) Draw a Venn diagram to show this information and use it to find out:\\n(b) (i) How many bought bread and milk.\\n    (ii) How many bought bread only.\\n    (iii) How many bought milk only.",
            options: [
                '(i) 20, (ii) 12, (iii) 32',
                '(i) 12, (ii) 20, (iii) 32',
                '(i) 20, (ii) 32, (iii) 12',
                '(i) 15, (ii) 32, (iii) 52'
            ],
            correct: '(i) 20, (ii) 12, (iii) 32'
        },
        {
            id: 'q3',
            text: "3. Five members of Mathematics club conducted a survey among 150 students of Senior 3 about which careers they wish to join among Engineering and Medical related courses. 83 want to join Engineering, 58 want to join medical related courses. 36 do not want to join any of the careers.\\nRepresent the data on the Venn diagram. Find the number of students who wish to join both careers.",
            options: ['27', '36', '83', '58'],
            correct: '27'
        },
        {
            id: 'q4',
            text: "4. A survey was done on 50 people about which hotels they eat from among H, S and L. 15 people eat at hotel H, 30 people eat at hotel S, 19 people eat at hotel L, 8 people eat at hotels H and S, 12 people eat at hotels H and L, 7 people eat at hotels S and L. 5 people eat at hotels H, S and L.\\n(a) How many people eat only at Hotel H?\\n(b) How many people eat at hotels H and S, but not at L?\\n(c) How many people don't eat at any of these three hotels?",
            options: [
                '(a) 0, (b) 3, (c) 8',
                '(a) 15, (b) 8, (c) 5',
                '(a) 0, (b) 8, (c) 3',
                '(a) 3, (b) 0, (c) 8'
            ],
            correct: '(a) 0, (b) 3, (c) 8'
        },
        {
            id: 'q5',
            text: "5. A survey involving 50 students was carried out and research revealed that 21 of them like Kiswahili (K) while 32 of them like Mathematics (M).\\n(a) Represent the information in the Venn diagram.\\n(b) How many students like only one subject?",
            options: ['47', '3', '18', '29'],
            correct: '47'
        },
        {
            id: 'q6',
            text: "6. A group of 50 people were asked about the sections they read very keenly in a newspaper among politics, advertisements and sports. The results showed that 25 read politics, 16 read advertisement, 14 read sports. 5 read both politics and advertisement, 4 read both advertisement and sports, 6 read both politics and sports, and 2 read all the three sections.\\n(a) Represent the data on the Venn diagram.\\n(b) Find the number of people who read;\\n    (i) At least one of the three sections.\\n    (ii) Only one of the three sections.\\n    (iii) Only politics.",
            options: [
                '(i) 42, (ii) 31, (iii) 16',
                '(i) 42, (ii) 16, (iii) 31',
                '(i) 50, (ii) 31, (iii) 25',
                '(i) 31, (ii) 42, (iii) 16'
            ],
            correct: '(i) 42, (ii) 31, (iii) 16'
        },
        {
            id: 'q7',
            text: "7. Given that, n(A∪B) = 29, n(A) = 21, n(B) = 17, n(A∩B) = x.\\n(a) Write down in terms of the elements of each part.\\n(b) Form an equation and hence find the value of x.",
            options: ['x = 9', 'x = 29', 'x = 38', 'x = 4'],
            correct: 'x = 9'
        },
        {
            id: 'q8',
            text: "8. A survey was conducted in a school for students taking Mathematics, Physics and Chemistry. In a group of 60 students, 7 take all the subjects, 9 take Physics and Chemistry only, 8 take Physics and Mathematics, 5 take Mathematics and Chemistry only. 11 students take Mathematics only, 2 take Physics only and 15 students take Chemistry only.\\n(a) Draw a Venn diagram for the information above.\\n(b) Find the number of those who do not take any of the subjects.\\n(c) Find the number of students who take Mathematics.",
            options: [
                '(b) 10, (c) 24',
                '(b) 24, (c) 10',
                '(b) 7, (c) 11',
                '(b) 10, (c) 35'
            ],
            correct: '(b) 10, (c) 24'
        }
    ];`;

const startIndex = content.indexOf('const questions = [');
const endIndex = content.indexOf('];', startIndex) + 2;

if (startIndex !== -1) {
    content = content.substring(0, startIndex) + newQuestionsArray + content.substring(endIndex);
    
    // We also need to fix the JSX rendering so \n line breaks show up properly since we're using strings.
    // Instead of {q.text}, we can render it allowing \n
    content = content.replace('{q.text}', '{q.text.split(\'\\\\n\').map((line, i) => <span key={i}>{line}<br /></span>)}');

    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated questions array!');
} else {
    console.log('Array not found.');
}
