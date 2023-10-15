'use strict';

const url = new URL('https://sycret.ru/service/api/api');

url.searchParams.set('ApiKey', '011ba11bdcad4fa396660c2ec447ef14');
url.searchParams.set('MethodName', 'OSGetGoodList');

console.log(url);

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
    },
})
    .then((res) => {
        return res.json();
    })
    .then((finalRes) => console.log(finalRes))
    .catch((e) => {
        console.log(e);
    });
