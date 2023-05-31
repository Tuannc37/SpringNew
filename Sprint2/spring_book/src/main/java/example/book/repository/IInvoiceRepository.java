package example.book.repository;

import example.book.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInvoiceRepository extends JpaRepository<Invoice,Long> {
}
