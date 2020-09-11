const bitpayButton = document.getElementById('bitpayButton');

bitpayButton.addEventListener('click', generateInvoice);

async function generateInvoice(event) {
    event.preventDefault();
    const price = document.getElementById('invoicePrice').value;
    const token = document.getElementById('apiToken').value;
    const redirectURL = 'https://justinkook.github.io/bitpayTestMerchant';
    const invoice = {
        currency: 'USD',
        price,
        token,
        itemDesc: 'Marlboro 36 Count Party Pack',
        orderId: '10742',
        redirectURL
    };
    const authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'x-accept-version': '2.0.0'
        }
    };
    try {
        const { data } = await axios.post('https://staging.bitpay.com/invoices', invoice, authHeaders);
        const { id } = data.data;
        // Modal
        showInvoice(id);
    } catch (err) {
        console.log(err);
    }
};

function showInvoice(id) {
    let is_paid = false
    window.addEventListener("message", function (event) {
        payment_status = event.data.status;
        if (payment_status == "paid") {
            is_paid = true
            const paidScreen = document.getElementById('paidScreen');
            // Add the 'show' class to DIV
            paidScreen.className = 'show';
            // After 3 seconds, remove the show class from DIV
            setTimeout(function () {
                paidScreen.className = paidScreen.className.replace('show', '');
            }, 3000);
            //take action PAID
            return;
        }
    }, false);
    //show the order info
    bitpay.onModalWillLeave(function () {
        if (is_paid == false) {
            const snackbar = document.getElementById('snackbar');
            snackbar.className = 'show';
            setTimeout(function () {
                snackbar.className = snackbar.className.replace('show', '');
            }, 3000);
            //take action, NOT PAID
        } //endif
    });
    //show the modal
    bitpay.enableTestMode();
    bitpay.showInvoice(id);
}