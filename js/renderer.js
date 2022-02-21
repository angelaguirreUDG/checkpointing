window.onload = async function () {

    let button = document.getElementById('save');

    let data = JSON.parse(getCookie('data'));

    const editor = new EditorJS({
        placeholder: 'Dime lo que estás pensando...',
        autofocus: true,
        holder: 'editorjs',
        tools: {
            header: {
                class: Header,
                placeholder: 'Ingresa el titulo',
                levels: [2, 3, 4],
                defaultLevel: 3
            },
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            list: {
                class: List,
                inlineToolbar: true,
            },
        },
        data: data
    });

    button.addEventListener('click', function () {

        editor.save().then((outputData) => {

            const edjsParser = edjsHTML();

            let html = edjsParser.parse(outputData)

            console.log(html);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El resultado está en la consola!',
                showConfirmButton: false,
                timer: 1500
            });


        }).catch((error) => {
            console.log('Saving failed: ', error)
        });

        ;
    });

    window.addEventListener("beforeunload", function (e) {

        editor.save().then((outputData) => {

            this.document.cookie = `data=${JSON.stringify(outputData)}; path=/`;

        }).catch((error) => {
            console.log('Saving failed: ', error)
        });

    })
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


