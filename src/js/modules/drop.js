import {postData} from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlightOn(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7';
    }

    function highlightOff(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if (item.closest('.hidden-xs')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }

    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, ()  => highlightOn(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, ()  => highlightOff(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots,
                fileData = new FormData();

            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            input.previousElementSibling.textContent = arr[0].substring(0, 6) + dots + arr[1];

            input.files.forEach(item => {
                fileData.append(item['name'], item);
            });

            postData('assets/server.php', fileData)
                .then(res => {
                    console.log(res)
                })
                .catch(() => {
                    console.log('Error');
                });
        });
    });
};

export default drop;