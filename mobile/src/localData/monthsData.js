import colors from '../styles/colors';
import salesData from './salesData'

export function first_semester() {
    let data = salesData.filter(a => a.id <= 5);

    return data;
}

export function second_semester() {
    let data = salesData.filter(a => a.id >= 6);

    return data;
}

// export const first_semester = [
//     {
//         name: 'Jan',
//         y: 200,
//         expenseCount: 6,
//         color: 'yellow',
//         id: 1
//     },

//     {
//         name: 'Fev',
//         y: 100,
//         expenseCount: 6,
//         color: 'red',
//         id: 2
//     },

//     {
//         name: 'Mar',
//         y: 200,
//         expenseCount: 6,
//         color: 'blue',
//         id: 3
//     },

//     {
//         name: 'Abr',
//         y: 200,
//         expenseCount: 6,
//         color: 'green',
//         id: 4
//     },

//     {
//         name: 'Maio',
//         y: 200,
//         expenseCount: 6,
//         color: 'purple',
//         id: 5
//     },

//     {
//         name: 'Jun',
//         y: 200,
//         expenseCount: 6,
//         color: 'orange',
//         id: 6
//     },
// ];

// export const second_semester = [
//     {
//         name: 'Jul',
//         y: 200,
//         expenseCount: 6,
//         color: 'brown',
//         id: 6
//     },

//     {
//         name: 'Ago',
//         y: 200,
//         expenseCount: 6,
//         color: 'black',
//         id: 6
//     },

//     {
//         name: 'Set',
//         y: 200,
//         expenseCount: 6,
//         color: 'gray',
//         id: 6
//     },

//     {
//         name: 'Out',
//         y: 200,
//         expenseCount: 6,
//         color: 'violet',
//         id: 6
//     },

//     {
//         name: 'Nov',
//         y: 200,
//         expenseCount: 6,
//         color: '#ff00ff',
//         id: 6
//     },

//     {
//         name: 'Dez',
//         y: 200,
//         expenseCount: 6,
//         color: colors.rose,
//         id: 6
//     },
// ];

export const semesters = [
    {
        label: '1º Semestre',
        value: 1
    },
    {
        label: '2º Semestre',
        value: 2
    }
];

// module.exports = { first_semester, second_semester };