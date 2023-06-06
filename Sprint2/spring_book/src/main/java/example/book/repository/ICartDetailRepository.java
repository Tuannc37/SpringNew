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
            "WHERE cd.user.username = :username " +
            "AND cd.status = 1")
    List<CartDetail> findCartDetailsByUserUsername(@Param("username") String username);

    @Query("SELECT cd FROM CartDetail cd WHERE cd.user.id = :userId AND cd.book.id = :bookId AND cd.status = 1")
    CartDetail findByUser_IdAndBook_Id(Integer userId, Integer bookId);

    void deleteCartDetailById(Integer id);

    @Query("SELECT cd FROM CartDetail cd WHERE cd.id = :id")
    CartDetail findByIdCartDetails(@Param("id") Integer id);

    @Query("SELECT SUM(cd.quantity) FROM CartDetail cd WHERE cd.user.id = :userId AND cd.status = 1")
    Integer getTotalQuantityByUserId(@Param("userId") Integer userId);


}
