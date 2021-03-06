export function processMonthsDataToDisplay(semesterData) {
    
    // Filter expenses with "Confirmed" status
    let chartData = semesterData.map(item => {
        // Comentei porque filtrava apenas as vendas cofirmadas. Porém mais pra frente irei utilizá-la:
        // let confirmSales = item.sales.filter(a => a.status == "C");
        let amountSales = item.sales.reduce((a, b) => a + b.amount, 0);
        // let total = confirmSales.reduce((a, b) => a + (b.total || 0), 0);
        let total = item.sales.reduce((a, b) => a + (b.total || 0), 0);
        
        return {
            name: item.name,
            y: total,
            // salesCount: confirmSales.length,
            salesCount: amountSales,
            color: item.color,
            id: item.id,
        }
    });

    // Filter out months with no data/sales
    let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate total sales
    let totalSales = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        let percentage = (item.y / totalSales * 100).toFixed(0);

        return {
            label: `${percentage}%`,
            y: Number(item.y),
            salesCount: item.salesCount,
            color: item.color,
            name: item.name,
            id: item.id,
        }
    });

    return finalChartData;
};


export function percentageDifference(semesterData, setSalesInfo) {
    semesterData.map(item => {
        let date = new Date();
        let currentMonth = date.getMonth();

        const withoutPercentage = (a) => a.split('%');
        const formattedNumber = (a) => Number(a.join(''))

        if (item.id == currentMonth) {
            let thisMonth = semesterData[item.id];
            let lastMonth = semesterData[item.id - 1];
    
            let percentageThisMonth = formattedNumber(withoutPercentage(thisMonth.label));
            let percentageOfLastMonth = formattedNumber(withoutPercentage(lastMonth.label));

            let percentageDifference = Number(percentageThisMonth) - Number(percentageOfLastMonth);
            setSalesInfo({ percentageDifference: isNaN(percentageDifference) ? 0 : Number(percentageDifference) });
        }
    })
    
    // // Filter expenses with "Confirmed" status
    // let chartData = semesterData.map(item => {
    //     // let confirmSales = item.sales.filter(a => a.status == "C");
    //     let amountSales = item.sales.reduce((a, b) => a + b.amount, 0);
    //     // let total = confirmSales.reduce((a, b) => a + (b.total || 0), 0);
    //     let total = item.sales.reduce((a, b) => a + (b.total || 0), 0);
        
    //     return {
    //         name: item.name,
    //         y: total,
    //         salesCount: amountSales,
    //         color: item.color,
    //         id: item.id,
    //     }
    // });

    // // Filter out months with no data/sales
    // let filterChartData = chartData.filter(a => a.y > 0);

    // // Calculate total sales
    // let totalSales = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

    // let percentageDifference = filterChartData.map(item => {
    //     let date = new Date();
    //     let currentMonth = date.getMonth();

        
    //     if (item.id == currentMonth) {
    //         let lastMonth = filterChartData[item.id - 1];
    //         let thisMonth = filterChartData[item.id];
    
    //         let percentageOfLastMonth = (lastMonth.y / totalSales * 100).toFixed(0);
    //         let percentageThisMonth = (thisMonth.y / totalSales * 100).toFixed(0);
        
    //         let percentageDifference = Number(percentageThisMonth) - Number(percentageOfLastMonth);

    //         return percentageDifference;
    //     }
    // }).find(a => a != undefined);

    // setSalesInfo({ percentageDifference: isNaN(percentageDifference) ? 0 : Number(percentageDifference) });
};