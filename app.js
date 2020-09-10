(function() {
    const bitpayForm = document.getElementById('bitpayButton');
    const redirectURL = 'https://justinkook.github.io/bitpayTestMerchant';
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

    bitpayForm.addEventListener('click', generateInvoice);
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
            const { id } = await axios(authOptions);
            console.log(id);
            // Modal
            showInvoice(id);
        } catch (err) {
            console.log(err);
        }
    }

    function showInvoice(id) {
        let is_paid = false
        window.addEventListener("message", function (event) {
            payment_status = event.data.status;
            if (payment_status == "paid") {
                is_paid = true
                alert('successfully paid!');
                //take action PAID
            return;
            } 
        }, false);
        //show the order info
        bitpay.onModalWillLeave(function () {
            if (is_paid == false) {
                alert('Are you sure you want to leave?');
                //take action, NOT PAID
            } //endif
        });
        //show the modal
        bitpay.enableTestMode();
        bitpay.showInvoice(id);
    }
})();
