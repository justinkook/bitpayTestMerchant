(function() {
    const bitpayForm = document.getElementById('bitpayButton');
    bitpayForm.addEventListener('click', generateInvoice);
    const redirectURL = 'https://justinkook.github.io/bitpayTestMerchant'
    const invoice = {
        currency: 'USD',
        price: 120.2,
        itemDesc: 'Marlboro 36 Count Party Pack',
        orderId: '10742',
        redirectURL,
        // paymentCurrencies: [
        //   'BTC',
        //   'BCH',
        //   'XRP',
        //   'ETH',
        //   'USDC',
        //   'GUSD',
        //   'PAX',
        //   'BUSD',
        // ],
      };

    async function generateInvoice(event) {
        event.preventDefault();
        try {
            const authOptions = {
                method: 'POST',
                url: 'https://test.bitpay.com/api/invoice',
                headers: {
                    'Authorization': 'Bearer RjZLS2pyUkd1elNONUh3N1NLUXRBRjJmVExXRFZzb3BaSkVWdUpnajZuZlI6',
                    'Content-Type': 'application/json',
                    'x-accept-version': '2.0.0'
                },
                body: JSON.stringify(invoice)
              };
            const { data } = await axios(authOptions);
            const { id } = data;
            console.log(id);
            // No Modal
            // window.location.replace(`${redirectURL}/invoice?v=3&id=${result.id}&lang=en-US`);
            // Modal
            bitpay.showInvoice(id);
        } catch (err) {
            console.log(err);
        }
    }
})();
