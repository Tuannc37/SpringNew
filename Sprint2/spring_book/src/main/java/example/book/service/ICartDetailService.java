package example.book.service;

import example.book.dto.CartSummary;
import example.book.model.CartDetail;

import java.util.List;

public interface ICartDetailService {
    List<CartDetail> getCartDetails(String username);

    CartDetail findByAccountIdAndBookId(Integer userId, Integer bookId);

    void save(CartDetail cartDetail);

    void delete(Integer id);

    void update(List<CartDetail> cartDetails);

    void pay(List<CartDetail> cartDetails);

    CartDetail findByIdCartDetails(Integer idCartDetails);

    Integer getTotalQuantityByUserId(Integer idUser);

    List<CartSummary> getCartSummary();
}
