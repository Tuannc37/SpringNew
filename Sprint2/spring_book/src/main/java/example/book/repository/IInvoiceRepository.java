package example.book.repository;

import example.book.model.AppUser;
import example.book.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface IInvoiceRepository extends JpaRepository<Invoice,Long> {

    @Query("SELECT i FROM Invoice i WHERE i.status = 0")
    Page<Invoice> findAllByInvoice(Pageable pageable);

    @Modifying
    @Query("UPDATE Invoice i SET i.status = 1 WHERE i.id = :invoiceId")
    void updateStatusToPaid(@Param("invoiceId") Long invoiceId);

    Page<Invoice> findAllByAppUser_Username(String username, Pageable pageable);

    @Query("SELECT SUM(i.totalPrice) FROM Invoice i")
    Double calculateTotalProfit();

    @Query("SELECT SUM(e.totalQuantity) FROM Invoice e")
    Integer getTotalQuantity();

    @Query("SELECT i FROM Invoice i WHERE i.id = :idInvoice")
    Invoice findByIdInvoice(@Param("idInvoice") Long idInvoice);
}
