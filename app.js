async function generateInvoice() {
    const invoiceId = await axios.post('https://staging.bitpay.com/checkout', {
        action: 'checkout',
        postData: '',
        data: 'YzNHKdC1iQeZoR3gfFxF1N0JyhglsfO6hyFIawpMSUVdNRBBiu2A8/EdM6E0GqvQJ7VeSdeL5+KZTkEo+/eaiOR2mMH79hzVdCPfwHvcyECNibmB0WQTrqliB4abGlRYtplunFqpg2XnFzzcDSvHPQ=='
    });
    bitpay.showInvoice(invoiceId);
}
