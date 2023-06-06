package example.book.controller;

import example.book.dto.CartSummary;
import example.book.model.CartDetail;
import example.book.model.Invoice;
import example.book.service.ICartDetailService;
import example.book.service.IInvoiceService;
import example.book.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RequestMapping("/api/public/cart")
@CrossOrigin(origins = {"*", "http://localhost:4200"}, allowedHeaders = "*")
@RestController
public class CartController {
    @Autowired
    private ICartDetailService cartDetailService;

    @Autowired
    private IInvoiceService iInvoiceService;

    @Autowired
    private IUserService userService;

    @GetMapping("")
    public ResponseEntity<List<CartDetail>> getCartDetail(@RequestParam String username){
        List<CartDetail> cartDetailList = cartDetailService.getCartDetails(username);
        if (cartDetailList.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return new ResponseEntity<>(cartDetailList, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveCartDetail(@RequestBody CartDetail cartDetail){
        this.cartDetailService.save(cartDetail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("delete")
    public ResponseEntity<Void> delete(@RequestBody CartDetail cartDetail){
        this.cartDetailService.delete(cartDetail.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("update-all")
    public ResponseEntity<Void> updateAll(@RequestBody List<CartDetail> cartDetails){
        this.cartDetailService.update(cartDetails);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("pay")
    public  ResponseEntity<Void> pay(@RequestBody List<CartDetail> cartDetails){
        this.cartDetailService.pay(cartDetails);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("quantity")
    public ResponseEntity<Integer> getTotalQuantityByUserId(@RequestParam Integer idUser) {
        Integer totalQuantity = cartDetailService.getTotalQuantityByUserId(idUser);
        return ResponseEntity.ok(totalQuantity);
    }

    @GetMapping("list/summary")
    public ResponseEntity<Page<Invoice>> getCartSummary(@PageableDefault(value = 12) Pageable pageable) {
        Page<Invoice> invoices = iInvoiceService.findAllByInvoice(pageable);
        if (invoices.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(invoices);
    }

    @PostMapping("/invoices/{invoiceId}")
    public ResponseEntity<Void> updateInvoiceStatusToPaid(@PathVariable Long invoiceId) {
        iInvoiceService.updateStatusToPaid(invoiceId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/invoices/user")
    public ResponseEntity<Page<Invoice>> getInvoicesByUsername(@RequestParam("username") String username, @PageableDefault(value = 8) Pageable pageable) {
        Page<Invoice> invoices = iInvoiceService.findAllByAppUser_Username(username, pageable);
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/total-profit")
    public ResponseEntity<Double> calculateTotalProfit() {
        Double totalProfit = iInvoiceService.calculateTotalProfit();
        return ResponseEntity.ok(totalProfit);
    }

    @GetMapping("/total-quantity")
    public Integer getTotalQuantity() {
        return iInvoiceService.getTotalQuantity();
    }

    @GetMapping("/total-users")
    public Integer countTotalUsers() {
        return userService.countTotalUsers();
    }

}
