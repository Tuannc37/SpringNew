package example.book.service.impl;

import example.book.model.CartDetail;
import example.book.model.Invoice;
import example.book.repository.ICartDetailRepository;
import example.book.service.ICartDetailService;
import example.book.service.IInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartDetailService implements ICartDetailService {

    @Autowired
    private ICartDetailRepository cartDetailRepository;

    @Autowired
    private IInvoiceService iInvoiceService;


    @Override
    public List<CartDetail> getCartDetail(String username) {
        return cartDetailRepository.findByUser_Username(username);
    }

    @Override
    public CartDetail findByAccountIdAndBookId(Integer userId, Integer bookId) {
        return cartDetailRepository.findByUser_IdAndBook_Id(userId,bookId);
    }



    @Override
    public void save(CartDetail cartDetail) {
        if (cartDetail.getId() == null) {
            CartDetail item = findByAccountIdAndBookId(cartDetail.getUser().getId(), cartDetail.getBook().getId());
            if (item == null) {
                cartDetail.setQuantity("1");
                cartDetail.setStatus(1);
                this.cartDetailRepository.save(cartDetail);
            } else {
                item.setQuantity(item.getQuantity() + 1);
                this.cartDetailRepository.save(item);
            }
        } else {
            CartDetail existingItem = findByIdCartDetails(cartDetail.getId());
            if (existingItem != null) {
                existingItem.setQuantity(cartDetail.getQuantity() +1 );
                existingItem.setStatus(cartDetail.getStatus());
                this.cartDetailRepository.save(existingItem);
            }
        }
    }


    @Override
    public void delete(Integer id) {
        cartDetailRepository.updateStatusById(id);
    }

    @Override
    public void update(List<CartDetail> cartDetails) {
        cartDetailRepository.saveAll(cartDetails);
    }

    @Override
    public void pay(List<CartDetail> cartDetails) {
        List<CartDetail> paidItems =  this.cartDetailRepository.saveAll(cartDetails);
        List<Invoice> invoices = paidItems.stream().map(item ->
                new Invoice(null,
                        "HD-" + item.getUser().getId() + "-" + item.getId(),
                        LocalDate.now(),item.getQuantity(), item.getBook(),item.getUser())).collect(Collectors.toList());
        this.iInvoiceService.saveAll(invoices);
    }

    @Override
    public CartDetail findByIdCartDetails(Integer idCartDetails) {
        return cartDetailRepository.findByIdCartDetails(idCartDetails);
    }


}
