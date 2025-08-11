function getDetailedBill(bill, items, categories) {
  let totalAmount = 0;

  let detailedBill = {
    id: bill.id,
    billNumber: bill.billNumber,
    opentime: bill.opentime,
    customerName: bill.customerName,
    billItems: bill.billItems.map(billItem => {
      let itemData = items.find(it => it.id === billItem.id) || {};
      let categoryData = categories.find(cat => cat.id === itemData.category?.categoryId) || {};

      // 1. Base price
      let basePrice = (itemData.rate || 0) * billItem.quantity;

      // 2. Discount
      let discountAmount = 0;
      if (billItem.discount) {
        discountAmount = billItem.discount.isInPercent === 'Y'
          ? (billItem.discount.rate / 100) * basePrice
          : billItem.discount.rate;
      }
      let priceAfterDiscount = basePrice - discountAmount;

      // 3. Taxes
      let taxAmount = 0;
      if (itemData.taxes) {
        itemData.taxes.forEach(tax => {
          taxAmount += tax.isInPercent === 'Y'
            ? (tax.rate / 100) * priceAfterDiscount
            : tax.rate;
        });
      }

      // 4. Final amount
      let finalAmount = priceAfterDiscount + taxAmount;
      totalAmount += finalAmount;

      return {
        id: billItem.id,
        name: itemData.itemName || "",
        quantity: billItem.quantity,
        discount: billItem.discount || {},
        taxes: itemData.taxes || [],
        amount: finalAmount,
        superCategoryName: categoryData.superCategory?.superCategoryName || "",
        categoryName: categoryData.categoryName || ""
      };
    }),
    "Total Amount": totalAmount
  };

  return detailedBill;
}
