const modals = () => {
    let btnPressed;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            windowWidth = document.querySelector('#width'),
            windowHeight = document.querySelector('#height'),
            coldCheckBox = document.querySelectorAll('.checkbox')[0],
            warmCheckBox = document.querySelectorAll('.checkbox')[1],
            giftPicture = document.querySelector('.fixed-gift'),
            scroll = calcScroll();

        function appendErrMessage(triggerSelector) {
            let bttn = document.querySelector(triggerSelector),
                calcStatus = document.createElement('div');

            bttn.parentNode.lastChild.remove()
            calcStatus.classList.add('status');
            calcStatus.style = 'margin-top: 10px';
            calcStatus.textContent = 'Заполните все поля';
            bttn.parentNode.appendChild(calcStatus);
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                btnPressed = true;


                if (e.target) {
                    e.preventDefault();
                }

                if (destroy) {
                    item.remove();
                }

                if (triggerSelector === '.popup_calc_button' && (!windowWidth.value || !windowHeight.value)) {
                    appendErrMessage(triggerSelector);
                } else if (triggerSelector === '.popup_calc_profile_button' && !(coldCheckBox.checked || warmCheckBox.checked)) {
                    appendErrMessage(triggerSelector);
                } else {
                    windows.forEach(item => {
                        item.style.display = 'none';
                        item.classList.add('animated', 'fadeIn');
                    });

                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                    document.body.style.marginRight = `${scroll}px`;
                    giftPicture.style.marginRight = `${scroll}px`;

                    // document.body.classList.add('modal-open');
                }
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            giftPicture.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';

                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                scroll = calcScroll();
                let giftPicture = document.querySelector('.fixed-gift');
                document.body.style.marginRight = `${scroll}px`;
                giftPicture.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openModalByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                document.querySelector(selector).click();
            }
        });

    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openModalByScroll('.fixed-gift');
    // showModalByTime('.popup-consultation', 4000);
};

export default modals;