paypal
        .Buttons({
          // Sets up the transaction when a payment button is clicked
          createOrder: async function (data, actions) {
            try {
              return await fetch("/api/orders", {
                method: "post",
                // use the "body" param to optionally pass additional order information
                // like product ids or amount
              })
                .then((response) => response.json())
                .then((order) => order.id);
                
            } catch (error) {
              console.log('Error coming from response')
              console.log(error)
            }
          },
          // Finalize the transaction after payer approval
          onApprove: async function (data, actions) {
            return await fetch(`/api/orders/${data.orderID}/capture`, {
              method: "post",
            })
              .then((response) => response.json())
              .then((orderData) => {
                // Successful capture! For dev/demo purposes:
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                window.location.href = './formOpt1.html'
              });
          },
            onCancel: () => {
                alert('Order canceled')
            }
        })
        .render("#paypal-button-container");