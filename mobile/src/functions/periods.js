import database from '../services/database';

// const { sales } = database;

export function first_semester(sales) {
    let data = sales.filter(a => a.id <= 5);

    return data;
};

export function second_semester(sales) {
    let data = sales.filter(a => a.id >= 6);

    return data;
};

// export function year_data() {
//     let data = sales;

//     return data;
// };

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