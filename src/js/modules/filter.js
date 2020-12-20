const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        portfolioBlocks = document.querySelectorAll('.portfolio-block'),
        no = document.querySelector('.portfolio-no');

    const displayNoPortfolio = () => {
        let t = 0;
        portfolioBlocks.forEach(item => {
            if (item.classList.contains('fadeIn')) {
                t++
            }
        });

        if (t === 0) {
            enableBlock(no);
        }
    }

    const enableBlock = (block) => {
        block.style.display = 'block';
        block.classList.add('animated', 'fadeIn');
    };

    const disableBlock = (block) => {
        block.style.display = 'none';
        block.classList.remove('animated', 'fadeIn');
    };


    menu.addEventListener('click', (evt => {
            let target = evt.target;

            if (target && target.tagName == 'LI') {
                items.forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');

                disableBlock(no);

                portfolioBlocks.forEach(portfolioBlock => {
                    disableBlock(portfolioBlock);


                    if (portfolioBlock.classList.contains(target.classList[0])) {
                        enableBlock(portfolioBlock);
                    }
                });

                displayNoPortfolio();
            }
        }));
};

export default filter;