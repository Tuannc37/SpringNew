package example.book.service;

import example.book.model.AppUser;
import example.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IBookService {
    Page<Book> findAllBook(Pageable pageable , String name ,String category);
    void createBook(Book book);
    void updateBook(Book book);
    Optional<Book> findById(Integer id);
    void deleteBook(Integer id);
    List<Book> findAllBooks();
    List<Book> findAllBooksPreview();
    Page<Book> findAllCategory(Pageable pageable ,Integer category, String name );
    Page<Book> findAllNameOfAuthor(Pageable pageable ,String name);
    Page<Book> findAllByOrderByReleaseDateDesc(Pageable pageable);
    Page<Book> findAllHotBook(Pageable pageable);
    List<Book> findAllByOrderByNumberBookSoldDesc();

    Page<Book> findAllByPriceLessThanOrEqual(Pageable pageable ,String name);
    Integer countTotalBooks();
}
