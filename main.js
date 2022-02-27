function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function buildTable(tickers, ncavs) {
    let table = document.createElement("table");

    // Add table head
    let tr = document.createElement("tr");
    for (const text of ["티커", "종목명", "유동자산", "부채총계", "순유동자산", "시가총액", "시가총액/순유동자산"])
    {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(text));
        tr.appendChild(th);
    }
    table.appendChild(tr);

    for (const ticker in tickers) {
        let tr = document.createElement("tr");
        const name = tickers[ticker];
        const currentAssets = ncavs[ticker]["currentAssets"];
        const liabilities = ncavs[ticker]["liabilities"];
        const ncav = currentAssets - liabilities;
        const stocks = ncavs[ticker]["stocks"];
        let marketCap = 0;
        for (stock of stocks) {
            marketCap += stock["numbers"] * stock["price"];
        }
        marketCap = (marketCap / 1000000).toFixed(0);
        const nacvRatio = (marketCap / ncav).toFixed(2);
        for (const text of [ticker, name, numberWithCommas(currentAssets), numberWithCommas(liabilities), numberWithCommas(ncav), numberWithCommas(marketCap), nacvRatio])
        {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(text));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}

async function main() {
    const getData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };
    const tickers = await getData("https://jtrimind.github.io/data/stock/ticker.json");
    const ncavs = await getData("https://jtrimind.github.io/data/stock/ncav.json");

    console.log(tickers)
    console.log(ncavs)
    const table = buildTable(tickers, ncavs);
    document.body.appendChild(table);
}

main();
