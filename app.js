(function() {
    const bitpayForm = document.getElementById('bitpayButton');
    bitpayForm.addEventListener('click', generateInvoice);

    async function generateInvoice(event) {
        event.preventDefault();
        try {
            const invoiceId = await axios.post('https://test.bitpay.com/checkout', {
                action: 'checkout',
                posData: '',
                data: 'MbhGagET0n9UyKbaFqZIknRzK3swJ23NA/mZEUqZ22EY8xB5SLJ03kdzOaL34cLyCy6qGOPJF/4SkbdJLWJ2kDyH8Lz0ixvgf4pznZnutuqxZr3Hh/44az4MZR8Vq8hGdwX/6YrI8Ra/LNd08qXejQ=='
            });
            console.log(invoiceId);
            bitpay.showInvoice(invoiceId);
        } catch (err) {
            console.log(err);
        }
    }
})();
