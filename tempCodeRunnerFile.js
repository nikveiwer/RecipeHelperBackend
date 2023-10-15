'use strict';

fetch('https://sycret.ru/service/api/api', {
    headers: {
        'Content-Type': 'application/json',
    },
    body: {
        ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
        MethodName: 'OSGetGoodList',
    },
})
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
