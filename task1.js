function getBillWithItemNames(bill, items) {
  return {
    id: bill.id,
    billNumber: bill.billNumber,
    opentime: bill.opentime,
    customerName: bill.customerName,
    billItems: bill.billItems.map(billItem => {
      let itemData = items.find(it => it.id === billItem.id);
      return {
        id: billItem.id,
        name: itemData ? itemData.itemName : "",
        quantity: billItem.quantity
      };
    })
  };
}
