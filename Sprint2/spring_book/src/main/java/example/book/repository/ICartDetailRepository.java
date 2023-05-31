package example.book.repository;

import example.book.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartDetailRepository extends JpaRepository<CartDetail,Integer> {
    List<CartDetail> findByUser_Username(String username);

    CartDetail findByUser_IdAndBook_Id(Integer userId, Integer bookId);

    @Modifying
    @Query(value = "UPDATE CartDetail cd SET cd.status = 0 WHERE cd.id = :id")
    void updateStatusById(@Param("id") Integer id);

    @Query("SELECT cd FROM CartDetail cd WHERE cd.id = :id")
    CartDetail findByIdCartDetails(@Param("id") Integer id);

}
