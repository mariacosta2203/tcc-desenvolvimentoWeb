const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const cidade = document.querySelector('#cidade');
const bairro = document.querySelector('#bairro');
const estado = document.querySelector('#estado');
const message = document.querySelector('#message');

cep, addEventListener('focusout', async () => {

    try {

        const onlyNumbers = /^[0-9]+$/;
        const cepValid = /^[0-9]{8}$/;

        if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)) {
            throw { cep_error: 'Cep invalid' };
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        if (!response.ok) {
            throw await response.json();
        }

        const responseCep = await response.json();

        cep.value = responseCep.cep
        rua.value = responseCep.logradouro;
        cidade.value = responseCep.localidade;
        bairro.value = responseCep.bairro;
        estado.value = responseCep.localidade;


    } catch (error) {
        if (error?.cep_error) {
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = '';
            }, 5000);
        }
        console.log(error);
    }

})