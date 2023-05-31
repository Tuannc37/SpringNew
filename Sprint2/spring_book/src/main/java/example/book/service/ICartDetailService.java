package example.book.service;

import example.book.model.CartDetail;

import java.util.List;
import java.util.Optional;

public interface ICartDetailService {
    List<CartDetail> getCartDetail(String username);

    CartDetail findByAccountIdAndBookId(Integer userId, Integer bookId);

    void save(CartDetail cartDetail);

    void delete(Integer id);

    void update(List<CartDetail> cartDetails);

    void pay(List<CartDetail> cartDetails);

    CartDetail findByIdCartDetails(Integer idCartDetails);
}
