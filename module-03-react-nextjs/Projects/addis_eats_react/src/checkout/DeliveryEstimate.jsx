function DeliveryEstimate({ deliveryFee, deliveryTime }) {
    return (
        <div className="delivery-estimate">
            <p>
                Delivery Fee:{" "}
                <strong>
                    {deliveryFee === 0
                        ? "Free"
                        : `${deliveryFee} ETB`}
                </strong>
            </p>

            <p>
                Estimated Delivery:{" "}
                <strong>{deliveryTime}</strong>
            </p>
        </div>
    );
}

export default DeliveryEstimate;