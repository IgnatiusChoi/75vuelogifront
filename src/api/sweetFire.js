import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import router from "@/router";

export default
    function fire(textObjectAxios){
    Swal.fire({
        title: textObjectAxios.mainTitle,
        text: textObjectAxios.mainText,
        icon: 'question',
        background: 'rgba(35, 39, 87, 0.91)',
        showCancelButton: true,
        confirmButtonText: '예',
        cancelButtonText: '아니요',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
    }).then(result => {
        if (result.value) {
            Swal.fire({
                icon: 'success',
                background: 'rgba(35, 39, 87, 0.91)',
                title: textObjectAxios.okTitle,
                text: textObjectAxios.okText,
                customClass: {
                    confirmButton: 'btn btn-success',
                },
            })
            textObjectAxios.okRoute !== undefined ?
            router.push(textObjectAxios.okRoute) : null
        } else if (result.dismiss === 'cancel') {
            Swal.fire({
                title: textObjectAxios.cancelTitle,
                text: textObjectAxios.cancelText,
                icon: 'error',
                background: 'rgba(35, 39, 87, 0.91)',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
            })
            textObjectAxios.cancelRoute !== undefined ?
                router.push(textObjectAxios.cancelRoute) : null
        }
    })
}

const text =
{
    mainTitle : null,
    mainText : null,
    okTitle : null,
    okText : null,
    cancelTitle : null,
    cancelText : null,
    okRoute : null,
    cancelRoute : null,
}