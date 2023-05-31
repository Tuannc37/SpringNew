package example.book.controller;

import example.book.dto.BookDto;
import example.book.dto.UserDto;
import example.book.model.*;
import example.book.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequestMapping("/api/public/book")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
@CrossOrigin(origins = {"*", "http://localhost:4200"}, allowedHeaders = "*")
@RestController
public class BookController {
    @Autowired
    private IBookService bookService;
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private IDiscountService discountService;

    @Autowired
    private IUserService userService;

    @GetMapping("/list/category")
    public ResponseEntity<List<Category>> findAllPlacement() {
        return new ResponseEntity<>(categoryService.findAllCategory(), HttpStatus.OK);
    }
    @GetMapping("/list/discount")
    public ResponseEntity<List<Discount>> findAllDiscount() {
        return new ResponseEntity<>(discountService.findAllDiscount(), HttpStatus.OK);
    }
    @GetMapping("/list/book")
    public ResponseEntity<List<Book>> findAllBook() {
        return new ResponseEntity<>(bookService.findAllBooks(), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Book>> findAllBook(@PageableDefault(value = 12) Pageable pageable,
                                                  @RequestParam Optional<String> name,
                                                  @RequestParam Optional<String> category) {
        String nameSearch = name.orElse("");
        String categorySearch = category.orElse("");
        Page<Book> book = bookService.findAllBook(pageable, nameSearch,categorySearch);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/list/book/preview")
    public ResponseEntity<Page<Book>> findAllBookPreview(@PageableDefault(value = 24) Pageable pageable,
                                                  @RequestParam Optional<String> name,
                                                  @RequestParam Optional<String> category) {
        String nameSearch = name.orElse("");
        String categorySearch = category.orElse("");
        Page<Book> book = bookService.findAllBook(pageable, nameSearch,categorySearch);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/list/book/search")
    public ResponseEntity<Page<Book>> findAllBookNameOfAuthor(@PageableDefault(value = 24) Pageable pageable,
                                                         @RequestParam Optional<String> name) {
        String nameSearch = name.orElse("");
        Page<Book> book = bookService.findAllNameOfAuthor(pageable, nameSearch);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/list/book/releaseDate")
    public ResponseEntity<Page<Book>> findAllByOrderByReleaseDateDesc(@PageableDefault(value = 12) Pageable pageable) {
        Page<Book> book = bookService.findAllByOrderByReleaseDateDesc(pageable);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/list/book/hotBook")
    public ResponseEntity<Page<Book>> getAllHotBook(@PageableDefault(value = 12) Pageable pageable) {
        Page<Book> book = bookService.findAllHotBook(pageable);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/list/book/sale")
    public ResponseEntity<Page<Book>> findAllByPriceLessThanOrEqual(@PageableDefault(value = 12) Pageable pageable) {
        String fixedPrice = "100000";
        Page<Book> book = bookService.findAllByPriceLessThanOrEqual(pageable,fixedPrice);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }




    @GetMapping("/list/book/numberBookSoldDesc")
    public ResponseEntity<List<Book>> findAllByOrderByNumberBookSoldDesc() {
        List<Book> book = bookService.findAllByOrderByNumberBookSoldDesc();
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/list/categorySearch")
    public ResponseEntity<Page<Book>> findAllCategory(@PageableDefault(value = 12) Pageable pageable,
                                                      @RequestParam(defaultValue = "0") Integer category,
                                                  @RequestParam(defaultValue = "") String name
                                                  ) {
        Page<Book> serviceAllCategory = bookService.findAllCategory(pageable, category,name);
        if (serviceAllCategory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(serviceAllCategory, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createBook(@RequestBody @Valid BookDto bookDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Book book = new Book();
            BeanUtils.copyProperties(bookDto, book);
            bookService.createBook(book);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/create-user")
    public ResponseEntity<Object> createUser(@RequestBody @Valid UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            AppUser appUser = new AppUser();
            BeanUtils.copyProperties(userDto, appUser);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(userDto.getPassword());
            appUser.setPassword(encodedPassword);
            userService.create(appUser);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editBook(@PathVariable("id") Integer id,@RequestBody @Valid BookDto bookDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Book> bookUpdate = bookService.findById(id);
        if (!bookUpdate.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
            Book book = new Book();
            BeanUtils.copyProperties(bookDto, book);
            book.setId(bookUpdate.get().getId());
            bookService.updateBook(book);
            return new ResponseEntity<>(book,HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id,
                                    @PageableDefault(value = 8) Pageable pageable,
                                    @RequestParam Optional<String> name,
                                    @RequestParam Optional<String> category) {
        String nameSearch = name.orElse("");
        String categorySearch = category.orElse("");
        Page<Book> book = bookService.findAllBook(pageable, nameSearch,categorySearch);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        bookService.deleteBook(id);
        return new ResponseEntity<>(book,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        Optional<Book> book = bookService.findById(id);
        if (!book.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(book, HttpStatus.OK);
        }
    }

    @GetMapping("/list/user/{user}")
    public ResponseEntity<AppUser> findAll(@PathVariable("user") String user) {
        if("".equals(user)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userService.findByName(user),HttpStatus.OK);
    }

    @PutMapping("/list/users/update/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable("id") Integer id,@RequestBody @Valid UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<AppUser> appUser1 = userService.findById(id);
        if (!appUser1.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        AppUser appUser2 = new AppUser();
        BeanUtils.copyProperties(userDto, appUser2);
        appUser2.setId(appUser1.get().getId());
        userService.update(appUser2);
        return new ResponseEntity<>(appUser2,HttpStatus.OK);
    }


    @GetMapping("/search/user/{id}")
    public ResponseEntity<?> findByIdUser(@PathVariable("id") Integer id) {
        Optional<AppUser> appUser = userService.findById(id);
        if (!appUser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(appUser, HttpStatus.OK);
        }
    }

}
