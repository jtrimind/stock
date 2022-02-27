function buildTable(tickers) {
    let table = document.createElement("table");

    // Add table head
    let tr = document.createElement("tr");
    {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode("티커"));
        tr.appendChild(th);
    }
    {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode("종목명"));
        tr.appendChild(th);
    }
    table.appendChild(tr);

    for (const ticker in tickers) {
        let tr = document.createElement("tr");
        {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(ticker));
            tr.appendChild(td);
        }
        {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(tickers[ticker]));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}

async function main() {
    const getTicker = async () => {
        const url = "https://jtrimind.github.io/data/stock/ticker.json";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };
    const tickers = await getTicker();
    console.log(tickers);
    const table = buildTable(tickers);
    document.body.appendChild(table);
}

main();
