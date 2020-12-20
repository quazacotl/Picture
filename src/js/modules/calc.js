import {getResource} from "../services/requests";

export let pictureParams = {};

const calc = (size, material, options, promocode, result) => {
   const sizeBlock = document.querySelector(size),
       materialBlock = document.querySelector(material),
       optionsBlock = document.querySelector(options),
       promocodeBlock = document.querySelector(promocode),
       resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunc = () => {
        getResource('http://localhost:3000/pictureParams')
            .then(res => {
                let size = res.size[sizeBlock.value],
                    material = res.material[materialBlock.value],
                    additional = res.additional[optionsBlock.value],
                    promocodes = res.promocodes;

                sum = Math.round(size * material + additional);

                if (size === '' || material === '') {
                    resultBlock.textContent = 'Выберите размер и материал картины';
                } else if (promocodeBlock.value in promocodes) {
                    resultBlock.textContent = Math.round(sum * promocodes[promocodeBlock.value]);
                    pictureParams.promocode = promocodeBlock.value;
                } else {
                    resultBlock.textContent = sum;
                }

                pictureParams.size = size;
                pictureParams.material = material;
                pictureParams.additional = additional;
                pictureParams.sum = sum;
            })
            .catch(error => console.log(error));
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);

};

export default calc;