paypal
    .Buttons({
        createOrder: async function (data, actions) {
            return await fetch("/api/orders", {
                method: "post",
            })
                .then((response) => response.json())
                .then((order) => order.id);
        },
        onApprove: async function (data, actions) {
            return await fetch(`/api/orders/${data.orderID}/capture`, {
                method: "post",
            })
                .then((response) => response.json())
                .then((orderData) => {
                    console.log(
                        "Capture result",
                        orderData,
                        JSON.stringify(orderData, null, 2)
                    );
                    const transaction =
                        orderData.purchase_units[0].payments.captures[0];
                    window.location.href = "./formOpt1.html";
                });
        },
        onCancel: () => {
            alert("Order canceled");
        },
    })
    .render("#paypal-button-container");
