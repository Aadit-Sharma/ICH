import {Platform} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import employeeProfile from '../data/employeeProfile';

const currency = value => `&#8377;${Number(value || 0).toFixed(2)}`;
const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]));

const getAmounts = document => {
  const itemSubtotal = document.items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );
  const subtotal = Number(document.subtotal ?? itemSubtotal);
  const serviceCharge = Number(document.serviceCharge || 0);
  const tax = Number(document.tax ?? Math.max(0, Number(document.total || 0) - subtotal - serviceCharge));

  return {subtotal, serviceCharge, tax, total: Number(document.total || 0)};
};

const createPdf = async ({html, fileName}) => {
  const directory = Platform.OS === 'android' ? 'Downloads' : 'Documents';

  try {
    return await RNHTMLtoPDF.convert({html, fileName, directory});
  } catch (error) {
    if (Platform.OS !== 'android') {
      throw error;
    }
    return RNHTMLtoPDF.convert({html, fileName, directory: 'Documents'});
  }
};

const invoiceHtml = bill => {
  const date = new Date(bill.placedAt);
  const {subtotal, serviceCharge, tax, total} = getAmounts(bill);
  const rows = bill.items.map(item => `
    <tr><td>${escapeHtml(item.name)}</td><td>${item.quantity}</td><td>${currency(item.price)}</td><td>${currency(item.price * item.quantity)}</td></tr>`).join('');

  return `<!doctype html><html><head><meta charset="utf-8"/><style>
    body{font-family:Arial,sans-serif;color:#102A43;padding:28px;font-size:12px} h1{color:#005BAC;margin:0} h2{margin:4px 0 18px;color:#334155;font-size:18px} .company{color:#64748B;margin:4px 0} .details{margin:18px 0;line-height:1.8} table{width:100%;border-collapse:collapse;margin-top:18px} th{background:#005BAC;color:#fff;text-align:left} th,td{padding:9px;border:1px solid #DCE6F0} .amounts{margin-left:auto;margin-top:18px;width:230px}.amount{display:flex;justify-content:space-between;padding:6px 0}.grand{color:#005BAC;font-size:15px;font-weight:bold;border-top:1px solid #DCE6F0;margin-top:4px;padding-top:10px}.thanks{text-align:center;margin-top:28px;color:#64748B}
  </style></head><body><h1>Indian Coffee House (ICH)</h1><div class="company">NTPC</div><h2>Invoice</h2><div class="details"><b>Employee Name:</b> ${escapeHtml(employeeProfile.name)}<br/><b>Employee ID:</b> ${escapeHtml(employeeProfile.employeeId)}<br/><b>Order ID:</b> ${escapeHtml(bill.orderId)}<br/><b>Bill ID:</b> ${escapeHtml(bill.id)}<br/><b>Date:</b> ${date.toLocaleDateString('en-IN')}<br/><b>Time:</b> ${date.toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}</div><table><thead><tr><th>Item</th><th>Quantity</th><th>Price</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table><div class="amounts"><div class="amount"><span>Subtotal</span><span>${currency(subtotal)}</span></div><div class="amount"><span>Tax</span><span>${currency(tax)}</span></div>${serviceCharge ? `<div class="amount"><span>Service Charge</span><span>${currency(serviceCharge)}</span></div>` : ''}<div class="amount grand"><span>Grand Total</span><span>${currency(total)}</span></div></div><div class="thanks">Thank You</div></body></html>`;
};

const orderHtml = order => {
  const date = new Date(order.placedAt);
  const {total} = getAmounts(order);
  const rows = order.items.map(item => `
    <tr><td>${escapeHtml(item.name)}</td><td>${item.quantity}</td><td>${currency(item.price)}</td></tr>`).join('');

  return `<!doctype html><html><head><meta charset="utf-8"/><style>
    body{font-family:Arial,sans-serif;color:#102A43;padding:28px;font-size:12px} h1{color:#005BAC;margin:0 0 18px} .details{line-height:1.8} table{width:100%;border-collapse:collapse;margin-top:20px} th{background:#005BAC;color:#fff;text-align:left} th,td{padding:9px;border:1px solid #DCE6F0} .total{margin-top:20px;text-align:right;color:#005BAC;font-size:16px;font-weight:bold}
  </style></head><body><h1>Indian Coffee House (ICH) - Order Summary</h1><div class="details"><b>Employee Name:</b> ${escapeHtml(employeeProfile.name)}<br/><b>Order ID:</b> ${escapeHtml(order.id)}<br/><b>Date:</b> ${date.toLocaleDateString('en-IN')}<br/><b>Time:</b> ${date.toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}<br/><b>Status:</b> ${escapeHtml(order.status)}</div><table><thead><tr><th>Item</th><th>Quantity</th><th>Price</th></tr></thead><tbody>${rows}</tbody></table><div class="total">Total: ${currency(total)}</div></body></html>`;
};

export const exportDocumentPdf = (document, type) => {
  const isBill = type === 'bill';

  return createPdf({
    html: isBill ? invoiceHtml(document) : orderHtml(document),
    fileName: isBill ? `Bill_${document.id}` : `Order_${document.id}`,
  });
};
