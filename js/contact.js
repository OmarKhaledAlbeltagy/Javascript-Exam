

$(window).on('load', function () {
    let nameInput = $("#nameInput");
    let emailInput = $("#emailInput");
    let phoneInput = $("#phoneInput");
    let ageInput = $("#ageInput");
    let passwordInput = $("#passwordInput");
    let submitButton = $("#contactFormSubmit");

    let nameRegex = /^[a-zA-Z ]{3,}$/;
    let emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^01[0125][0-9]{8}$/;
    let ageRegex = /^(1[6-9]|[2-9][0-9])$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w])[A-Za-z\d\W]{7,}$/;





    $("input").on('keyup', async function () {
        let element = $(this);
        element.next('small').addClass('hidden')
        let validationResult = await InputValidation(element);

        if (validationResult == false) {
            element.removeClass('valid')
            element.next('small').removeClass('hidden');
            submitButton.attr('disabled','');
            submitButton.addClass('cursor-not-allowed');
            submitButton.addClass('bg-blue-300')
            submitButton.removeClass('bg-blue-500');
            submitButton.removeClass('hover:bg-blue-700');
        }

        else {
            element.addClass('valid');
            let form = element.closest('form');
            let formValidationResult = await checkFormValidationStatus(form);
            if (formValidationResult) {
                submitButton.removeAttr('disabled');
                submitButton.removeClass('cursor-not-allowed');
                submitButton.removeClass('bg-blue-300')
                submitButton.addClass('bg-blue-500');
                submitButton.addClass('hover:bg-blue-700');
            }
            else{
                submitButton.attr('disabled','');
                submitButton.addClass('cursor-not-allowed');
                submitButton.addClass('bg-blue-300')
                submitButton.removeClass('bg-blue-500');
                submitButton.removeClass('hover:bg-blue-700');
            }
        }
    })



    async function InputValidation(element) {

        let elementName = element.attr('name');

        switch (elementName) {
            case "name":
                return nameRegex.test(element.val())
                break;
            case "email":
                return emailRegex.test(element.val());
                break;
            case "phone":
                return phoneRegex.test(element.val());
                break;
            case "age":
                return ageRegex.test(element.val());
                break;
            case "password":
                return passwordRegex.test(element.val());
                break;
            case "repassword":
                return element.val() == passwordInput.val();
                break;
        }


    }

    async function checkFormValidationStatus() {
        let isValid = true;
        $.each($(".contactFormInput"), function () {
            if ($(this).hasClass('valid') == false) {
                isValid = false;
            }
        })
        return isValid;
    }



    $("#contactForm").on('submit',function(e){
        e.preventDefault();
        Swal.fire({
            title: "Success",
            icon: "success",
            html: `refresh in <strong id="timer" class="text-3xl">3</strong> <span id="seconds">seconds</span>`,
            showCloseButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("#timer");
              timerInterval = setInterval(() => {
                timer.textContent = `${(Swal.getTimerLeft()/1000).toFixed(0)}`;
                if (timer.textContent == 1) {
                    $("#seconds").text('second')
                }
                if (timer.textContent == 0) {
                    window.location.reload()
                }
              }, 1000);
            }
          }).then((result) => {
            window.location.reload();
          });
    })

})