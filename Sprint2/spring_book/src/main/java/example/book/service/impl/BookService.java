package example.book.service.impl;

import example.book.model.AppUser;
import example.book.model.Book;
import example.book.repository.IBookRepository;
import example.book.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class BookService implements IBookService {
    @Autowired
    private IBookRepository repository;

    @Override
    public Page<Book> findAllBook(Pageable pageable, String name,String category) {
        return repository.findAllBook(pageable,"%" +name + "%","%" + category +"%");
    }

    @Override
    public void createBook(Book book) {
       repository.save(book);
    }

    @Override
    public void updateBook(Book book) {
       repository.save(book);
    }

    @Override
    public Optional<Book> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public void deleteBook(Integer id) {
       repository.deleteById(id);
    }

    @Override
    public List<Book> findAllBooks() {
        return repository.findAllBooks();
    }

    @Override
    public List<Book> findAllBooksPreview() {
        return repository.findAllBooksPreview();
    }

    @Override
    public Page<Book> findAllCategory(Pageable pageable, Integer category, String name) {
        return repository.findAllCategory(pageable,category,name);
    }

    @Override
    public Page<Book> findAllNameOfAuthor(Pageable pageable, String name) {
        return repository.findByNameContainingOrAuthorContaining(name,pageable);
    }

    @Override
    public Page<Book> findAllByOrderByReleaseDateDesc(Pageable pageable) {
        return repository.findAllByOrderByReleaseDateDesc(pageable);
    }

    @Override
    public Page<Book> findAllHotBook(Pageable pageable) {
        return repository.findAllByOrderByNumberBookSoldDesc(pageable);
    }

    @Override
    public List<Book> findAllByOrderByNumberBookSoldDesc() {
        return repository.findAllByOrderByNumberBookSoldDesc();
    }

    @Override
    public Page<Book> findAllByPriceLessThanOrEqual(Pageable pageable, String name) {
        return repository.findAllByPriceLessThanOrEqual(name,pageable);
    }

    @Override
    public Integer countTotalBooks() {
        return repository.countTotalBooks();
    }

}
