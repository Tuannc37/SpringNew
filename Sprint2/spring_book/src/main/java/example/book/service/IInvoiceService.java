package example.book.service;

import example.book.model.AppUser;
import example.book.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IInvoiceService {
    void saveAll(Invoice invoices);

    Page<Invoice> findAllByInvoice(Pageable pageable);

    void updateStatusToPaid(Long invoiceId);

    Page<Invoice> findAllByAppUser_Username(String username, Pageable pageable);

    Double calculateTotalProfit();

    Integer getTotalQuantity();

    Invoice findByIdInvoice(Long idInvoice);
}
