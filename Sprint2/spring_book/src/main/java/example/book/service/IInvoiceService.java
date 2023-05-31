package example.book.service;

import example.book.model.Invoice;

import java.util.List;

public interface IInvoiceService {
    void saveAll(List<Invoice> invoices);
}
