(function() {
    const bitpayForm = document.getElementById('bitpayButton');
    // bitpayForm.addEventListener('click', generateInvoice);

    async function generateInvoice(event) {
        event.preventDefault();
        try {
            const invoiceId = await axios.post('https://bitpay.com/checkout', {
                action: 'checkout',
                posData: '',
                data: 'KYC3WZipGErWjI5+utSbImOo4o7Ly6vgr+Bdumj2YhOaQ+nEA7F7EkbJF/P1yyHpT/pL5zabz7YpRG+isS257Vtvy0TiH2n+r4c+xbaC3KWtdqCYX1MHCoMe9HlUFpyC1Sro3BDZ5VtAI44EJrItjw=='
            });
            console.log(invoiceId);
            bitpay.showInvoice(invoiceId);
        } catch (err) {
            console.log(err);
        }
    }
})();
