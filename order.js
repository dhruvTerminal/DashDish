(() => {

const CONFIG = {
    basePrice: 200,
    deliveryCharge: 40,
    platformFee: 5,
    taxRate: 0.05
};

let state = {
    quantity: 1
};

const els = {
    quantity: document.getElementById("quantity"),
    minus: document.getElementById("minus"),
    plus: document.getElementById("plus"),
    addons: document.querySelectorAll(".addon-check"),
    itemPrice: document.getElementById("itemPrice"),
    addonTotal: document.getElementById("addonTotal"),
    taxAmount: document.getElementById("taxAmount"),
    grandTotal: document.getElementById("grandTotal"),
    placeOrder: document.getElementById("placeOrder")
};

function getAddonPerUnit(){
    return [...els.addons]
        .filter(cb => cb.checked)
        .reduce((sum, cb) => sum + Number(cb.dataset.price), 0);
}

function calculate(){

    const itemTotal = CONFIG.basePrice * state.quantity;
    const addonTotal = getAddonPerUnit() * state.quantity;

    const preTaxTotal = itemTotal
                      + addonTotal
                      + CONFIG.deliveryCharge
                      + CONFIG.platformFee;

    const tax = Math.round(preTaxTotal * CONFIG.taxRate);
    const grand = preTaxTotal + tax;

    return { itemTotal, addonTotal, tax, grand };
}

function render(){

    const totals = calculate();

    els.quantity.textContent = state.quantity;
    els.itemPrice.textContent = `₹${totals.itemTotal}`;
    els.addonTotal.textContent = `₹${totals.addonTotal}`;
    els.taxAmount.textContent = `₹${totals.tax}`;
    els.grandTotal.textContent = `₹${totals.grand}`;
}

els.plus.addEventListener("click", () => {
    state.quantity++;
    render();
});

els.minus.addEventListener("click", () => {
    if(state.quantity > 1){
        state.quantity--;
        render();
    }
});

els.addons.forEach(cb => {
    cb.addEventListener("change", render);
});

els.placeOrder.addEventListener("click", () => {

    const form = document.getElementById("checkoutForm");

    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }

    const totals = calculate();

    alert(
        "Order Confirmed\n\n" +
        "Grand Total: ₹" + totals.grand
    );
});

render();

})();