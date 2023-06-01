package example.book.repository;

import example.book.dto.CartSummary;
import example.book.model.CartDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartDetailRepository extends JpaRepository<CartDetail,Integer> {
    @Query("SELECT cd FROM CartDetail cd " +
            "JOIN FETCH cd.book " +
            "JOIN FETCH cd.user " +
            "WHERE cd.user.username = :username")
    List<CartDetail> findCartDetailsByUserUsername(@Param("username") String username);

    CartDetail findByUser_IdAndBook_Id(Integer userId, Integer bookId);

//    @Modifying
//    @Query(value = "UPDATE CartDetail cd SET cd.status = 0 WHERE cd.id = :id")
//    void updateStatusById(@Param("id") Integer id);

    void deleteCartDetailById(Integer id);

    @Query("SELECT cd FROM CartDetail cd WHERE cd.id = :id")
    CartDetail findByIdCartDetails(@Param("id") Integer id);

    @Query("SELECT SUM(cd.quantity) FROM CartDetail cd WHERE cd.user.id = :userId")
    Integer getTotalQuantityByUserId(@Param("userId") Integer userId);

    @Query("SELECT cd.user.username AS username, cd.user.address AS address, cd.user.phone AS phone, SUM(cd.quantity) AS totalQuantity, SUM(cd.book.price * cd.quantity) AS totalPrice " +
            "FROM CartDetail cd " +
            "GROUP BY cd.user.username, cd.user.address, cd.user.phone")
    Page<CartSummary> getCartSummary(Pageable pageable);


}
