package example.book.service.impl;

import example.book.model.Invoice;
import example.book.repository.IInvoiceRepository;
import example.book.service.IInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService implements IInvoiceService {

    @Autowired
    private IInvoiceRepository iInvoiceRepository;

    @Override
    public void saveAll(List<Invoice> invoices) {
        iInvoiceRepository.saveAll(invoices);
    }
}